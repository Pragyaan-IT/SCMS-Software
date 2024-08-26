import { db } from ".";
import * as schema from "./schema";

async function seed() {
  try {
    // Seed Admins
    await db.insert(schema.admins).values([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: "hashedpassword",
        role: "admin",
      },
    ]);

    // Seed Classes
    const [class1, class2] = await db
      .insert(schema.classes)
      .values([{ name: "Class 1A" }, { name: "Class 1B" }])
      .returning();

    // Seed Teachers
    const [teacher1, teacher2] = await db
      .insert(schema.teachers)
      .values([
        {
          name: "John Doe",
          email: "john@example.com",
          password: "hashedpassword",
          role: "teacher",
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          password: "hashedpassword",
          role: "teacher",
        },
      ])
      .returning();

    // Seed Subjects
    const [math, science] = await db
      .insert(schema.subjects)
      .values([
        { name: "Mathematics", teacher_id: teacher1.id, class_id: class1.id },
        { name: "Science", teacher_id: teacher2.id, class_id: class2.id },
      ])
      .returning();

    // Seed Students
    const [student1, student2] = await db
      .insert(schema.students)
      .values([
        {
          name: "Alice Johnson",
          registration_id: "S001",
          password: "hashedpassword",
          email: "alice@example.com",
          class_id: class1.id,
          role: "student",
        },
        {
          name: "Bob Williams",
          registration_id: "S002",
          password: "hashedpassword",
          email: "bob@example.com",
          class_id: class2.id,
          role: "student",
        },
      ])
      .returning();

    // Seed TeacherSubjects
    await db.insert(schema.teacherSubjects).values([
      { teacher_id: teacher1.id, subject_id: math.id },
      { teacher_id: teacher2.id, subject_id: science.id },
    ]);

    // Seed ClassTeachers
    await db.insert(schema.classTeachers).values([
      { class_id: class1.id, teacher_id: teacher1.id },
      { class_id: class2.id, teacher_id: teacher2.id },
    ]);

    // Seed ClassStudents
    await db.insert(schema.classStudents).values([
      { class_id: class1.id, student_id: student1.id },
      { class_id: class2.id, student_id: student2.id },
    ]);

    // Seed ClassSubjects
    await db.insert(schema.classSubjects).values([
      { class_id: class1.id, subject_id: math.id },
      { class_id: class2.id, subject_id: science.id },
    ]);

    // Seed Timetable
    const [timetableEntry1, timetableEntry2] = await db
      .insert(schema.timetable)
      .values([
        {
          class_id: class1.id,
          day: "Monday",
          slot: "09:00-10:00",
          subject_id: math.id,
          teacher_id: teacher1.id,
        },
        {
          class_id: class2.id,
          day: "Tuesday",
          slot: "10:00-11:00",
          subject_id: science.id,
          teacher_id: teacher2.id,
        },
      ])
      .returning();

    // Seed Attendance
    await db.insert(schema.attendance).values([
      {
        student_id: student1.id,
        timetable_id: timetableEntry1.id,
        date: new Date(),
        present: true,
      },
      {
        student_id: student2.id,
        timetable_id: timetableEntry2.id,
        date: new Date(),
        present: false,
      },
    ]);

    // Seed Marks
    await db.insert(schema.marks).values([
      {
        type: "Quiz",
        student_id: student1.id,
        subject_id: math.id,
        marks: 85,
        date: new Date(),
      },
      {
        type: "Test",
        student_id: student2.id,
        subject_id: science.id,
        marks: 92,
        date: new Date(),
      },
    ]);

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } 
}

seed();
