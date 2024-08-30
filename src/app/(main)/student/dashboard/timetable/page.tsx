"use client";

import { useAppContext } from "@/components/providers/context-provider";
import { getTiming } from "@/lib/getTiming";
import { TodayClass } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TimetablePage() {
  const { getTodayClass } = useAppContext();

  const { data: session } = useSession();
  const [todayClass, setTodayClass] = useState<TodayClass[] | null>(null);
  const [nextFiveDays, setNextFiveDays] = useState<any[]>([]);
  const [nextFiveDates, setNextFiveDates] = useState<any[]>([]);
  const [activeDate, setActiveDate] = useState("");

  const getDays = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const result = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      if (nextDay.getDay() !== 0 && nextDay.getDay() !== 6) {
        result.push(days[nextDay.getDay()]);
      }
    }
    setNextFiveDays(result);
  };

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      if (nextDay.getDay() !== 0 && nextDay.getDay() !== 6) {
        dates.push(nextDay.getDate());
      }
    }
    setNextFiveDates(dates);
  };

  useEffect(() => {
    async function getTodayStudentClass(id: string) {
      const today = new Date().toLocaleString("en-US", { weekday: "long" });
      const classes = await getTodayClass(id, today);
      setTodayClass(classes);
    }

    if (session) {
      getTodayStudentClass(session?.user.id);
    }
    getDays();
    getDates();
  }, [session]);

  const findTimetable = async (index: number) => {
    setActiveDate(nextFiveDates[index]);
    const timetable = await getTodayClass(
      session?.user.id!,
      nextFiveDays[index],
    );
    setTodayClass(timetable);
  };

  return (
    <div className="p-4">
      <h1 className="te text-2xl font-semibold">Timetable</h1>
      <div className="mx-auto w-full">
        <div className="relative mb-4 flex items-center justify-between border border-b-1 p-4">
          <div className="flex items-center">
            <div className="mr-4 text-lg font-semibold">
              <span className="rounded-full px-2 py-1 text-blue-800">30</span>
              <span className="ml-2">August</span>,{" "}
              <span className="ml-2">2024</span>
            </div>
            <button
              id="toggle-calendar"
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-5 uppercase">
            {nextFiveDays.map((day, index) => (
              <div key={index} className="relative md:p-4 px-2 py-1 text-center md:text-base text-xs font-bold bg-gray-200 overflow-hidden">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5">
            {nextFiveDates.map((date, index) => (
              <div
                key={index}
                onClick={() => {
                  findTimetable(index);
                }}
                className={cn(
                  "relative cursor-pointer md:p-4 px-2 py-1 text-center",
                  activeDate === date && "bg-gray-200",
                  new Date().getDate() === date && "bg-green-500",
                )}
              >
                {date}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded border-t-1 p-2">
          <p className="font-semibold">Holidays</p>
          <ul>
            <li>August 26 - Janmashtami</li>
            <li>August 28 - Sports Day</li>
          </ul>
        </div>

        <div className="mt-4 rounded border-t-1 p-2">
          <p className="font-semibold">Timetable: {todayClass?.[0].day}</p>
          {todayClass?.map((item, index) => (
            <div
              key={index}
              className="bord flex items-center justify-between border-b-1 p-2 font-bold"
            >
              <span className="md:text-base md:font-bold text-sm">{getTiming(item.slot)}</span>
              <span className="md:text-base md:font-bold text-sm">{item.subjectName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
