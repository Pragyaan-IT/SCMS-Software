"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';
import NewResourceForm from "../forms/NewResourceForm";


const NewResourcesModal = () => {
    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'newResource';

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { onClose() }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Share a new resources</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to share.
                    </DialogDescription>
                </DialogHeader>
                <NewResourceForm />
            </DialogContent>

        </Dialog >
    )
}

export default NewResourcesModal