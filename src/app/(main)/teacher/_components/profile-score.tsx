"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export default function TeacherDashboard() {
  return (
    <Card className="w-1/2">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Classes Taught</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              15/20
              <span className="text-sm font-normal text-muted-foreground">
                classes
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Avg Attendance</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              85%
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">
              Assignments Graded
            </div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              30/40
              <span className="text-sm font-normal text-muted-foreground">
                assignments
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            classes: {
              label: "Classes",
              color: "hsl(var(--chart-1))",
            },
            attendance: {
              label: "Attendance",
              color: "hsl(var(--chart-2))",
            },
            grading: {
              label: "Grading",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity: "grading",
                value: (30 / 40) * 100,
                fill: "var(--color-grading)",
              },
              {
                activity: "attendance",
                value: 85,
                fill: "var(--color-attendance)",
              },
              {
                activity: "classes",
                value: (15 / 20) * 100,
                fill: "var(--color-classes)",
              },
            ]}
            innerRadius="20%"
            barSize={24}
            startAngle={90}
            endAngle={450}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              dataKey="value"
              tick={false}
            />
            <RadialBar dataKey="value" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
