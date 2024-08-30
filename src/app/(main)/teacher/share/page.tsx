"use client"
import { useModal } from "@/app/hooks/use-modal-store";
import NewResourceForm from "@/components/forms/NewResourceForm";
import { Button } from "@/components/ui/button";

export default function SharePage() {
    const { onOpen } = useModal();
    return (
        <>
            <NewResourceForm />
        </>
    )
}
