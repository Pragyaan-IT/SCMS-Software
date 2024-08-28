"use client"

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
    const [nextFiveDays, setNextFiveDays] = useState<any[]>([])
    const [nextFiveDates, setNextFiveDates] = useState<any[]>([])
    const [activeDate, setActiveDate] = useState("")

    const getDays = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    }

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
    }

    useEffect(() => {
        async function getTodayStudentClass(id: string) {
            const today = new Date().toLocaleString('en-US', { weekday: 'long' });
            const classes = await getTodayClass(id, today);
            setTodayClass(classes);
        }

        if (session) {
            getTodayStudentClass(session?.user.id);
        }
        getDays();
        getDates();
    }, [session])

    const findTimetable = async (index: number) => {
        setActiveDate(nextFiveDates[index]);
        const timetable = await getTodayClass(session?.user.id!, nextFiveDays[index]);
        setTodayClass(timetable);
    }

    return (
        <div className="p-4">
            <h1 className="font-semibold text-2xl text-gray-800">Timetable</h1>
            <div className="w-full mx-auto">
                <div className="flex justify-between items-center p-4 mb-4 bg-gray-300 border-b-1 border-gray-200 relative">
                    <div className="flex items-center">
                        <div className="text-lg font-semibold mr-4">
                            <span className="bg-blue-200 text-blue-800 py-1 px-2 rounded-full">26</span>
                            <span className="ml-2">August</span>, <span className="ml-2">2024</span>
                        </div>
                        <button id="toggle-calendar" className="ml-2 text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search months" className="search-input border border-gray-300 rounded-lg py-1 px-3" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-5 uppercase">
                        {
                            nextFiveDays.map((day, index) => (
                                <div key={index} className="p-4 text-center bg-gray-300 relative font-bold ">{day}</div>
                            ))
                        }
                    </div>
                    <div className="grid grid-cols-5">
                        {
                            nextFiveDates.map((date, index) => (
                                <div key={index} onClick={() => { findTimetable(index) }} className={cn("p-4 text-center relative bg-gray-400 cursor-pointer", activeDate===date && "bg-gray-200",new Date().getDate() === date && "bg-gray-800 text-white")}>{date}</div>
                            ))
                        }
                    </div>
                </div>

                <div className="bg-gray-300 p-2 border-t-1 border-gray-300 rounded">
                    <p className="font-semibold">Holidays</p>
                    <ul>
                        <li>August 26 - Janmashtami</li>
                        <li>August 28 - Sports Day</li>
                    </ul>
                </div>

                <div className="bg-gray-300 p-2 border-t-1 border-gray-300 rounded mt-4">
                    <p className="font-semibold">Timetable: {todayClass?.[0].day}</p>
                    {
                        todayClass?.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 border-b-1 border-gray-400 font-bold">
                                <span className="class-time">{getTiming(item.slot)}</span>
                                <span className="class-subject">{item.subjectName}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}