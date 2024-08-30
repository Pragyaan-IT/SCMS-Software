import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default async function ProfileCard({ profile }: { profile: any }) {
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
  console.log(profile)
  const studentData = {
    name: "Aman Varshney",
    email: "av.amanvarshney11@gmail.com",
    registrationId: "2215000198",
    isFaceRegistered: true,
    image: "https://api.multiavatar.com/avataaars/amanvarshney.png",
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex md:flex-row gap-6 flex-col">
        <Avatar className="h-32 w-32">
          <AvatarImage src={profile.profile_pic} />
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
              <TableCell className="py-4 font-medium">Name</TableCell>
              <TableCell className="py-4 text-right">
                {profile.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium">Email</TableCell>
              <TableCell className="py-4 text-right">
                {profile.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium">
                Registration ID
              </TableCell>
              <TableCell className="py-4 text-right">
                {profile.registration_id}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 font-medium">
                Face Registration
              </TableCell>
              <TableCell className="py-4 text-right">
                {profile.is_face_registered ? (
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
