"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import ProfileScore from "../_components/profile-score";
import QuestionsAnswered from "../_components/questions-answered";
import StudentPerformanceChart from "../_components/student-performance-chart";
import { SubjectPerformanceChart } from "../_components/subject-perfomance-chart";
import TeacherProfileCard from "../_components/teacher-profile-card";
import hcverma from "@/public/hcverma.jpg"

export default function DashboardPage() {
  // const { data: session } = useSession();
  // const router = useRouter()
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/sign-in/teacher");
  //   }
  //   if (session && session.user.role !== "teacher") {
  //     router.push("/");
  //   }
  //   console.log(session);

  // }, [session]);

  const studentData = {
    name: "HC Verma",
    email: "hc.verma@gmail.com",
    registrationId: "2215000198",
    isFaceRegistered: true,
    profile_pic: hcverma,
  };

  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-[calc(100dvh-140px)] w-full">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
          <TeacherProfileCard profile={studentData} />
          <div className="flex flex-col gap-2">
            <ProfileScore />
            <QuestionsAnswered />
          </div>
          <StudentPerformanceChart />
        </div>
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2">
          <AttendanceRateChart />
          <SubjectPerformanceChart />
        </div>
      </ScrollArea>
    </section>
  );
}
