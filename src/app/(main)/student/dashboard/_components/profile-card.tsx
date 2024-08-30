import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";

export default async function ProfileCard() {
  // const studentData = await db
  //   .select({
  //     name: students.name,
  //     email: students.email,
  //     registrationId: students.registration_id,
  //     isFaceRegistered: students.is_face_registered,
  //     image: students.profile_pic,

  //   })
  //   .from(students)

  // dummy data
  const studentData = {
    name: "Aman Varshney",
    email: "av.amanvarshney11@gmail.com",
    registrationId: "2215000198",
    isFaceRegistered: true,
    image: "https://api.multiavatar.com/avataaars/amanvarshney.png",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <Avatar className="h-32 w-32">
          <AvatarImage src={studentData.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Table>
          {/* <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader> */}
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Name</TableCell>
              <TableCell className="text-right">{studentData.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell className="text-right">{studentData.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Registration ID</TableCell>
              <TableCell className="text-right">
                {studentData.registrationId}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Face Registration</TableCell>
              <TableCell className="text-right">
                {studentData.isFaceRegistered ? (
                  <Badge>Face Registered</Badge>
                ) : (
                  <Badge variant={"destructive"}>Face Not Registered</Badge>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">{studentData.name}</h2>
          <p>{studentData.email}</p>
          <p>{studentData.registrationId}</p>
          <p>
            {studentData.isFaceRegistered ? (
              <Badge>Face Registered</Badge>
            ) : (
              <Badge variant={"destructive"}>Face Not Registered</Badge>
            )}
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
}
