import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  { subject: "Math", attendanceRate: 95 },
  { subject: "Science", attendanceRate: 88 },
  { subject: "History", attendanceRate: 92 },
  { subject: "English", attendanceRate: 90 },
  { subject: "Art", attendanceRate: 85 },
];

export function AttendanceRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Rates by Subject</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Bar dataKey="attendanceRate" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
