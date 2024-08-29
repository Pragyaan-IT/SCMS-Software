import PageTitle from "@/components/page-title";
import { dummyClasses, dummyTimetableData } from "../dummy-data";
import { AdvancedTimetableDataTable } from "./timetable";
import { and, eq } from 'drizzle-orm';
import { db } from "@/db";
import { classes, classTeachers, subjects, teachers, timetable } from "@/db/schema";

export default async function TimetablePage() {
  const teacherTimetable = await db
    .select({
      timetableId: timetable.id,
      classId: timetable.class_id,
      class_name: classes.name,
      day: timetable.day,
      slot: timetable.slot,
      subject_name: subjects.name,
      teacher_name: teachers.name,
    })
    .from(timetable)
    .leftJoin(teachers, eq(timetable.teacher_id, teachers.id))
    .leftJoin(classes, eq(timetable.class_id, classes.id))
    .leftJoin(subjects, eq(timetable.subject_id, subjects.id))
    .where(
      and(
        eq(timetable.teacher_id, 4),
        eq(timetable.class_id, 1),
        eq(timetable.day, 'Thursday')
      )
    );

  const teacherClasses = await db
    .select({
      id: classes.id,
      name: classes.name,
    })
    .from(classTeachers)
    .leftJoin(classes, eq(classTeachers.class_id, classes.id))
    .where(eq(classTeachers.teacher_id, 4));


  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Timetable" />
      <AdvancedTimetableDataTable
        timetableData={teacherTimetable}
        classes={teacherClasses}
      />
    </section>
  );
}
