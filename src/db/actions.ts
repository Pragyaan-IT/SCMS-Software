"use server";

import { and, asc, eq, gte, sql } from "drizzle-orm";
import { db } from ".";
import { attendance, classes, classTeachers, complaints, students, subjects, teachers, timetable } from "./schema";
import { count } from "console";

// using any for now
export async function createGrievance(values: any) {
  await db.insert(complaints).values({
    teacherName: values.teacherName,
    teacherId: values.teacherId,
    classroomNumber: values.classroomNumber,
    message: values.message,
  });
}

export async function getGrievances() {
  return await db.select().from(complaints);
}

export async function countPresentStudent(id: number) {
  const result = await db
    .select({
      attendanceDate: sql<string>`${attendance.date}::date`,
      className: classes.name,
      subjectName: subjects.name,
      presentStudents: sql<number>`cast(count(*) as integer)`
    })
    .from(attendance)
    .innerJoin(timetable, eq(attendance.timetable_id, timetable.id))
    .innerJoin(subjects, eq(timetable.subject_id, subjects.id))
    .innerJoin(classes, eq(timetable.class_id, classes.id))
    .innerJoin(classTeachers, and(
      eq(timetable.class_id, classTeachers.class_id),
      eq(timetable.teacher_id, classTeachers.teacher_id)
    ))
    .innerJoin(teachers, eq(classTeachers.teacher_id, teachers.id))
    .where(and(
      eq(teachers.id, 4),
      eq(attendance.present, true),
      gte(attendance.date, sql`NOW() - INTERVAL '5 days'`)
    ))
    .groupBy(sql`${attendance.date}::date`, classes.name, subjects.name)
    .orderBy(asc(sql`${attendance.date}::date`), asc(classes.name), asc(subjects.name));
  return result;

}

export async function getTotalStudent(id: number) {
  const totalStudentsInClass = await db
    .select({
      className: classes.name,
      totalStudents: sql`COUNT(${students.id})`
    })
    .from(students)
    .innerJoin(classes, eq(students.class_id, classes.id))
    .where(eq(classes.id, id))
    .groupBy(classes.name)

  return totalStudentsInClass;
}