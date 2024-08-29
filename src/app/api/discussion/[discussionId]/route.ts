import { db } from "@/db"
import { discussions, students } from "@/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { discussionId: string } }) {
    const discussion = await db
        .select({
            id: discussions.id,
            title: discussions.title,
            subject_id: discussions.subject_id,
            type: discussions.type,
            description: discussions.description,
            is_solved: discussions.is_solved,
            created_at: discussions.created_at,
            student_name: students.name 
        })
        .from(discussions)
        .innerJoin(students, eq(discussions.student_id, students.id)) 
        .where(eq(discussions.id, parseInt(params.discussionId)));
    return NextResponse.json({ discussion }, { status: 200 })
}