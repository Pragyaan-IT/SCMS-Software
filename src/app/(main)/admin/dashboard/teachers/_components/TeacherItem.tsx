import { useModal } from '@/app/hooks/use-modal-store';
import { Button } from '@nextui-org/button';
import { Plus } from 'lucide-react';
import React from 'react'

interface TeacherItemProps {
    name: string;
    email: string;
    teacherId: string;
    id: number
}

const TeacherItem = ({ id, teacherId, name, email }: TeacherItemProps) => {
    const { onOpen } = useModal();
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{teacherId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <Button onClick={() => { onOpen("addSubject", {teacherId: id}) }} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-black hover:text-gray-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Add Subject</Button>
            </td>
        </tr>
    )
}

export default TeacherItem