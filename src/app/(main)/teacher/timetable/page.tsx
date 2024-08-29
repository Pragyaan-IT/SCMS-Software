import PageTitle from "@/components/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummyClasses, dummyTimetableData } from "../dummy-data";
import TimetableDataTable from "./timetable";
import TeacherTimetable from "./timetable2";

export default function TimetablePage() {
  return (
    <section className="flex flex-col gap-4">
      <PageTitle title="Timetable" />
      <Tabs defaultValue="Timetable">
        <TabsList>
          <TabsTrigger value="Data Table">Data Table</TabsTrigger>
          <TabsTrigger value="Timetable">Timetable</TabsTrigger>
        </TabsList>
        <TabsContent value="Data Table">
          <TimetableDataTable
            timetableData={dummyTimetableData}
            classes={dummyClasses}
          />
        </TabsContent>
        <TabsContent value="Timetable">
          <TeacherTimetable teacherId={1} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
