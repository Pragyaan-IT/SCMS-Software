import { redirect } from "next/navigation";
import Dashboard from "./_components/dashboard";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const student = await db.query.students.findFirst({
    where: (student, { eq }) => eq(student.registration_id, session.user.id)
  });

  console.log(student);

  if (!(student?.is_face_registered)) {
    redirect("/student/face-registration?registration_id=" + session.user.id + "&student_name=" + student?.name);
  }

  return (
    <section>
      <Dashboard profile={student} />
    </section>
  );
}
