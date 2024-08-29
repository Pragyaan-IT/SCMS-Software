"use client";

import { useAppContext } from "@/components/providers/context-provider";
import { getTiming } from "@/lib/getTiming";
import { TodayAttendance } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StudentTodayAttendance = () => {
  const { getTodayAttendance } = useAppContext();

  const { data: session } = useSession();
  const [todayAttendance, setTodayAttendance] = useState<
    TodayAttendance[] | null
  >(null);

  useEffect(() => {
    async function getTodayStudentAttendance(id: string) {
      const attendance = await getTodayAttendance(id);
      setTodayAttendance(attendance);
    }

    if (session) {
      getTodayStudentAttendance(session?.user.id);
    }
  }, [session]);

  return (
    <div className="h-full w-full rounded-lg p-4">
      <h1>Today&apos;s Attendance</h1>
      <div className="flex flex-col gap-2 p-4">
        {todayAttendance
          ?.sort((a: any, b: any) => a.slot - b.slot)
          .map((attendance, index) => (
            <div key={index} className="flex justify-between rounded px-4 py-2">
              <span>{getTiming(attendance.slot)}</span>
              <span>{attendance.subjectName}</span>
              <span>{attendance.attendance ? "Present" : "Absent"}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentTodayAttendance;
