import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";

type Params = {
    studentId: string
}

export async function GET(request: Request, context: { params: Params }) {
    const { studentId } = context.params;

    const student = await db.select().from(students).where(eq(students.registration_id, studentId));
    if (!student) {
        return new Response(JSON.stringify({ msg: 'Student not found' }), {
            status: 404, headers: {
                'Content-Type': 'application'
            }
        })
    }

    return new Response(JSON.stringify({ student }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

export async function PUT(request: Request, context: { params: Params }) {
    const { studentId } = context.params;
    const data = await request.json();

    const { is_face_registered } = data;

    if (is_face_registered) {
        await db.update(students).set({ is_face_registered }).where(eq(students.registration_id, studentId));
        return new Response(JSON.stringify({ msg: 'Face registered', success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    }

    return new Response(JSON.stringify({ msg: studentId }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}