import { db } from "@/db";
import { attendance, classes, students, teachers, timetable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const teacherId = 1
const className = '3A';
const day = 'Tuesday';

export async function GET(request: Request) {
    const attendanceRecords = await db
        .select({
            attendanceId: attendance.id,
            studentName: students.name,
            className: classes.name,
            day: timetable.day,
            slot: timetable.slot,
            present: attendance.present,
            date: attendance.date,
        })
        .from(attendance)
        .innerJoin(timetable, eq(attendance.timetable_id, timetable.id))
        .innerJoin(classes, eq(timetable.class_id, classes.id))
        .innerJoin(teachers, eq(timetable.teacher_id, teachers.id))
        .innerJoin(students, eq(attendance.student_id, students.id))
        .where(
            and(
                eq(classes.name, className),
                eq(timetable.day, day),
                eq(teachers.id, teacherId)
            )
        )
        .orderBy(timetable.slot, attendance.date);

    return NextResponse.json({ attendance: attendanceRecords }, { status: 200 });
}

function getCurrentSlot() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 9 && hours < 10) return 9;
    if (hours >= 10 && hours < 11) return 10;
    if (hours >= 11 && hours < 12) return 11;
    if (hours >= 12 && hours < 13) return 12;
    if (hours >= 13 && hours < 14) return 13;
    if (hours >= 14 && hours < 15) return 14;
    if (hours >= 15 && hours < 16) return 15;
    if (hours >= 16 && hours < 17) return 16;
}

export async function POST(request: Request) {
    const { name, time } = await request.json();
    const [studentName, registration_id] = name.split("|");
    const student = await db
        .select({
            id: students.id,
            class_id: students.class_id
        })
        .from(students)
        .where(eq(students.registration_id, registration_id))

    const currentSlot = getCurrentSlot()?.toString();

    const class_id = student[0].class_id;
    const day = new Date().toLocaleString('en-us', { weekday: 'long' });

    const timetableRecord = await db
        .select({
            id: timetable.id,
            class_id: timetable.class_id,
            day: timetable.day,
            slot: timetable.slot,
            subject_id: timetable.subject_id,
            teacher_id: timetable.teacher_id
        })
        .from(timetable)
        .where(
            and(
                eq(timetable.class_id, class_id!),
                eq(timetable.slot, currentSlot!),
                eq(timetable.day, day)
            )
        );

    await db.insert(attendance).values({
        student_id: (student[0].id)!,
        timetable_id: timetableRecord[0].id,
        date: new Date(),
        time: time,
        present: true,
    })

    return NextResponse.json({ message: "Attendance recorded" }, { status: 200 });
}