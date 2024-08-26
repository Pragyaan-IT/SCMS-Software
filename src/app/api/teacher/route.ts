import { db } from "@/db";
import { teachers } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


function generateId() {
    return Math.floor(100000 + Math.random() * 900000);
}

export async function GET(request: Request) {
    const allTeachers = await db.select().from(teachers);
    return NextResponse.json({ teachers: allTeachers }, { status: 200 });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, email, password } = await request.json();

    if (!name) {
        return NextResponse.json({ error: 'Class name is required' }, { status: 400 });
    }

    const teacher_id = generateId().toString();

    try {
        console.log(teacher_id)
        const newClass = await db.insert(teachers).values({
            name, email, password, teacher_id
        }).returning({
            id: teachers.id,
            name: teachers.name,
            email: teachers.email,
            teacher_id: teachers.teacher_id
        })


        return NextResponse.json(newClass, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
    }
}