"use client"

import { useAppContext } from "@/components/providers/context-provider"
import { Student } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
    const { getStudentProfile } = useAppContext()
    const { data: session } = useSession();
    const [profile, setProfile] = useState<Student[]>([])

    useEffect(() => {
        async function getProfile(id: string) {
            const profileData = await getStudentProfile(id);
            setProfile(profileData);
        }
        if (session) {
            getProfile(session?.user.id);
        }
    }, [session])

    return (

        <Tabs defaultValue="profile" className="py-8 px-16">
            <div>
                <nav className="flex gap-4">
                    <TabsList className="bg-transparent">
                        <TabsTrigger value="profile" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none" >
                            <span className="text-lg font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"> Profile </span>
                        </TabsTrigger>
                        <TabsTrigger value="progress" className="data-[state=active]:border-b-1 data-[state=active]:border-black data-[state=active]:shadow-none rounded-none">
                            <span className="inline-flex items-center font-medium text-gray-600 text-lg">
                                Progress Report
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </nav>
            </div>
            <Separator className="w-2/4 bg-gray-400" />
            <TabsContent value="profile">
                <div className="flex flex-col justify-center items-center h-4/5 mt-6">
                    <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-gray-200 bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                        <div className="mt-2 mb-8 w-full">
                            <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                                {profile[0]?.name}
                            </h4>
                            <p className="mt-2 px-2 text-base text-gray-600">
                                As we live, our hearts turn colder. Cause pain is what we go through
                                as we become older. We get insulted by others, lose trust for those
                                others. We get back stabbed by friends. It becomes harder for us to
                                give others a hand. We get our heart broken by people we love, even
                                that we give them all...
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 px-2 w-full">
                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Class</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Stanford University
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Languages</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    English, Spanish, Italian
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Department</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Product Design
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Work History</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    English, Spanish, Italian
                                </p>
                            </div>

                            <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Organization</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    Simmmple Web LLC
                                </p>
                            </div>

                            <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                <p className="text-sm text-gray-600">Birthday</p>
                                <p className="text-base font-medium text-navy-700 dark:text-white">
                                    20 July 1986
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </TabsContent>
            <TabsContent value="progress">
            </TabsContent>
        </Tabs>

    )
}
