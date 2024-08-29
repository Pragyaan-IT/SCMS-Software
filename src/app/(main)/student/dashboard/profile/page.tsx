"use client";

import { useAppContext } from "@/components/providers/context-provider";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Student } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { getStudentProfile } = useAppContext();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<Student[]>([]);

  useEffect(() => {
    async function getProfile(id: string) {
      const profileData = await getStudentProfile(id);
      setProfile(profileData);
    }
    if (session) {
      getProfile(session?.user.id);
    }
  }, [session]);

  return (
    <Tabs defaultValue="profile" className="px-16 py-8">
      <div>
        <nav className="flex gap-4">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="profile"
              className="rounded-none data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none"
            >
              <span className="text-lg font-medium">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="rounded-none data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none"
            >
              <span className="inline-flex items-center text-lg font-medium">
                Progress Report
              </span>
            </TabsTrigger>
          </TabsList>
        </nav>
      </div>
      <Separator className="w-2/4" />
      <TabsContent value="profile">
        <div className="mt-6 flex h-4/5 flex-col items-center justify-center">
          <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto flex w-[700px] max-w-[95%] flex-col items-center rounded-[20px] bg-clip-border p-3 dark:!shadow-none">
            <div className="mb-8 mt-2 w-full">
              <h4 className="px-2 text-xl font-bold">{profile[0]?.name}</h4>
              <p className="mt-2 px-2 text-base">
                As we live, our hearts turn colder. Cause pain is what we go
                through as we become older. We get insulted by others, lose
                trust for those others. We get back stabbed by friends. It
                becomes harder for us to give others a hand. We get our heart
                broken by people we love, even that we give them all...
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-4 px-2">
              <div className="shadow-3xl shadow-shadow-500 flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Class</p>
                <p className="text-navy-700 text-base font-medium">
                  Stanford University
                </p>
              </div>

              <div className="shadow-3xl shadow-shadow-500 flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Languages</p>
                <p className="text-navy-700 text-base font-medium">
                  English, Spanish, Italian
                </p>
              </div>

              <div className="shadow-3xl shadow-shadow-500 flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Department</p>
                <p className="text-navy-700 text-base font-medium">
                  Product Design
                </p>
              </div>

              <div className="shadow-3xl shadow-shadow-500 flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Work History</p>
                <p className="text-navy-700 text-base font-medium">
                  English, Spanish, Italian
                </p>
              </div>

              <div className="shadow-3xl shadow-shadow-500 flex flex-col items-start justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Organization</p>
                <p className="text-navy-700 text-base font-medium">
                  Simmmple Web LLC
                </p>
              </div>

              <div className="shadow-3xl shadow-shadow-500 flex flex-col justify-center rounded-2xl bg-clip-border px-3 py-4 dark:shadow-none">
                <p className="text-sm">Birthday</p>
                <p className="text-navy-700 text-base font-medium">
                  20 July 1986
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="progress"></TabsContent>
    </Tabs>
  );
}
