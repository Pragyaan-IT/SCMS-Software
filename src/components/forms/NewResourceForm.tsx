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
import { useAppContext } from '../providers/context-provider';
import { questionTypes } from "@/lib/types"
import { CldUploadWidget } from "next-cloudinary"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '../ui/textarea';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
    title: z.string().min(10, 'Valid resource title is required'),
    description: z.string().min(20, 'Please provide a detailed description of your resource'),
    resourceUrl: z.string().url('Please provide a valid URL'),
    classId: z.string().min(1, 'Please select a class to share this resource with')
})

const NewResourceForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { getTeacherClasses, teacherClasses, createResource } = useAppContext();
    const [resourceUrl, setResourceUrl] = useState("")
    const { data: session } = useSession();

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            resourceUrl: '',
            classId: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const { title, description, resourceUrl, classId } = data;
        createResource(title, description, resourceUrl, parseInt(classId))
        setIsLoading(false);
        form.reset();
    }

    useEffect(() => {
        getTeacherClasses(parseInt(session?.user.id!));
    }, [])

    const handleUpload = (result: any) => {
        if (!result) return;
        if (result?.event !== 'success') return;
        form.setValue("resourceUrl", result.info.secure_url);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 w-full">
                    <div className='flex gap-4 flex-col justify-center items-center w-full'>
                        <FormField
                            control={form.control}
                            name='classId'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Classes
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Class" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                teacherClasses?.map((cls) => (
                                                    <SelectItem key={cls.id} value={cls.id.toString()}>
                                                        {cls.className}
                                                    </SelectItem>
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
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Resource Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Resource Title' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Resource Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter detailed description of your resource you are sharing"
                                            className="resize-none"
                                            cols={40}
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <CldUploadWidget options={{ maxFiles: 6 }} uploadPreset='pragyaan' onSuccess={handleUpload} >
                            {({ open }) => {
                                return (
                                    <Button type='button' onClick={() => { open() }} className='mx-auto'>
                                        Add Resources <Upload className='ml-4' size={20} />
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        <Button type='submit' className='mx-auto' disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Share Resources'}
                        </Button>
                    </div>
                </div>
            </form>
        </Form >

    )
}

export default NewResourceForm