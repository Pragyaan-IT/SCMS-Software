"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { countPresentStudent, getTotalStudent } from "@/db/actions";

const chartConfig = {
  attendanceRate: {
    label: "Attendance Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AttendanceRateChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const totalStudentResponse = await getTotalStudent(1);
      const totalStudents = totalStudentResponse[0]?.totalStudents as number;

      const attendanceRecords = await countPresentStudent(4);

      const now = new Date();
      const pastDays = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(now);
        date.setDate(now.getDate() - i - 1); 
        return date.toISOString().split('T')[0]; 
      });

      const data = attendanceRecords
        .filter(record => pastDays.includes(record.attendanceDate))
        .map(record => {
          const attendanceRate = (record.presentStudents / totalStudents) * 100;
          return { day: record.attendanceDate, attendanceRate };
        });

      data.sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());

      setChartData(data);
    })();
  }, []);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Rates (Last 5 days)</CardTitle>
        <CardDescription>Current Semester Overview</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 100]}
              />
              <Bar
                dataKey="attendanceRate"
                fill="var(--color-attendanceRate)"
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing attendance rates for the last 5 days (excluding today)
        </div>
      </CardFooter>
    </Card>
  );
}
