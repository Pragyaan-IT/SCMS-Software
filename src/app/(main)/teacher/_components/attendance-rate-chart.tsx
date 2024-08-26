"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"

const data = [
  { subject: "Math", attendanceRate: 95 },
  { subject: "Science", attendanceRate: 88 },
  { subject: "History", attendanceRate: 92 },
  { subject: "English", attendanceRate: 90 },
  { subject: "Art", attendanceRate: 85 },
];

const chartConfig = {
  attendanceRate: {
    label: "Attendance Rate",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AttendanceRateChart() {
  const averageAttendance = data.reduce((sum, item) => sum + item.attendanceRate, 0) / data.length
  const previousAverageAttendance = 89 // This would typically come from historical data
  const percentageChange = ((averageAttendance - previousAverageAttendance) / previousAverageAttendance) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Rates by Subject</CardTitle>
        <CardDescription>Current Semester Overview</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis 
                dataKey="subject" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
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
        <div className="flex gap-2 font-medium leading-none">
          {percentageChange > 0 ? (
            <>
              Trending up by {percentageChange.toFixed(1)}% this semester <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(percentageChange).toFixed(1)}% this semester <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing attendance rates for all subjects this semester
        </div>
      </CardFooter>
    </Card>
  )
}