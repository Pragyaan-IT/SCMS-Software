"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export default function StudentProfileScore() {
  return (
    <Card className="">
      <CardContent className="flex justify-between gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Profile Score</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              95
              <span className="text-sm font-normal text-muted-foreground">
                score
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Avg Attendance</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              92%
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Quizzes Created</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              30
              <span className="text-sm font-normal text-muted-foreground">
                quizzes
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
          className="min-h-[100px]"
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
                activity: "score",
                value: (95 / 100) * 100,
                fill: "var(--color-grading)",
              },
              {
                activity: "attendance",
                value: 92,
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
