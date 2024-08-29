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
import { questionTypes } from "@/lib/types"

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
    subject: z.string({
        required_error: "Please select a subject.",
    }),
    title: z.string().min(10, 'Valid question title is required'),
    description: z.string().min(20, 'Please provide a detailed description of your question'),
    type: z.string().optional()
})

const NewDiscussionForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { getSubjectList, subjectList, createDiscussion } = useAppContext();
    const { data: session } = useSession();

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: '',
            title: '',
            description: '',
            type: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const { title, description, type, subject } = data;
        createDiscussion(parseInt(session?.user.id!), title, parseInt(subject), description, type);
        setIsLoading(false);
    }

    useEffect(() => {
        getSubjectList();
    }, [])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 w-full">
                    <div className='flex gap-4 flex-col justify-center items-center w-full'>
                        <FormField
                            control={form.control}
                            name='subject'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Subject
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Subject of Topic" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {subjectList.map((subject) => (
                                                <SelectItem key={subject.id} value={subject.id.toString()}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Question Type (Optional)
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Question Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {questionTypes.map((type) => (
                                                <SelectItem key={type} value={type.toString()}>
                                                    {type}
                                                </SelectItem>
                                            ))}
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
                                        Question Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6 w-60 sm:w-80' placeholder='Enter Question Title' disabled={isLoading} {...field} />
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
                                        Question description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter detailed description of your question"
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

                        <DialogFooter className='py-4'>
                            <Button type='submit' className='mr-auto' disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Discussion'}
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </form>
        </Form >

    )
}

export default NewDiscussionForm