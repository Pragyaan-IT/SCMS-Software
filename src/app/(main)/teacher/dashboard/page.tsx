"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import StudentPerformanceChart from "../_components/student-performance-chart";

export default function DashboardPage() {
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
