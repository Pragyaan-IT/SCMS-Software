import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AttendanceChart } from "./attendanceChart";
import { GradeChart } from "./gradeChart";
import ProfileCard from "./profile-card";
import StudentTodayAttendance from "./TodayAttendance";
import StudentTodayClass from "./TodayClass";
import TotalAttendanceChart from "./total-attendance-chart";

const Dashboard = ({profile}:{profile:any}) => {
  return (
    <ScrollArea className="h-svh">
      <div className="flex flex-col gap-2 p-2 md:p-10">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 h-min">
          <div className="w-full col-span-2">
            <ProfileCard profile={profile} />
          </div>
          <TotalAttendanceChart />
          <AttendanceChart />
          {/* <GradeChart /> */}
        </div>
        <div className="flex flex-1 flex-col gap-2 md:flex-row ">
          <Card className="md:w-1/4 w-full">
            <CardHeader>
              <CardTitle>Upcoming Quizes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="flex justify-between flex-col">
                <span className="font-semibold">Math: 20th June</span>
                <span>08:00 PM</span>
              </p>
              <Separator />
              <p className="flex justify-between flex-col">
                <span className="font-semibold">Science: 25th June</span>
                <span>08:00 PM</span>
              </p>
              <Separator />
              <p className="flex justify-between flex-col">
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
