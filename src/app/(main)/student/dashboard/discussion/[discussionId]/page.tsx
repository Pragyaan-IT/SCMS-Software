"use client"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { ArrowLeft, CircleDot, Ellipsis } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DiscussionQuestion() {
    return (
        <div className="py-2 px-2">
            <div className="p-6 w-11/12 flex justify-around flex-col rounded-md mx-auto mt-4 gap-2">
                <Button variant="bordered" className="w-fit mr-auto">
                    <Link href="/student/dashboard/discussion" className="flex gap-2">
                        <ArrowLeft size={20} />
                        Back
                    </Link>
                </Button>
                <div className="flex items-center gap-8 my-4">
                    <h3 className="text-center font-semibold text-gray-800 dark:text-gray-200 text-lg md:text-3xl">
                        if api domain is different from app domain then urls will be wrong ?            </h3>
                    <Button className="bg-gray-800 text-white ml-2 rounded-lg px-4" >New Discussion</Button>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="bg-green-600 text-white ml-2 rounded-lg px-4" >
                        <CircleDot size={20} /> Unsolved
                    </Button>
                    <p>Nitish asked this 7 hours ago</p>
                </div>
            </div>
            <Separator className="my-4 w-11/12 mx-auto bg-gray-400" />
            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto my-4">
                <div className="flex items-center justify-between p-2 border-b border-black bg-gray-200">
                    <div className="flex items-center gap-4">
                        <Avatar src="https://avatars.dicebear.com/api/human/1.svg" size="sm" />
                        <span className="text-black font-semibold text-lg">
                            Nitish Kumar
                        </span>
                        <span className="text-md text-gray-700">
                            Asked this 7 hours ago
                        </span>
                    </div>
                    <Badge variant="outline" >Student</Badge>
                </div>
                <div className="py-4 px-6">
                    <p className="text-gray-700">
                        I have a question regarding the api domain. If the api domain is different from the app domain, then the urls will be wrong?
                    </p>
                    <p className="text-gray-700">
                        I have a question regarding the api domain. If the api domain is different from the app domain, then the urls will be wrong?
                    </p>
                    <p className="text-gray-700">
                        I have a question regarding the api domain. If the api domain is different from the app domain, then the urls will be wrong?
                    </p>
                    <p className="text-gray-700">
                        I have a question regarding the api domain. If the api domain is different from the app domain, then the urls will be wrong?
                    </p>
                    <p className="text-gray-700">
                        I have a question regarding the api domain. If the api domain is different from the app domain, then the urls will be wrong?
                    </p>
                </div>
            </div>
            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto my-4">
                <div className="flex items-center justify-between p-2 border-b border-black bg-gray-200">
                    <div className="flex items-center gap-4">
                        <Avatar src="https://avatars.dicebear.com/api/human/1.svg" size="sm" />
                        <span className="text-black font-semibold text-lg">
                            Aman Varshney
                        </span>
                        <span className="text-md text-gray-700">
                            commented on this 4 hours ago
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">

                        <Badge variant="default" >Teacher</Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Ellipsis size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Mark as solved</DropdownMenuItem>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                </div>
                <div className="py-4 px-6">
                    <p className="text-gray-700">
                        Can you please ellaborate your question a bit more?
                    </p>

                </div>
            </div>
            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto my-4">
                <div className="flex items-center justify-between p-2 border-b border-black bg-gray-200">
                    <div className="flex items-center gap-4">
                        <Avatar src="https://avatars.dicebear.com/api/human/1.svg" size="sm" />
                        <span className="text-black font-semibold text-lg">
                            Nitish Kumar
                        </span>
                        <span className="text-md text-gray-700">
                            commented on this 4 hours ago
                        </span>
                    </div>
                    <div className="flex gap-4 items-center">

                        <Badge variant="outline" >Student</Badge>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Ellipsis size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Mark as solved</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                </div>
                <div className="py-4 px-6">
                    <p className="text-gray-700">
                        Sir, I am facing this issue while integrating the api with the app. Can you please help me with this?
                    </p>

                </div>
            </div>


            <Separator className="my-4 w-11/12 mx-auto bg-gray-400" />
            <div className="w-11/12 mx-auto flex flex-col">
                <h3 className="text-center font-semibold text-gray-800 dark:text-gray-200 text-lg md:text-3xl">
                    Add a comment
                </h3>
                <div className="flex items-center gap-4 mt-4">
                    <Avatar src="https://avatars.dicebear.com/api/human/1.svg" size
                        ="sm" />
                    <textarea placeholder="Add a comment" className="w-full h-24 border border-gray-800 rounded-md p-2" />
                </div>
                <Button className="bg-gray-800 text-white ml-auto rounded-lg px-4 mt-2 w-fit" >Comment</Button>
            </div>
        </div>
    );
}