"use client"
import { useModal } from "@/app/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import StudentList from "./_components/StudentList";

export default function ClassPage() {
    const { onOpen } = useModal();
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Students</h1>
            <Separator className="my-4" />
            <Button onClick={() => { onOpen("newStudent") }} className="ml-auto w-fit">Add New Student <Plus className="ml-2" size={20} /></Button>
            <div className="mt-4">
                <StudentList />
            </div>
        </div>
    )
}