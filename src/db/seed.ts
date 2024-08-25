// import { db } from ".";
// import { attendance, classes, students, teachers, users } from "./schema"; // Adjust this import based on where your schema is defined

// async function seed() {
//   try {
//     // Seed users
//     const [john, jane, alice, bob, carol, david] = await db
//       .insert(users)
//       .values([
//         { name: "John Doe", email: "john.doe@example.com", role: "teacher" },
//         {
//           name: "Jane Smith",
//           email: "jane.smith@example.com",
//           role: "teacher",
//         },
//         {
//           name: "Alice Johnson",
//           email: "alice.johnson@example.com",
//           role: "student",
//         },
//         {
//           name: "Bob Williams",
//           email: "bob.williams@example.com",
//           role: "student",
//         },
//         {
//           name: "Carol Brown",
//           email: "carol.brown@example.com",
//           role: "parent",
//         },
//         {
//           name: "David Green",
//           email: "david.green@example.com",
//           role: "parent",
//         },
//       ])
//       .returning();

//     // Seed students
//     const [aliceStudent, bobStudent] = await db
//       .insert(students)
//       .values([
//         { user_id: alice.id, grade: "10th", parent_id: carol.id },
//         { user_id: bob.id, grade: "11th", parent_id: david.id },
//       ])
//       .returning();

//     // Seed teachers
//     const [johnTeacher, janeTeacher] = await db
//       .insert(teachers)
//       .values([
//         { user_id: john.id, subject: "Mathematics" },
//         { user_id: jane.id, subject: "Science" },
//       ])
//       .returning();

//     // Seed classes
//     const [mathClass, physicsClass] = await db
//       .insert(classes)
//       .values([
//         { name: "Advanced Mathematics", teacher_id: johnTeacher.id },
//         { name: "Physics 101", teacher_id: janeTeacher.id },
//       ])
//       .returning();

//     // Seed attendance
//     await db.insert(attendance).values([
//       {
//         student_id: aliceStudent.id,
//         class_id: mathClass.id,
//         date: new Date("2024-08-24 09:00:00"),
//         present: true,
//       },
//       {
//         student_id: aliceStudent.id,
//         class_id: physicsClass.id,
//         date: new Date("2024-08-24 11:00:00"),
//         present: true,
//       },
//       {
//         student_id: bobStudent.id,
//         class_id: mathClass.id,
//         date: new Date("2024-08-24 09:00:00"),
//         present: false,
//       },
//       {
//         student_id: bobStudent.id,
//         class_id: physicsClass.id,
//         date: new Date("2024-08-24 11:00:00"),
//         present: true,
//       },
//     ]);

//     console.log("Seeding completed successfully");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   }
// }

// seed();
