"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

export default function QuestionsAnsweredChart() {
  return (
    <Card className="w-1/2">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            answered: {
              color: "hsl(var(--chart-1))",
            },
            unanswered: {
              color: "hsl(var(--chart-2))",
            },
            avgResponseTime: {
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                value: (150 / 200) * 100,
                label: "150/200",
                fill: "var(--color-answered)",
              },
              {
                value: (50 / 200) * 100,
                label: "50/200",
                fill: "var(--color-unanswered)",
              },
              {
                value: (2.5 / 4) * 100, // Assuming max response time of 4 hours
                label: "2.5 hrs",
                fill: "var(--color-avgResponseTime)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4 ml-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground text-orange-700">Answered</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-orange-700">
              150
              <span className="text-sm font-normal text-muted-foreground">
                questions
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground text-cyan-700">Unanswered</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-cyan-700">
              50
              <span className="text-sm font-normal text-muted-foreground">
                questions
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground text-teal-900">Avg Response Time</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none text-teal-900">
              2.5
              <span className="text-sm font-normal text-muted-foreground">
                hrs
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
