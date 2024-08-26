import { db } from "@/db";
import { subjects } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const allSubjects = await db.select().from(subjects);
    return NextResponse.json({ subjects: allSubjects }, { status: 200 });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name } = await request.json();

    if (!name) {
        return NextResponse.json({ error: 'Subject name is required' }, { status: 400 });
    }

    try {
        const newSubject = await db.insert(subjects).values({
            name,
        }).returning()

        return NextResponse.json(newSubject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating subject' }, { status: 500 });
    }
}