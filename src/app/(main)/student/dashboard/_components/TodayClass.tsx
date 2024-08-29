"use client";

import { useAppContext } from "@/components/providers/context-provider";
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
    <div className="h-full w-full rounded-lg p-4">
      <h1>Today&apos;s Classes ({todayClass?.[0]?.day})</h1>
      <div className="flex flex-col gap-2 p-4">
        {todayClass
          ?.sort((a: any, b: any) => a.slot - b.slot)
          .map((item, index) => (
            <div key={index} className="flex justify-between rounded px-4 py-2">
              <span>{getTiming(item.slot)}</span>
              <span>{item.subjectName}</span>
              <span>{item.teacherName}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StudentTodayClass;
