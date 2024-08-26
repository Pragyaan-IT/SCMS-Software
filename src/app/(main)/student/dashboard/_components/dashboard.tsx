import { Separator } from "@/components/ui/separator";
import { CircularProgress } from "./attendance";

const Dashboard = () => {
    return (
        <div className="flex flex-1 h-screen">
            <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
                <div className="flex gap-2">
                    <div className="w-fit flex flex-col gap-4 items-center justify-center py-2 px-6 rounded-lg  bg-gray-200 dark:bg-neutral-800">
                        <CircularProgress value={80} />
                        <span className="text-2xl font-semibold">Attendance</span>
                    </div>
                    <div className="w-fit flex flex-col gap-4 items-center justify-center py-2 px-6 rounded-lg  bg-gray-200 dark:bg-neutral-800">
                        <CircularProgress value={90} />
                        <span className="text-2xl font-semibold">Grade</span>
                    </div>
                    <div className="w-full rounded-lg  bg-gray-200 dark:bg-neutral-800 flex flex-col gap-4 p-4">
                        <p>Upcoming Quizes</p>
                        <p>
                            <span className="font-semibold">Math:</span> 20th June
                        </p>
                        <Separator />
                        <p>
                            <span className="font-semibold">Science:</span> 25th June
                        </p>
                        <Separator />
                        <p>
                            <span className="font-semibold">History:</span> 30th June
                        </p>
                    </div>
                    <div className="w-full rounded-lg  bg-gray-200 dark:bg-neutral-800"></div>
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