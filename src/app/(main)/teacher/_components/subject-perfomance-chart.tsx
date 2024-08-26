"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "Math", averageScore: 85 },
  { subject: "Science", averageScore: 78 },
  { subject: "History", averageScore: 92 },
  { subject: "English", averageScore: 88 },
  { subject: "Art", averageScore: 95 },
];

const chartConfig = {
  averageScore: {
    label: "Average Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function SubjectPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance Comparison</CardTitle>
        <CardDescription>Average scores across all subjects</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <Radar
                name="Average Score"
                dataKey="averageScore"
                stroke="var(--color-averageScore)"
                fill="var(--color-averageScore)"
                fillOpacity={0.6}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
