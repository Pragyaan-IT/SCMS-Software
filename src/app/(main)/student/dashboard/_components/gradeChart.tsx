"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
  { exam: "Mid Term", examData: 7.8 },
  { exam: "End Term", examData: 8 },
];

const chartConfig = {
  examData: {
    label: "Exam",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function GradeChart() {
  return (
    <Card className="min-w-80">
      <CardHeader>
        <CardTitle className="">Grade</CardTitle>
        <CardDescription>Exams</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[100px]" config={chartConfig}>
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
              dataKey="exam"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, 10]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="examData"
              type="natural"
              //   fill="var(--color-examData)"
              fillOpacity={0.4}
              //   stroke="var(--color-examData)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <p className="font-bold">Overall - 7.9</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
