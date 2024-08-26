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
import NewSubjectForm from "../forms/NewSubject";


const NewSubjetModal = () => {
    const { isOpen, onClose, type } = useModal();


    const isModalOpen = isOpen && type === 'newSubject';


    return (
        <Dialog open={isModalOpen} onOpenChange={() => { onClose() }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a New Subject</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a subject
                    </DialogDescription>
                </DialogHeader>
                <NewSubjectForm />
            </DialogContent>

        </Dialog >
    )
}

export default NewSubjetModal