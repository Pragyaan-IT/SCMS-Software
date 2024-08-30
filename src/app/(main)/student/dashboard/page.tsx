import boy from "@/public/boy.png";
import Dashboard from "./_components/dashboard";

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/sign-in");
  // }

  // const student = await db.query.students.findFirst({
  //   where: (student, { eq }) => eq(student.registration_id, session.user.id)
  // });

  // console.log(student);

  // if (!(student?.is_face_registered)) {
  //   redirect("/student/face-registration?registration_id=" + session.user.id + "&student_name=" + student?.name);
  // }

  const student = {
    name: "Shashank Pandey",
    email: "shashank@gmail.com",
    profile_pic: boy,
    is_face_registered: true,
  };

  return (
    <section>
      <Dashboard profile={student} />
    </section>
  );
}
