"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form, FormControl, FormLabel, FormField, FormItem, FormMessage
} from "@/components/ui/form"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Upload, XCircle } from 'lucide-react';
import { DialogFooter } from '../ui/dialog';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useModal } from '@/app/hooks/use-modal-store';
import { useAppContext } from '../providers/context-provider';


const formSchema = z.object({
    name: z.string().min(2, 'Teacher Name is required'),
    email: z.string().email('Invalid Email Address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const NewDiscussionForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { createTeacher } = useAppContext();

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        createTeacher({ name: data.name, email: data.email, password: data.password });
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
                                        Teacher Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Teacher Name' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Teacher Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Email' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Password' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className='py-4'>
                            <Button type='submit' className='mr-auto' disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Teacher Data'}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </Form >

    )
}

export default NewDiscussionForm