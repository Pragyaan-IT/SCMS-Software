"use client";

import { useAppContext } from "@/components/providers/context-provider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTiming } from "@/lib/getTiming";
import { TodayClass } from "@/lib/types";
import { format, isSameDay } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TimetablePage() {
  const { getTodayClass } = useAppContext();
  const { data: session } = useSession();
  const [todayClass, setTodayClass] = useState<TodayClass[] | null>(null);
  const [nextFiveDays, setNextFiveDays] = useState<Date[]>([]);
  const [activeDate, setActiveDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    async function getTodayStudentClass(id: string) {
      const dayName = format(activeDate, "EEEE");
      const classes = await getTodayClass(id, dayName);
      setTodayClass(classes);
    }

    if (session) {
      getTodayStudentClass(session?.user.id);
    }

    // Calculate next five weekdays
    const days = [];
    let currentDate = new Date();
    while (days.length < 5) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        days.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setNextFiveDays(days);
  }, [session, activeDate]);

  const handleDateClick = (date: Date) => {
    setActiveDate(date);
  };

  return (
    <Card className="mx-auto w-full rounded-none border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Timetable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-[280px]"
            >
              {format(activeDate, "dd MMMM yyyy, EEEE")}
            </Button>
            <Input
              type="text"
              placeholder="Search months"
              className="max-w-[200px]"
            />
          </div>

          {isCalendarOpen && (
            <Calendar
              mode="single"
              selected={activeDate}
              onSelect={(date) => {
                if (date) {
                  setActiveDate(date);
                  setIsCalendarOpen(false);
                }
              }}
              className="rounded-md border"
            />
          )}

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {nextFiveDays.map((date, index) => (
              <Button
                key={index}
                variant={isSameDay(date, activeDate) ? "default" : "outline"}
                onClick={() => handleDateClick(date)}
              >
                {format(date, "EEE, MMM d")}
              </Button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Holidays</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>August 26 - Janmashtami</li>
                <li>August 28 - Sports Day</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timetable: {format(activeDate, "EEEE")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Subject</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayClass?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{getTiming(item.slot)}</TableCell>
                      <TableCell>{item.subjectName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
