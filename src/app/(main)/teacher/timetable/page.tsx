import PageTitle from "@/components/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyClasses, dummyTimetableData } from "../dummy-data";
import TimetableDataTable from "./timetable";
import TeacherTimetable from "./timetable2";

export default function TimetablePage() {
  // const teacherTimetable = await db
  //   .select({
  //     id: timetable.id,
  //     class_id: timetable.class_id,
  //     class_name: classes.name,
  //     day: timetable.day,
  //     slot: timetable.slot,
  //     subject_name: subjects.name,
  //     teacher_name: teachers.name,
  //   })
  //   .from(timetable)
  //   .leftJoin(teachers, eq(timetable.teacher_id, teachers.id))
  //   .leftJoin(classes, eq(timetable.class_id, classes.id))
  //   .leftJoin(subjects, eq(timetable.subject_id, subjects.id))
  //   .where(
  //     and(
  //       eq(timetable.teacher_id, 4),
  //       eq(timetable.class_id, 1),
  //       eq(timetable.day, 'Thursday')
  //     )
  //   );

  // const teacherClasses = await db
  //   .select({
  //     id: classes.id,
  //     name: classes.name,
  //   })
  //   .from(classTeachers)
  //   .leftJoin(classes, eq(classTeachers.class_id, classes.id))
  //   .where(eq(classTeachers.teacher_id, 4));

  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Timetable" />
      <Tabs defaultValue="Timetable">
        <TabsList>
          <TabsTrigger value="Data Table">Data Table</TabsTrigger>
          <TabsTrigger value="Timetable">Timetable</TabsTrigger>
        </TabsList>
        <TabsContent value="Data Table">
          <TimetableDataTable
            timetableData={dummyTimetableData}
            classes={dummyClasses}
          />
        </TabsContent>
        <TabsContent value="Timetable">
          <TeacherTimetable teacherId={1} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
