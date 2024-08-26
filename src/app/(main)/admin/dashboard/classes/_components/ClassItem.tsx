"use client"
import { useModal } from '@/app/hooks/use-modal-store';
import { Button } from '@nextui-org/button';
import React from 'react'

interface ClassItemProps {
    id: number;
    name: string;
}

const ClassItem = ({ id, name }: ClassItemProps) => {
    const {onOpen} = useModal();
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">{id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                <Button onClick={()=>{onOpen("addTeacher", {classId: id})}} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-black hover:text-gray-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Add Teacher</Button>
                <Button onClick={()=>{onOpen("addSubject", {classId: id})}} type="button" className="inline-flex ml-2 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-black hover:text-gray-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">Add Subject</Button>
            </td>
        </tr>
    )
}

export default ClassItem