"use client"

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils'
import { Montserrat } from "next/font/google"
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const monsterrat = Montserrat({
    weight: ["400", "700"],
    subsets: ['latin'],
});

interface RouteData {
    name: string;
    route: string;
    icon: React.ReactNode;
}


const NavigationItem = ({ name, route, icon }:RouteData) => {
    const router = useRouter();
    const pathname = usePathname();
    const handleRoute = () => {
        router.push(route);
    }

    return (
        <li>
            <Link aria-current="page" className="active" href={route}>
                <button className={cn("middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg w-full flex items-center gap-4 px-4 capitalize", pathname===route?"bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]":"text-white hover:bg-white/10 active:bg-white/30")} type="button">
                    {icon}
                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{name}</p>
                </button>
            </Link>
        </li>
    )
}

export default NavigationItem