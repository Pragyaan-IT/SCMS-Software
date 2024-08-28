"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';
import NewDiscussionForm from "../forms/NewDiscussionForm";


const NewDiscusionModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'newDiscussion';

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { onClose() }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ask a question</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to ask a question.
                    </DialogDescription>
                </DialogHeader>
                <NewDiscussionForm />
            </DialogContent>

        </Dialog >
    )
}

export default NewDiscusionModal