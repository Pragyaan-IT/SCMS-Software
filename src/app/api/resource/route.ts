import { db } from "@/db";
import { classes, shareResources, students, teachers } from "@/db/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { eq } from "drizzle-orm";


export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const id = session.user.id;
    console.log("ID", id)
    const student = await db.select().from(students).where(eq(students.registration_id, id.toString()));
    const resources = await db
        .select({
            id: shareResources.id,
            title: shareResources.title,
            description: shareResources.description,
            link: shareResources.link,
            created_at: shareResources.created_at,
            teacherName: teachers.name,
        })
        .from(shareResources)
        .leftJoin(teachers, eq(shareResources.teacher_id, teachers.id))
        .where(eq(shareResources.class_id, student[0]?.class_id ?? 0));

    console.log(resources)
    return NextResponse.json({ resources }, { status: 200 });
}


export async function POST(req: Request) {
    const body = await req.json();
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title, description, resourceUrl, classId } = body;
    await db.insert(shareResources).values({
        class_id: classId,
        title: title,
        description: description,
        link: resourceUrl,
        teacher_id: parseInt(session?.user.id!)
    });
    return NextResponse.json({ message: "Class assigned to teacher" }, { status: 200 });
}