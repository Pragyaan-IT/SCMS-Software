"use client"
import { useModal } from "@/app/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import ClassList from "./_components/ClassList";

export default function ClassPage() {
    const { onOpen } = useModal();
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Classes</h1>
            <Separator className="my-4" />
            <div className="flex gap-2 ml-auto">
            <Button onClick={() => { onOpen("newClass") }} className="ml-auto w-fit">Add New Class <Plus className="ml-2" size={20} /></Button>
            <Button onClick={() => { onOpen("newSubject") }} className="ml-auto w-fit">Add New Subject <Plus className="ml-2" size={20} /></Button>
            </div>
            <div className="mt-4">
                <ClassList />
            </div>
        </div>
    )
}