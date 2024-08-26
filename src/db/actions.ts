"use server";

import { db } from ".";
import { complaints } from "./schema";

// using any for now
export default async function createGrievance(values: any) {
  await db.insert(complaints).values({
    teacherName: values.teacherName,
    teacherId: values.teacherId,
    classroomNumber: values.classroomNumber,
    message: values.message,
  });
}
