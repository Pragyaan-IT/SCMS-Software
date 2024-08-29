"use client";
import { useModal } from "@/app/hooks/use-modal-store";
import SearchQuestionForm from "@/components/forms/SearchQuestionForm";
import { useAppContext } from "@/components/providers/context-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Circle, CircleDot, Dot, Plus, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { questionTypes } from "@/lib/types";


export default function DiscussionPage() {
    const { onOpen } = useModal();
    const { getAllDiscussion } = useAppContext();
    const [allDiscussions, setAllDiscussions] = useState<any[]>([])

    useEffect(() => {
        async function getDiscussions() {
            const data = await getAllDiscussion();
            setAllDiscussions(data);
        }
        getDiscussions()
    }, []);

    return (
        <div className="py-4 px-2">
            <div className="md:p-6 p-2 md:w-3/5 w-full border-2 border-gray-600 rounded-md mx-auto mt-4">
                <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200">
                    Discuss, ask questions and get help from your peers and teachers.
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                    If you have any questions, feel free to ask them here. Just click on the &quot;New Discussion&quot; button to get started.
                </p>
            </div>
            <div className="flex m-4 md:flex-row flex-col">
                <div className="md:w-4/5 w-full md:px-4 px-2">
                    <SearchQuestionForm />
                </div>
                <div className="flex gap-2 items-center mt-2 md:mt-0 md:justify-normal justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='bg-gray-200 px-4 text-black h-10 content-center text-medium rounded-lg flex items-center'>
                            <Tag size={20} className="mr-2" /> Labels
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Select Label</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {
                                questionTypes.map((type) => (
                                    <DropdownMenuItem key={type}>{type}</DropdownMenuItem>
                                ))
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>

                <Button onClick={() => { onOpen("newDiscussion") }} className="bg-gray-800 text-white rounded-lg px-4" >New Discussion</Button>
                </div>
            </div>

            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto mt-6">
                <div className="p-4 border-b border-gray-800 rounded-t-md bg-gray-200">
                    <div className="flex items-center gap-2">
                        <CircleDot size={20} />
                        <span className="text-black font-semibold text-lg">
                            {allDiscussions.length} Questions
                        </span>
                        <span className="text-md text-gray-700">
                            {
                                allDiscussions.filter(d => d.is_solved).length
                            } Answered
                        </span>
                    </div>
                </div>
                {
                    allDiscussions.map((discussion, index) => (
                        <Link key={index} href={`discussion/${discussion.id}`}>
                            <div className={cn("border-b group border-gray-800 p-4 hover:bg-gray-200 cursor-pointer", discussion.is_solved && "bg-green-200")}>
                                <div className="flex items-center gap-2">
                                    <CircleDot color="green" size={20} />
                                    <span className="text-black font-semibold text-lg content-center flex items-center gap-4  ">
                                        {discussion.title}
                                        {
                                            discussion.type && <Badge variant={discussion.type === "Doubt" ? "destructive" : "default"} >{discussion.type}</Badge>
                                        }
                                        {discussion.is_solved && <span className="text-green-700 text-sm">Solved</span>}
                                    </span>
                                </div>
                                <p className="text-gray-700 ">
                                    {discussion.description.substring(0, 100)}...
                                </p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}