import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "./attendance";
import { AttendanceChart } from "./attendanceChart";
import { GradeChart } from "./gradeChart";

const Dashboard = () => {
    return (
        <div className="flex flex-1 h-screen">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-[#EAEDF7] dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    <div className="w-fit flex flex-col gap-4 items-center justify-center pt-2 pb-4 px-6 rounded-lg  bg-gray-800 dark:bg-neutral-800 shadow-2xl">
                        <AttendanceChart />
                        {/* <span className="text-lg text-left self-start text-white font-semibold">Attendance</span> */}
                        {/* <CircularProgress value={80} /> */}
                    </div>
                    <div className="w-fit flex flex-col gap-4 items-center justify-center py-2 px-6 rounded-lg  bg-gray-800 dark:bg-neutral-800 shadow-2xl">
                        {/* <CircularProgress value={90} />
                        <span className="text-2xl text-white font-semibold">Grade</span> */}
                        <GradeChart />
                    </div>
                    <div className="w-full rounded-lg  bg-gray-800 text-white dark:bg-neutral-800 flex flex-col gap-4 p-4 shadow-2xl">
                        <p>Upcoming Quizes</p>
                        <p className="flex justify-between">
                            <span className="font-semibold">Math:  20th June</span><span>08:00 PM</span>
                        </p>
                        <Separator />
                        <p className="flex justify-between">
                            <span className="font-semibold">Science: 25th June</span><span>08:00 PM</span>
                        </p>
                        <Separator />
                        <p className="flex justify-between">
                            <span className="font-semibold">History: 30th June</span><span>08:00 PM</span>
                        </p>
                    </div>
                 
                </div>
                <div className="flex gap-2 flex-1">
                    {[...new Array(2)].map((i, index) => (
                        <div
                            key={"second-array" + index}
                            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard