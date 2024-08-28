import { db } from "@/db";
import { attendance, students, subjects, teachers, timetable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


interface params {
    studentId: string;
}


export async function GET(req: Request, { params }: { params: params }) {
    const dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });
    const { searchParams } = new URL(req.url);
    const day = searchParams.get('day');

    const student = await db.select().from(students).where(eq(students.registration_id, params.studentId));

    const todayClass = await db
        .select({
            slot: timetable.slot,
            subjectName: subjects.name,
            day: timetable.day,
            teacherName: teachers.name,
        })
        .from(timetable)
        .innerJoin(subjects, eq(timetable.subject_id, subjects.id))
        .innerJoin(teachers, eq(teachers.id, timetable.teacher_id))
        .where(
            and(
                eq(timetable.class_id,
                    db.select({ classId: students.class_id })
                        .from(students)
                        .where(eq(students.id, student[0].id))
                ),
                eq(timetable.day, day || dayOfWeek)
            )
        )

    return NextResponse.json({ todayClass }, { status: 200 })
}