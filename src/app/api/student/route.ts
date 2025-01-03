import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { students } from "@/db/schema";
import { db } from "@/db";


export async function GET(request: Request) {
    const allStudents = await db.select().from(students);
    return NextResponse.json({ students: allStudents }, { status: 200 });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, email, password, registration_id, class_id } = await request.json();

    if (!name) {
        return NextResponse.json({ error: 'Class name is required' }, { status: 400 });
    }

    try {
        const newClass = await db.insert(students).values({
            name, email, password, registration_id, class_id: parseInt(class_id)
        }).returning({
            id: students.id,
            name: students.name,
            registration_id: students.registration_id,
            class_id: students.class_id,
            email: students.email
        })
        // const student = await db.select().from(students).where(eq(students.registration_id, studentId));


        return NextResponse.json(newClass, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
    }
}