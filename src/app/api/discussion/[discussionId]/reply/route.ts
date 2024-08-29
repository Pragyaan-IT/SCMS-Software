import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { discussionReplies, discussions, students, teachers } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { discussionId: string } }) {
    const replies = await db
        .select()
        .from(discussionReplies)
        .where(eq(discussionReplies.discussion_id, parseInt(params.discussionId)))
        .orderBy(asc(discussionReplies.created_at));

    const results = await Promise.all(replies.map(async reply => {
        if (reply.teacher_id) {
            const teacher = await db
                .select({ name: teachers.name })
                .from(teachers)
                .where(eq(teachers.id, reply.teacher_id));
            return { ...reply, name: teacher[0]?.name };
        } else if (reply.student_id) {
            const student = await db
                .select({ name: students.name })
                .from(students)
                .where(eq(students.id, reply.student_id))
            return { ...reply, name: student[0]?.name };
        }
        return { ...reply, name: null };
    }));

    return NextResponse.json({ reply: results }, { status: 200 });
}

export async function POST(req: Request, { params }: { params: { discussionId: string } }) {
    const body = await req.json();
    const { reply } = body;
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(new Error("Unauthorized"), { status: 401 });
    }
    const id = session.user.id;

    if (session.user.role === "student") {
        const student = await db.select().from(students).where(eq(students.registration_id, id));
        await db.insert(discussionReplies).values({
            discussion_id: parseInt(params.discussionId),
            student_id: student[0].id,
            reply,
        });

        return NextResponse.json({ message: "Reply added" }, { status: 200 });
    }
    await db.insert(discussionReplies).values({
        discussion_id: parseInt(params.discussionId),
        teacher_id: parseInt(id),
        reply,
    }).returning({ id: discussionReplies.id });

    return NextResponse.json({ message: "Reply added" }, { status: 200 });
}

export async function PUT(req: Request, { params }: { params: { discussionId: string } }) {
    const body = await req.json();
    const { replyId } = body;
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(new Error("Unauthorized"), { status: 401 });
    }
    await db.update(discussions)
    .set({ is_solved: true })
    .where(eq(discussions.id, parseInt(params.discussionId)));

    await db.update(discussionReplies)
    .set({ is_solution: true})
    .where(eq(discussionReplies.id, replyId));

    return NextResponse.json({ message: "Reply marked as solved" }, { status: 200 });
}