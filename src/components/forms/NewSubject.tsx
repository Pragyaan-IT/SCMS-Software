"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form, FormControl, FormLabel, FormField, FormItem, FormMessage
} from "@/components/ui/form"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import {  useState } from 'react';
import { useAppContext } from '../providers/context-provider';


const formSchema = z.object({
    name: z.string().min(2, 'Class name must be at least 3 characters')
})

const NewSubjectForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { createSubject } = useAppContext();

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        createSubject(data.name);
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 w-full">
                    <div className='flex gap-4 flex-col justify-center items-center w-full'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Subject Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Subject Name' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className='py-4'>
                            <Button type='submit' className='mr-auto' disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Subject'}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </Form >

    )
}

export default NewSubjectForm