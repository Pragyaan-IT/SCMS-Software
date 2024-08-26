"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';
import NewTeacherForm from "../forms/NewTeacher";


const NewTeacherModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'newTeacher';

    return (
        <Dialog open={isModalOpen} onOpenChange={()=>{onClose()}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a New Teacher</DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new teacher
                </DialogDescription>
            </DialogHeader>
            <NewTeacherForm />
        </DialogContent>

    </Dialog >
    )
}

export default NewTeacherModal