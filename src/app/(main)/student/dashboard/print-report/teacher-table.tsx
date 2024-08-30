import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { parameter: "Attendance", value: "90%", weight: 25 },
  { parameter: "Feedback from Students", value: "8.2/10", weight: 30 },
  { parameter: "Questions Answered", value: "12", weight: 15 },
  { parameter: "Research Papers", value: "37", weight: 20 },
  { parameter: "Avg. Class Enter Time", value: "8/10", weight: 10 },
  { parameter: "Avg. Class Duration", value: "8/10", weight: 10 },
  { parameter: "Avg. Student Attendance", value: "8/10", weight: 10 },
  { parameter: "Resource Sharing", value: "8/10", weight: 10 },
  { parameter: "Quiz Frequency", value: "8/10", weight: 10 },
  { parameter: "After Quiz Feedback", value: "8/10", weight: 10 },
];

const ProfileScoreTable = () => {
  return (
    <div className="rounded-lg p-4 shadow-md">
      <Table>
        <TableCaption className="mb-2 text-lg font-semibold">
          Profile Score Parameters
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Parameter</TableHead>
            <TableHead className="w-1/3">Value</TableHead>
            <TableHead className="w-1/3">Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.parameter}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.weight}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProfileScoreTable;
