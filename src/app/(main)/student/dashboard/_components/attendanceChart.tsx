"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const chartData = [
  { day: "Monday", attendance: 100 },
  { day: "Tuesday", attendance: 40 },
  { day: "Wednesday", attendance: 95 },
  { day: "Thursday", attendance: 97 },
  { day: "Friday", attendance: 94 },
];

const chartConfig = {
  attendance: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Bar Chart</CardTitle>
        <CardDescription>Last 5 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="attendance" fill="var(--color-attendance)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Overall Attendance - 94% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing attendance for the last 5 days
        </div>
      </CardFooter>
    </Card>
  );
}
