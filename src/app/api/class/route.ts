import { db } from "@/db";
import { classes } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const allClasses = await db.select().from(classes);
    return NextResponse.json({ classes: allClasses }, { status: 200 });
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name } = await request.json();

    if (!name) {
        return NextResponse.json({ error: 'Class name is required' }, { status: 400 });
    }

    try {
        const newClass = await db.insert(classes).values({
            name,
        }).returning()

        return NextResponse.json(newClass, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
    }
}