"use client"
import React, { useEffect } from 'react'
import ClassItem from './ClassItem'
import { useAppContext } from '@/components/providers/context-provider'

const ClassList = () => {
    const { getClassList, classList } = useAppContext();
    console.log(classList)
    useEffect(() => {
        getClassList();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Class ID</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {
                                    classList.map((item) => {
                                        return <ClassItem key={item.id} name={item.name} id={item.id} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>)
}

export default ClassList