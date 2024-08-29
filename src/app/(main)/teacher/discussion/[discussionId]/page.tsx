"use client"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { ArrowLeft, CheckCircle, CircleDot, Ellipsis } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { useAppContext } from "@/components/providers/context-provider";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function DiscussionQuestion({ params }: { params: { discussionId: string } }) {
    const { data: session } = useSession()
    const { getDiscussions, replyDiscussion, getDiscussionReply, markSolved } = useAppContext();
    const [discussion, setDiscussion] = useState<any[]>([])
    const [reply, setReply] = useState("")
    const [discussionReply, setDiscussionReply] = useState<any[]>([])

    async function getDiscussion() {
        const data = await getDiscussions(parseInt(params.discussionId));
        setDiscussion(data);

        const replyData = await getDiscussionReply(parseInt(params.discussionId));
        console.log(replyData)
        setDiscussionReply(replyData);
    }

    useEffect(() => {
        getDiscussion()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReply(e.target.value);
    }

    const handleReply = async () => {
        replyDiscussion(parseInt(params.discussionId), reply);
        getDiscussion();
        setReply("");
    }

    const markasSolved = (id: number) => {
        markSolved(parseInt(params.discussionId), id);
    }

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
                        {discussion[0]?.title}            </h3>
                    <Button className="bg-gray-800 text-white ml-2 rounded-lg px-4" >New Discussion</Button>
                </div>
                <div className="flex items-center gap-4">
                    <Button className="bg-green-600 text-white ml-2 rounded-lg px-4" >
                        <CircleDot size={20} /> {discussion[0]?.is_solved ? "Solved" : "Unsolved"}
                    </Button>
                    <p>{discussion[0]?.student_name} asked this on {new Date(discussion[0]?.created_at).toDateString()}</p>
                </div>
            </div>
            <Separator className="my-4 w-11/12 mx-auto bg-gray-400" />
            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto my-4">
                <div className="flex items-center justify-between p-2 border-b border-black bg-gray-200">
                    <div className="flex items-center gap-4">
                        <Avatar fallback={discussion[0]?.student_name[0]} size="sm" />
                        <span className="text-black font-semibold text-lg">
                            {discussion[0]?.student_name}
                        </span>
                        <span className="text-md text-gray-700">
                            Asked this on {new Date(discussion[0]?.created_at).toDateString()}
                        </span>
                    </div>
                    <Badge variant="outline" >Student</Badge>
                </div>
                <div className="py-4 px-6">
                    <p className="text-gray-700">

                        {
                            discussion[0]?.description
                        }
                    </p>

                </div>
            </div>
            {
                discussionReply?.map((reply, index) => (
                    <div key={index} className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto my-4">
                        <div className={cn("flex items-center justify-between p-2 border-b border-black bg-gray-200", reply.is_solution && "bg-green-200")}>
                            <div className="flex items-center gap-4">
                                <Avatar fallback={reply.name[0]} size="sm" />
                                <span className="text-black font-semibold text-lg">
                                    {reply.name}
                                </span>
                                <span className="text-md text-gray-700 flex gap-2 items-center">
                                    commented on this on {new Date(reply.created_at).toDateString()} {reply.is_solution && <CheckCircle size={20} color="green" />}
                                </span>
                            </div>
                            <div className="flex gap-4 items-center">

                                <Badge variant={reply.teacher_id ? "default" : "outline"}>
                                    {reply.teacher_id ? "Teacher" : "Student"}
                                </Badge>
                                { 
                                    // params.discussionId === session?.user.id &&
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis size={20} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => { markasSolved(reply.id) }} >Mark as solved</DropdownMenuItem>
                                            {
                                                !reply.teacher_id &&
                                                <DropdownMenuItem>Report</DropdownMenuItem>
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </div>

                        </div>
                        <div className="py-4 px-6">
                            <p className="text-gray-700">
                                {reply.reply}
                            </p>

                        </div>
                    </div>
                ))
            }
            <Separator className="my-4 w-11/12 mx-auto bg-gray-400" />
            <div className="w-11/12 mx-auto flex flex-col">
                <h3 className="text-center font-semibold text-gray-800 dark:text-gray-200 text-lg md:text-3xl">
                    Add a comment
                </h3>
                <div className="flex items-center gap-4 mt-4">
                    <Avatar src="https://avatars.dicebear.com/api/human/1.svg" size
                        ="sm" />
                    <Textarea onChange={handleChange} value={reply} placeholder="Add a comment" className="w-full h-24 border border-gray-800 rounded-md p-2" />
                </div>
                <Button onClick={handleReply} className="bg-gray-800 text-white ml-auto rounded-lg px-4 mt-2 w-fit" >Comment</Button>
            </div>
        </div >
    );
}