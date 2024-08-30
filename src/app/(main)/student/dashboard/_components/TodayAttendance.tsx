"use client";

import { useAppContext } from "@/components/providers/context-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="md:w-1/2">
      <CardHeader>
        <CardTitle>Timetable</CardTitle>
        <CardDescription>Today&apos;s Attendance</CardDescription>
      </CardHeader>
      <CardContent>
        {todayAttendance
          ?.sort((a: any, b: any) => a.slot - b.slot)
          .map((attendance, index) => (
            <div
              key={index}
              className="flex justify-between rounded px-1 py-2 md:px-4"
            >
              <span className="text-xs md:text-base">
                {getTiming(attendance.slot)}
              </span>
              <span className="text-xs md:text-base">
                {attendance.subjectName}
              </span>
              <span className="text-xs md:text-base">
                {attendance.attendance ? "Present" : "Absent"}
              </span>
            </div>
          ))}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <p className="font-bold">Overall Attendance - 94%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentTodayAttendance;
