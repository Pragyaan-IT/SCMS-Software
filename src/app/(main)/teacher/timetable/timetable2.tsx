"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

const subjectColors: { [key: string]: string } = {
  Math: "bg-blue-100",
  Physics: "bg-green-100",
  Chemistry: "bg-purple-100",
  Biology: "bg-red-100",
  History: "bg-yellow-100",
  English: "bg-indigo-100",
};

interface Subject {
  name: string;
}

interface Class {
  name: string;
}

interface TimetableEntry {
  day: string;
  slot: string;
  subject: Subject;
  class: Class;
}

interface TeacherTimetableProps {
  teacherId: number;
}

const TeacherTimetable: React.FC<TeacherTimetableProps> = ({ teacherId }) => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>(getCurrentWeek());

  useEffect(() => {
    fetchTimetableData(teacherId, selectedWeek);
  }, [teacherId, selectedWeek]);

  const fetchTimetableData = async (teacherId: number, week: string) => {
    // Mock data - replace with actual API call
    const mockData: TimetableEntry[] = [
      {
        day: "Monday",
        slot: "9:00 AM",
        subject: { name: "Math" },
        class: { name: "Grade 10" },
      },
      {
        day: "Monday",
        slot: "11:00 AM",
        subject: { name: "Physics" },
        class: { name: "Grade 11" },
      },
      {
        day: "Tuesday",
        slot: "10:00 AM",
        subject: { name: "Chemistry" },
        class: { name: "Grade 12" },
      },
      {
        day: "Wednesday",
        slot: "1:00 PM",
        subject: { name: "Biology" },
        class: { name: "Grade 9" },
      },
      {
        day: "Thursday",
        slot: "2:00 PM",
        subject: { name: "History" },
        class: { name: "Grade 10" },
      },
      {
        day: "Friday",
        slot: "3:00 PM",
        subject: { name: "English" },
        class: { name: "Grade 11" },
      },
    ];
    setTimetableData(mockData);
  };

  function getCurrentWeek(): string {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    return startOfWeek.toISOString().split("T")[0];
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Teachers Timetable</h2>
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(4)].map((_, i) => {
              const date = new Date(getCurrentWeek());
              date.setDate(date.getDate() + i * 7);
              const weekStart = date.toISOString().split("T")[0];
              return (
                <SelectItem key={i} value={weekStart}>
                  Week of {weekStart}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            {daysOfWeek.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {daysOfWeek.map((day) => {
                const lesson = timetableData.find(
                  (item) => item.day === day && item.slot === time,
                );
                return (
                  <TableCell key={`${day}-${time}`} className="p-0">
                    {lesson && (
                      <div
                        className={`h-full p-2 ${subjectColors[lesson.subject.name] || "bg-gray-100"}`}
                      >
                        <div className="font-semibold">
                          {lesson.subject.name}
                        </div>
                        <div className="text-sm">{lesson.class.name}</div>
                      </div>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TeacherTimetable;
