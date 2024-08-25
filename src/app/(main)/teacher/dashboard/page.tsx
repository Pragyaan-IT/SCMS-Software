"use client";
import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { AttendanceRecord } from "../attendance/columns";
import { dummyAttendance, dummyClasses } from "../dummy-data";

const processAttendanceData = (data: AttendanceRecord[]) => {
  return dummyClasses.map((className) => {
    const classAttendance = data.filter(
      (record) => record.className === className,
    );
    const presentCount = classAttendance.filter(
      (record) => record.present,
    ).length;
    const absentCount = classAttendance.length - presentCount;
    return {
      className,
      present: presentCount,
      absent: absentCount,
    };
  });
};

const chartConfig = {
  present: {
    label: "Present",
    color: "#22c55e",
  },
  absent: {
    label: "Absent",
    color: "#ef4444",
  },
} satisfies ChartConfig;

const chartData = processAttendanceData(dummyAttendance);

export default function DashboardPage() {
  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full">
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="className" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="var(--color-present)" name="Present" />
            <Bar dataKey="absent" fill="var(--color-absent)" name="Absent" />
          </BarChart>
        </ChartContainer>
      </ScrollArea>
    </section>
  );
}
