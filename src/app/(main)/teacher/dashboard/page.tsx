"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import StudentPerformanceChart from "../_components/student-performance-chart";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
    if (session && session.user.role !== "teacher") {
      router.push("/");
    }
    
  }, [session]);
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-3 p-2">
          <StudentPerformanceChart />
          <AttendanceRateChart />
        </div>
      </ScrollArea>
    </section>
  );
}
