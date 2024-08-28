"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import ProfileScore from "../_components/profile-score";
import StudentPerformanceChart from "../_components/student-performance-chart";
import { SubjectPerformanceChart } from "../_components/subject-perfomance-chart";
import QuestionsAnswered from "../_components/questions-answered";

export default function DashboardPage() {
  // const { data: session } = useSession();
  // const router = useRouter()
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/sign-in");
  //   }
  //   if (session && session.user.role !== "teacher") {
  //     router.push("/");
  //   }

  // }, [session]);
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-[calc(100dvh-140px)] w-full">
        <ProfileScore />
        <QuestionsAnswered />
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
          <StudentPerformanceChart />
          <AttendanceRateChart />
          <SubjectPerformanceChart />
        </div>
      </ScrollArea>
    </section>
  );
}
