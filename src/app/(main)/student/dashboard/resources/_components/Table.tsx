import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Table = async (resources: any) => {
    return (
        <div>
            <div className="relative overflow-x-auto my-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Resource Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Resource Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Teacher
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            resources.resources?.map((resource: any) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {resource.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {resource.description.substring(0, 100)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {resource.teacherName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button asChild variant={"outline"}>
                                        <Link href={resource.link} target='_blank' className='text-blue-500'>
                                            Resource Link
                                        </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table