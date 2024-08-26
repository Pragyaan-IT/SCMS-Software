"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';
import NewStudentForm from "../forms/NewStudent";


const NewStudentModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'newStudent';

    return (
        <Dialog open={isModalOpen} onOpenChange={()=>{onClose()}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a New Student</DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new student
                </DialogDescription>
            </DialogHeader>
            <NewStudentForm />
        </DialogContent>

    </Dialog >
    )
}

export default NewStudentModal