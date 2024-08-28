import SearchQuestionForm from "@/components/forms/SearchQuestionForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@nextui-org/button";
import { Circle, CircleDot, Dot, Plus, Tag } from "lucide-react";

export default function DiscussionPage() {
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
                <Button className="bg-gray-800 text-white ml-2 rounded-lg px-4" >New Discussion</Button>
            </div>

            <div className="flex flex-col rounded-t-lg border border-gray-800 overflow-hidden md:w-4/5 w-full mx-auto">
                <div className="p-4 border-b border-gray-800 rounded-t-md bg-gray-200">
                    <div className="flex items-center gap-2">
                        <CircleDot size={20} />
                        <span className="text-black font-semibold text-lg">
                            15 Questions
                        </span>
                        <span className="text-md text-gray-700">
                            5 Answered
                        </span>
                    </div>
                </div>
                <div className="border-b group border-gray-800 p-4 hover:bg-gray-700 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <CircleDot color="green" size={20} />
                        <span className="text-black font-semibold text-lg content-center flex items-center gap-4  group-hover:text-white">
                            Question 1 <Badge variant="destructive" >Doubt</Badge>
                        </span>
                    </div>
                    <p className="text-gray-700 group-hover:text-white">
                        This is a sample question. You can ask your questions here.
                    </p>
                </div>
                <div className="border-b group border-gray-800 p-4 hover:bg-gray-700 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                        <CircleDot color="green" size={20} />
                        <span className="text-black group-hover:text-white font-semibold text-lg">
                            Question 1
                        </span>
                    </div>
                    <p className="text-gray-700 group-hover:text-white transition-all">
                        This is a sample question. You can ask your questions here.
                    </p>
                </div>
                <div className="border-b group border-gray-800 p-4 hover:bg-gray-700 transition-all cursor-pointer">
                    <div className="flex items-center gap-2">
                        <CircleDot color="green" size={20} />
                        <span className="text-black group-hover:text-white font-semibold text-lg">
                            Question 1
                        </span>
                    </div>
                    <p className="text-gray-700 group-hover:text-white transition-all">
                        This is a sample question. You can ask your questions here.
                    </p>
                </div>
                <div className="border-b group border-gray-800 p-4 hover:bg-gray-700 cursor-pointer">
                    <div className="flex items-center gap-2">
                        <CircleDot color="green" size={20} />
                        <span className="text-black font-semibold text-lg content-center flex items-center gap-4  group-hover:text-white">
                            Question 1 <Badge variant="default" >Numerical</Badge>
                        </span>
                    </div>
                    <p className="text-gray-700 group-hover:text-white">
                        This is a sample question. You can ask your questions here.
                    </p>
                </div>
            </div>
        </div>
    );
}