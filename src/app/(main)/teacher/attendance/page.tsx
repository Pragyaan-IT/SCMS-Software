"use client";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Import dummy data
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyAttendance, dummyStudents } from "../dummy-data";
import { useAppContext } from "@/components/providers/context-provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TeacherClasses } from "@/lib/types";

export default function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const router = useRouter()

  const { getAttendance, getTeacherClasses, attendanceList, teacherClasses: dummyClasses } = useAppContext();

  const filteredData = useMemo(() => {
    return attendanceList.filter((record: any) => {
      const student = dummyStudents.find((s) => s.id === record.student_id);
      const matchesClass = selectedClass
        ? student?.class_id.toString() === selectedClass
        : true;
      const matchesDate = dateRange
        ? new Date(record.date) >= (dateRange.from || new Date(0)) &&
        new Date(record.date) <= (dateRange.to || new Date())
        : true;
      const matchesSearch = searchQuery
        ? student?.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesClass && matchesDate && matchesSearch;
    });
  }, [selectedClass, dateRange, searchQuery]);

  const formattedData = useMemo(() => {
    return filteredData.map((record: any) => {
      const student = dummyStudents.find((s) => s.id === record.student_id);
      const className =
        dummyClasses?.find((c) => c.id === student?.class_id)?.className || "Unknown";
      return {
        id: record.id,
        studentName: student?.name || "Unknown",
        className,
        date: format(new Date(record.date), "PPP"),
        present: record.present,
      };
    });
  }, [filteredData]);

  if (!session || session.user.role !== "teacher") {
    router.push("/");
    return;
  }

  useEffect(() => {
    getTeacherClasses(parseInt(session.user.id));
  }, []);

  useEffect(() => {
    let intervalId: any = null;
    const startInterval = () => {
      intervalId = setInterval(async () => {
        getAttendance(parseInt(session.user.id));
      }, 2000);
    };

    const stopInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const checkAndSetInterval = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      if (minutes < 15) {
        if (!intervalId) {
          startInterval();
        }
      } else {
        stopInterval();
      }
    };

    getAttendance(parseInt(session.user.id));

    checkAndSetInterval();
    const hourlyCheckId = setInterval(checkAndSetInterval, 60000);

    return () => {
      stopInterval();
      clearInterval(hourlyCheckId);
    };
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Attendance" />
      <div className="flex flex-wrap justify-between gap-4 p-2">
        <Input
          placeholder="Search student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px]"
        />
        <div className="flex flex-row gap-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {dummyClasses.map((cls: any) => (
                <SelectItem key={cls.id} value={cls.id.toString()}>
                  {cls.className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[300px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ScrollArea className="h-[calc(100dvh-220px)] w-[calc(100dvw-60px)] lg:w-[calc(100dvw-280px)]">
        <DataTable columns={columns} data={attendanceList} />
      </ScrollArea>
    </section>
  );
}
