"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", score: 65 },
  { month: "February", score: 59 },
  { month: "March", score: 80 },
  { month: "April", score: 81 },
  { month: "May", score: 56 },
  { month: "June", score: 55 },
  { month: "July", score: 40 },
]

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function StudentPerformanceChart() {
  const lastMonthScore = chartData[chartData.length - 2].score
  const currentMonthScore = chartData[chartData.length - 1].score
  const percentageChange = ((currentMonthScore - lastMonthScore) / lastMonthScore) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
        <CardDescription>January - July 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--color-score)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? (
            <>
              Trending up by {Math.abs(percentageChange).toFixed(1)}% this month <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(percentageChange).toFixed(1)}% this month <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing student performance scores for the last 7 months
        </div>
      </CardFooter>
    </Card>
  )
}