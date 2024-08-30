import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default function TeacherProfileCard({ profile }: { profile: any }) {
  // const studentData = await db
  //   .select({
  //     name: students.name,
  //     email: students.email,
  //     registrationId: students.registration_id,
  //     isFaceRegistered: students.is_face_registered,
  //     image: students.profile_pic,

  //   })
  //   .from(students)

  return (
    <Card className="h-min">
      <CardContent className="flex flex-col items-center gap-5 pt-6">
        <Image
          className="h-40 w-40 rounded-full"
          src={profile.profile_pic}
          alt="teacher pic"
          width={100}
          height={100}
        />
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
              <TableCell className="py-4 font-medium">Name</TableCell>
              <TableCell className="py-4 text-right">{profile.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium">Email</TableCell>
              <TableCell className="py-4 text-right">{profile.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium">Teacher ID</TableCell>
              <TableCell className="py-4 text-right">
                {profile.registration_id}
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell className="py-4 font-medium">
                Face Registration
              </TableCell>
              <TableCell className="pt-4 text-right">l
                {profile.is_face_registered ? (
                  <Badge>Face Registered</Badge>
                ) : (
                  <Badge variant={"destructive"}>Face Not Registered</Badge>
                )}
              </TableCell>
            </TableRow> */}
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
