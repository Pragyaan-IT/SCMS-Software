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
  { parameter: "CPI", value: "8.2/10", weight: 30 },
  { parameter: "Questions Asked", value: "12 questions", weight: 15 },
  { parameter: "Quiz Scores", value: "85%", weight: 20 },
  { parameter: "Entry Time Score", value: "8/10", weight: 10 },
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
      <div className="mt-4 rounded-md p-4">
        <h3 className="mb-2 text-lg font-semibold">Formula Recap</h3>
        <p className="text-sm">
          Profile Score = (Attendance × w₁ + CPI × w₂ + Questions Asked × w₃ +
          Quiz Scores × w₄ + Entry Time Score × w₅) / Total Weights
        </p>
      </div>
    </div>
  );
};

export default ProfileScoreTable;
