"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BookOpen, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { signIn } from "next-auth/react"

const TeacherSchema = z.object({
    teacher_id: z.string().min(6, 'Missing teacher id').max(6, 'Invalid teacher id'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function SignIn() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof TeacherSchema>>({
        mode: 'onChange',
        resolver: zodResolver(TeacherSchema),
        defaultValues: {
            teacher_id: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof TeacherSchema>) => {
        setIsLoading(true);
        await signIn("teacher", {
            teacher_id: values.teacher_id,
            password: values.password,
            callbackUrl: "/teacher/dashboard",
        });
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form
                className="flex md:w-[30%] flex-col gap-y-6 border-1 py-8 px-12 rounded-lg shadow-lg"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center gap-2">
                    <BookOpen size={48} />
                    <h1 className="text-2xl font-semibold">SCMS</h1>
                    <p className="text-gray-500">Teacher Login</p>
                </div>
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="teacher_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Faculty Id*</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your faculty id" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input type={isVisible ? "text" : "password"} placeholder="Enter your password" {...field} />
                                    <span onClick={() => { setIsVisible(!isVisible) }} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                                    </span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isLoading} type="submit">Login</Button>
            </form>
        </Form>
    )
}
