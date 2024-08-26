"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AttendanceRateChart } from "../_components/attendance-rate-chart";
import StudentPerformanceChart from "../_components/student-performance-chart";
import { SubjectPerformanceChart } from "../_components/subject-perfomance-chart";

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full">
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-3">
          <StudentPerformanceChart />
          <AttendanceRateChart />
          <SubjectPerformanceChart />
        </div>
      </ScrollArea>
    </section>
  );
}
