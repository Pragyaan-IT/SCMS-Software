import { Separator } from "@/components/ui/separator";
import { AttendanceChart } from "./attendanceChart";
import { GradeChart } from "./gradeChart";
import StudentTodayAttendance from "./TodayAttendance";
import StudentTodayClass from "./TodayClass";

const Dashboard = () => {
  return (
    <div className="flex h-screen flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-2 p-2 md:p-10">
        <div className="flex gap-2">
          <div className="flex w-fit flex-col items-center justify-center gap-4 rounded-lg px-6 pb-4 pt-2 shadow-2xl">
            <AttendanceChart />
          </div>
          <div className="flex w-fit flex-col items-center justify-center gap-4 rounded-lg px-6 py-2 shadow-2xl">
            <GradeChart />
          </div>
          <div className="flex w-full flex-col gap-4 rounded-lg p-4 shadow-2xl">
            <p>Upcoming Quizes</p>
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
          </div>
        </div>
        <div className="flex flex-1 gap-2">
          <StudentTodayAttendance />
          <StudentTodayClass />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
