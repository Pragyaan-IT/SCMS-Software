import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { classSubjects, classTeachers, teachers } from "@/db/schema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




export async function GET(request: Request) {
    const allTeachers = await db.select().from(teachers);
    return NextResponse.json({ teachers: allTeachers }, { status: 200 });
}

interface params {
    classId: string;
}

export async function POST(request: Request, { params }: { params: params }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { subjectId } = await request.json();

    if (!subjectId) {
        return NextResponse.json({ error: 'Subject id is required' }, { status: 400 });
    }

    try {
        const classId = parseInt(params.classId);
        const newRelation = await db.insert(classSubjects).values({
            class_id: classId,
            subject_id: subjectId
        })

        return NextResponse.json({ data: newRelation }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error creating relation' }, { status: 500 });
    }
}