import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '@nextui-org/button'
import { ChevronDown, Search } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const SearchQuestionForm = () => {
    return (

        <form> 
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className='bg-gray-800 px-4 text-white h-10 content-center text-medium rounded-s-lg flex items-center'>Filter <ChevronDown className='ml-2' size={20} /></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full">
                    <Input className='rounded-none focus:outline-none focus:ring-0 h-10 rounded-e-lg' id="search-dropdown" placeholder="Search" />
                    <Button className="absolute top-0 right-0 rounded-none bg-gray-800 rounded-e-lg h-10">
                        <Search size={20} color='#fff' />
                    </Button>
                </div>
            </div>
        </form>

    )
}

export default SearchQuestionForm