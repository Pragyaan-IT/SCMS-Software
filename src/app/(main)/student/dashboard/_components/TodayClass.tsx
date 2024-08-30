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
import { TodayClass } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StudentTodayClass = () => {
  const { getTodayClass } = useAppContext();

  const { data: session } = useSession();
  const [todayClass, setTodayClass] = useState<TodayClass[] | null>(null);

  useEffect(() => {
    async function getTodayStudentClass(id: string) {
      const today = new Date().toLocaleString("en-US", { weekday: "long" });
      const classes = await getTodayClass(id, today);
      console.log(classes);
      setTodayClass(classes);
    }

    if (session) {
      getTodayStudentClass(session?.user.id);
    }
  }, [session]);

  return (
    <Card className="md:w-1/2">
      <CardHeader>
        <CardTitle className="">Timetable</CardTitle>
        <CardDescription>Today&apos;s class</CardDescription>
      </CardHeader>
      <CardContent>
        {todayClass
          ?.sort((a: any, b: any) => a.slot - b.slot)
          .map((item, index) => (
            <div
              key={index}
              className="flex justify-between rounded px-1 py-2 md:px-4"
            >
              <span className="text-xs md:text-base">
                {getTiming(item.slot)}
              </span>
              <span className="text-sm md:text-base">{item.teacherName}</span>
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

export default StudentTodayClass;
