"use client";
import PageTitle from "@/components/page-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { dummyClasses, dummyAttendance } from "../dummy-data";

export default function AttendanceTable() {
  const [selectedClass, setSelectedClass] = useState<string>(dummyClasses[0]);

  const filteredData = useMemo(() => {
    return dummyAttendance.filter(
      (record) => record.className === selectedClass,
    );
  }, [selectedClass]);

  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Attendance" />
      <div className="p-2">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger>
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            {dummyClasses.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={filteredData} />
    </section>
  );
}
