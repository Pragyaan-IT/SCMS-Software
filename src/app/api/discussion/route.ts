import { db } from "@/db";
import { discussions, students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    const allDiscussions = await db.select().from(discussions)
    return NextResponse.json({ allDiscussions }, { status: 200 })
}

export async function POST(req: Request) {
    const body = await req.json();
    const student = await db.select().from(students).where(eq(students.registration_id, body.studentId));

    const newDiscussion = await db.insert(discussions).values({
        title: body.title, description: body.description, student_id: student[0].id, subject_id: body.subjectId, type: body.type
    })

    return NextResponse.json({ newDiscussion }, { status: 201 })
}