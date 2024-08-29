"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
const chartData = [
  { day: "Monday", desktop: 100 },
  { day: "Tuesday", desktop: 80 },
  { day: "Wednesday", desktop: 95 },
  { day: "Thursday", desktop: 97 },
  { day: "Friday", desktop: 94 },
];

const chartConfig = {
  desktop: {
    label: "Day",
    color: "#fff",
  },
} satisfies ChartConfig;

export function AttendanceChart() {
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle className="dark:text-white text-black">Attendance</CardTitle>
        <CardDescription>Attendance (last 5 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              // fill="var(--color-desktop)"
              fillOpacity={0.4}
              // stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <p className="font-bold text-white">Overall Attendance - 94%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
