"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';

import { AddSubjectForm } from "../forms/AddSubjectForm";


const ClassSubject = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'addSubject';

  return (
    <Dialog open={isModalOpen} onOpenChange={() => { onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subjects</DialogTitle>
        </DialogHeader>
        <AddSubjectForm teacherId={data.teacherId} classId={data.classId} />
      </DialogContent>

    </Dialog >
  )
}

export default ClassSubject