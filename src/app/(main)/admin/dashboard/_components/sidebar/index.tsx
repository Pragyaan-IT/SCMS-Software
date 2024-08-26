"use client"
import React from 'react'
import { Separator } from '@/components/ui/separator';
import NavigationItem from './NavigationItem';
import NavigationHome from './NavigationHome';
import { LayoutDashboard, CalendarDays, StretchHorizontal, UserMinus, CircuitBoardIcon, UserCog2, List, ChartBar, MessagesSquare, User2, UserCheck, ChartAreaIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react'



const NavigationSidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            route: "/admin/dashboard",
            icon: <LayoutDashboard size={22} />
        },
        {
            name: "Classes",
            route: "/admin/dashboard/classes",
            icon: <ChartBar size={22} />

        },
        {
            name: "Teachers",
            route: "/admin/dashboard/teachers",
            icon: <UserCheck size={22} />

        },
        {
            name: "Students",
            route: "/admin/dashboard/students",
            icon: <User2 size={22} />
        },
        {
            name: "Reports",
            route: "/student/dashboards",
            icon: <ChartAreaIcon size={22} />
        },
    ]


    return (
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <NavigationHome />
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    {menuItems.map((item) => {
                        return (
                            <NavigationItem key={item.route} name={item.name} icon={item.icon} route={item.route} />
                        )
                    })}
                </ul>
                <ul className="mb-4 flex flex-col gap-1 fixed bottom-0 w-11/12 left-1/2 -translate-x-1/2">
                    <li>
                        <button onClick={() => { signOut({ callbackUrl: "/" }) }} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                            <UserMinus size={22} />
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Logout</p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default NavigationSidebar