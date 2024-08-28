import { db } from "@/db";
import { attendance, students, subjects, timetable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


interface params {
    studentId: string;
}

export async function GET(req: Request, { params }: { params: params }) {
    const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });

    const student = await db.select().from(students).where(eq(students.registration_id, params.studentId));

    const todayAttendance = await db
        .select({
            slot: timetable.slot,
            subjectName: subjects.name,
            attendance: attendance.present,
        })
        .from(timetable)
        .leftJoin(subjects, eq(timetable.subject_id, subjects.id))
        .leftJoin(attendance, and(
            eq(timetable.id, attendance.timetable_id),
            eq(attendance.student_id, student[0].id)
        ))
        .where(and(
            eq(timetable.class_id, db.select({ classId: students.class_id })
                .from(students)
                .where(eq(students.registration_id, params.studentId))),
            eq(timetable.day, dayOfWeek)
        ))
        .orderBy(timetable.slot)
        .execute();


    return NextResponse.json({ todayAttendance }, { status: 200 })
}