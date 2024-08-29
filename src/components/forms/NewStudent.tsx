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
import { useState } from 'react';
import { useAppContext } from '../providers/context-provider';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';


const formSchema = z.object({
    name: z.string().min(2, 'Teacher Name is required'),
    registration_id: z.string().min(8, 'Registration Number is required').max(8, 'Registration Number is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    class_id: z.string().min(1, 'Class Id is required')
})

const NewStudentForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { createStudent, classList } = useAppContext();

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            registration_id: '',
            email: '',
            class_id: '',
            password: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        createStudent({
            name: data.name,
            registration_id: data.registration_id,
            email: data.email,
            password: data.password,
            class_id: data.class_id
        });
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 w-full">
                    <div className='flex gap-4 flex-col justify-center items-center w-full'>
                        <FormField
                            control={form.control}
                            name='class_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Class
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                        <FormControl>
                                            <SelectTrigger className='md:w-80 w-60'>
                                                <SelectValue placeholder="Select a class" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className='md:w-80 w-60'>
                                            {
                                                classList.map((item, idx) => (
                                                    <SelectItem key={idx}  value={item.id.toString()}>{item.name}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Student Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Student Name' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='registration_id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Registration Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Regsitration Number' disabled={isLoading} {...field} />
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
                                        Email Id
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Email Id' disabled={isLoading} {...field} />
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
                                {isLoading ? 'Creating...' : 'Create Student Data'}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </Form >
    )
}

export default NewStudentForm