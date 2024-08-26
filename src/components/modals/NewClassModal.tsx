"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';
import NewClassForm from "../forms/NewClass";


const NewClassModal = () => {
    const { isOpen, onClose, type } = useModal();


    const isModalOpen = isOpen && type === 'newClass';


    return (
        <Dialog open={isModalOpen} onOpenChange={()=>{onClose()}}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a New Class</DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a class
                </DialogDescription>
            </DialogHeader>
            <NewClassForm />
        </DialogContent>

    </Dialog >
    )
}

export default NewClassModal