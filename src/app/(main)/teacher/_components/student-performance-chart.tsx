import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 59 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 81 },
  { month: "May", score: 56 },
  { month: "Jun", score: 55 },
  { month: "Jul", score: 40 },
];

const chartConfig = {
 
} as ChartConfig;

export default function StudentPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
