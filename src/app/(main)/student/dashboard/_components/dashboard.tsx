import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AttendanceChart } from "./attendanceChart";
import { GradeChart } from "./gradeChart";
import ProfileCard from "./profile-card";
import StudentTodayAttendance from "./TodayAttendance";
import StudentTodayClass from "./TodayClass";

const Dashboard = () => {
  return (
    <ScrollArea className="h-svh">
      <div className="flex flex-col gap-2 p-2 md:p-10">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 h-min">
          <div className="w-full col-span-2">
            <ProfileCard />
          </div>
          <AttendanceChart />
          <GradeChart />
        </div>
        <div className="flex flex-1 flex-col gap-2 md:flex-row">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Quizes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex justify-between">
                <span className="font-semibold">Math: 20th June</span>
                <span>08:00 PM</span>
              </p>
              <Separator />
              <p className="flex justify-between">
                <span className="font-semibold">Science: 25th June</span>
                <span>08:00 PM</span>
              </p>
              <Separator />
              <p className="flex justify-between">
                <span className="font-semibold">History: 30th June</span>
                <span>08:00 PM</span>
              </p>
            </CardContent>
          </Card>
          <StudentTodayAttendance />
          <StudentTodayClass />
        </div>
      </div>
    </ScrollArea>
  );
};

export default Dashboard;
