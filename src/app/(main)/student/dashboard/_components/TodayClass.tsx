"use client";

import { useAppContext } from "@/components/providers/context-provider";
import { getTiming } from "@/lib/getTiming";
import { TodayClass } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <CardTitle className="text-white">Timetable</CardTitle>
        <CardDescription>Today's class</CardDescription>
      </CardHeader>
      <CardContent>
        {todayClass
          ?.sort((a: any, b: any) => a.slot - b.slot)
          .map((item, index) => (
            <div key={index} className="flex justify-between rounded px-1 md:px-4 py-2">
              <span className="md:text-base text-xs">{getTiming(item.slot)}</span>
              <span className="md:text-base text-sm">{item.teacherName}</span>
            </div>
          ))}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <p className="font-bold text-white">Overall Attendance - 94%</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StudentTodayClass;
