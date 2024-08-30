"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
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
  { name: "Attendance", weight: 10 },
  { name: "Feedback from Students", weight: 20 },
  {
    name: "Questions Answered",
    weight: 10,
  },
  {
    name: "Research Papers",
    weight: 15,
  },
  {
    name: "Average Entry Time",
    weight: 5,
  },
  {
    name: "Average Class Duration",
    weight: 10,
  },
  {
    name: "Average Student Attendance Per Class",
    weight: 10,
  },
  {
    name: "Resource Sharing",
    weight: 10,
  },
  {
    name: "Quiz Frequency",
    weight: 5,
  },
  {
    name: "After Quiz Feedback",
    weight: 5,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeightDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Distribution Chart</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            className="pl-10"
          >
            <CartesianGrid horizontal={false}  />
            <XAxis type="number" dataKey="weight" hide />
            <YAxis
              dataKey="name"
              type="category"
              // tickLine={false}
              // tickMargin={10}
              axisLine={false}
              className="text-lg"
              width={200}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="weight" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
