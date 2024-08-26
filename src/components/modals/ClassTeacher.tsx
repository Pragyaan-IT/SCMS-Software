"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from '@/app/hooks/use-modal-store';

import { AddTeacherForm } from "../forms/AddTeacherForm";


const ClassTeacher = () => {
  const { isOpen, onClose, type, data } = useModal();
 
  const isModalOpen = isOpen && type === 'addTeacher';

  return (
    <Dialog open={isModalOpen} onOpenChange={() => { onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Teachers</DialogTitle>
        </DialogHeader>
        <AddTeacherForm classId={data.classId} />
      </DialogContent>

    </Dialog >
  )
}

export default ClassTeacher