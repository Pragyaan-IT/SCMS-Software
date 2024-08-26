"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import StudentPerformanceChart from "../_components/student-performance-chart";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SubjectPerformanceChart } from "../_components/subject-perfomance-chart";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (!session) {
      router.push("/sign-in");
    }
    if (session && session.user.role !== "teacher") {
      router.push("/");
    }
    
  }, [session]);
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-[calc(100dvh-140px)] w-full">
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
          <StudentPerformanceChart />
          <AttendanceRateChart />
          <SubjectPerformanceChart />
        </div>
      </ScrollArea>
    </section>
  );
}
