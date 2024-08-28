import PageTitle from "@/components/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentComplaintsTable from "./_components/student-complaints-table";
import TeacherComplaintsTable from "./_components/teacher-complaints-table";

const dummyComplaints = [
  {
    id: 1,
    teacherName: "John Doe",
    teacherId: "T001",
    classroomNumber: "101",
    message: "Projector not working in Room 101",
    receivedAt: new Date("2024-08-26T09:00:00"),
    isResolved: false,
  },
  {
    id: 2,
    teacherName: "Jane Smith",
    teacherId: "T002",
    classroomNumber: "202",
    message: "Air conditioning issues in Room 202",
    receivedAt: new Date("2024-08-26T10:30:00"),
    isResolved: true,
  },
  {
    id: 3,
    teacherName: "Bob Johnson",
    teacherId: "T003",
    classroomNumber: "303",
    message: "Need more chairs in Room 303",
    receivedAt: new Date("2024-08-26T11:45:00"),
    isResolved: false,
  },
  {
    id: 4,
    teacherName: "Alice Williams",
    teacherId: "T004",
    classroomNumber: "404",
    message: "Whiteboard markers are dried out",
    receivedAt: new Date("2024-08-26T13:15:00"),
    isResolved: true,
  },
  {
    id: 5,
    teacherName: "Charlie Brown",
    teacherId: "T005",
    classroomNumber: "505",
    message: "Computer not booting up in Room 505",
    receivedAt: new Date("2024-08-26T14:30:00"),
    isResolved: false,
  },
  {
    id: 6,
    teacherName: "Diana Clark",
    teacherId: "T006",
    classroomNumber: "606",
    message: "Need more textbooks in Room 606",
    receivedAt: new Date("2024-08-26T15:45:00"),
    isResolved: true,
  },
];
const dummyStudents = [
  {
    id: 1,
    studentName: "John Smith",
    studentId: "S001",
    classroomNumber: "101",
    message: "Lost my textbook in Room 101",
    receivedAt: new Date("2024-08-26T09:00:00"),
    isResolved: false,
  },
  {
    id: 2,
    studentName: "Jane Johnson",
    studentId: "S002",
    classroomNumber: "202",
    message: "Need help with math homework in Room 202",
    receivedAt: new Date("2024-08-26T10:30:00"),
    isResolved: true,
  },
  {
    id: 3,
    studentName: "Bob Williams",
    studentId: "S003",
    classroomNumber: "303",
    message: "Broken chair in Room 303",
    receivedAt: new Date("2024-08-26T11:45:00"),
    isResolved: false,
  },
  {
    id: 4,
    studentName: "Alice Brown",
    studentId: "S004",
    classroomNumber: "404",
    message: "Need more art supplies in Room 404",
    receivedAt: new Date("2024-08-26T13:15:00"),
    isResolved: true,
  },
  {
    id: 5,
    studentName: "Charlie Clark",
    studentId: "S005",
    classroomNumber: "505",
    message: "Computer not working in Room 505",
    receivedAt: new Date("2024-08-26T14:30:00"),
    isResolved: false,
  },
  {
    id: 6,
    studentName: "Diana Davis",
    studentId: "S006",
    classroomNumber: "606",
    message: "Need help with science project in Room 606",
    receivedAt: new Date("2024-08-26T15:45:00"),
    isResolved: true,
  },
];
export default async function GrievancePage() {
  // const data = await db.select().from(complaints);
  return (
    <section>
      <PageTitle title="Grievance Portal" />
      <Tabs defaultValue="student" className="w-full p-4 pt-0">
        <TabsList>
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentComplaintsTable data={dummyStudents} />
        </TabsContent>
        <TabsContent value="teacher">
          <TeacherComplaintsTable data={dummyComplaints} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
