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
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Import dummy data
import { ScrollArea } from "@/components/ui/scroll-area";
import { dummyAttendance, dummyClasses, dummyStudents } from "../dummy-data";

export default function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return dummyAttendance.filter((record: any) => {
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
        dummyClasses.find((c) => c.id === student?.class_id)?.name || "Unknown";
      return {
        id: record.id,
        studentName: student?.name || "Unknown",
        className,
        date: format(new Date(record.date), "PPP"),
        present: record.present,
      };
    });
  }, [filteredData]);

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
                  {cls.name}
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
        <DataTable columns={columns} data={formattedData} />
      </ScrollArea>
    </section>
  );
}
