import { db } from "@/db";
import { classes, classTeachers, teachers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

interface params {
    teacherId: number;
}

export async function GET(request: Request, { params }: { params: params }) {
    console.log(params.teacherId)
    const teacherClasses = await db
        .select({
            id: classes.id,
            className: classes.name,
        })
        .from(classTeachers)
        .innerJoin(classes, eq(classTeachers.class_id, classes.id))
        .innerJoin(teachers, eq(classTeachers.teacher_id, teachers.id))
        .where(eq(teachers.id, params.teacherId));
    return NextResponse.json({ teacherClasses }, { status: 200 });
}