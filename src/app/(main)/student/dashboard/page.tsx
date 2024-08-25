import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { students } from "@/db/schema";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }

  const student = await db.query.students.findFirst({
    where: (student, { eq }) => eq(student.registration_id, session.user.id)
  });

  if (!(student?.is_face_registered)) {
    redirect("/student/face-registration");
  }

  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full"></ScrollArea>
    </section>
  );
}
