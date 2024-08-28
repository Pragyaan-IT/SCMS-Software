import PageTitle from "@/components/page-title";
import { dummyClasses, dummyTimetableData } from "../dummy-data";
import { AdvancedTimetableDataTable } from "./timetable";

export default function TimetablePage() {
  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Timetable" />
      <AdvancedTimetableDataTable
        timetableData={dummyTimetableData}
        classes={dummyClasses}
      />
    </section>
  );
}
