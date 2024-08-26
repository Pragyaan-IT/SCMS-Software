"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useAppContext } from "../providers/context-provider"
import { useEffect } from "react"



const FormSchema = z.object({
    subject: z.number({
        required_error: "Please select a subject.",
    }),
})

interface FormProps {
    teacherId?: number;
    classId?: number;
}

export function AddSubjectForm({ teacherId, classId }: FormProps) {
    const { addSubjectToTeacher, addSubjectToClass } = useAppContext();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (teacherId) {
            addSubjectToTeacher(teacherId, data.subject);
        }
        if (classId) {
            addSubjectToClass(data.subject, classId);
        }
    }

    const { getSubjectList, subjectList } = useAppContext();

    useEffect(() => {
        getSubjectList();
    }, []);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? subjectList.find(
                                                    (subject) => subject.id === field.value
                                                )?.name
                                                : "Select subject"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search language..." />
                                        <CommandList>
                                            <CommandEmpty>No Subject found.</CommandEmpty>
                                            <CommandGroup>
                                                {subjectList.map((subject) => (
                                                    <CommandItem
                                                        value={subject.id.toString()}
                                                        key={subject.id}
                                                        onSelect={() => {
                                                            form.setValue("subject", subject.id)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                subject.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {subject.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Add</Button>
            </form>
        </Form>
    )
}
