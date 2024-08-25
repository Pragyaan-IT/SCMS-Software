import PageTitle from "@/components/page-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyAttendance, dummyClasses } from "../dummy-data";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


export default async function DashboardPage() {
  const attendanceData = dummyClasses.map((className) => {
    const classAttendance = dummyAttendance.filter(
      (record) => record.className === className,
    );
    const presentCount = classAttendance.filter(
      (record) => record.present,
    ).length;
    return { class: className, present: presentCount };
  });

  return (
    <section>
      <PageTitle title="Dashboard" />
      <ScrollArea className="h-full w-full">
        <BarChart width={500} height={300} data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="class" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="present" fill="#8884d8" />
        </BarChart>
      </ScrollArea>
    </section>
  );
}
