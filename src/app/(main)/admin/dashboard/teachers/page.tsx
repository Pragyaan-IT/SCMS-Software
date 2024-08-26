"use client"
import { useModal } from "@/app/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import TeacherList from "./_components/TeacherList";

export default function ClassPage() {
    const { onOpen } = useModal();
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Teachers</h1>
            <Separator className="my-4" />
            <Button onClick={() => { onOpen("newTeacher") }} className="ml-auto w-fit">Add New Teacher <Plus className="ml-2" size={20} /></Button>
            <div className="mt-4">
                <TeacherList />
            </div>
        </div>
    )
}