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
            <div className="p-6 md:w-3/5 w-4/5 border-2 border-gray-600 rounded-md mx-auto mt-4">
                <h3 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-200">
                    Discuss, ask questions and get help from your peers and teachers.
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                    If you have any questions, feel free to ask them here. Just click on the "New Discussion" button to get started.
                </p>
            </div>
            <div className="flex m-4">
                <div className="w-4/5 px-4">
                    <SearchQuestionForm />
                </div>
                <div>
                    <Button variant="bordered">
                        <Tag size={20} />
                        Labels
                    </Button>
                </div>
                <Button onClick={() => { onOpen("newDiscussion") }} className="bg-gray-800 text-white ml-2 rounded-lg px-4" >New Discussion</Button>
            </div>

            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto">
                <div className="p-4 border-b border-gray-800 rounded-t-md bg-gray-200">
                    <div className="flex items-center gap-2">
                        <CircleDot size={20} />
                        <span className="text-black font-semibold text-lg">
                            {allDiscussions.length} Questions
                        </span>
                        <span className="text-md text-gray-700">
                            {
                                allDiscussions.filter(d => d.is_solved).length 
                            }Answered
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
                                        discussion.type && <Badge variant={discussion.type==="Doubt"?"destructive":"default"} >{discussion.type}</Badge> 
                                        }
                                        {discussion.is_solved ? "Solved" : "Unsolved"}
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