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

interface FormProps {
  classId?: number;
}

const FormSchema = z.object({
  teacher: z.number({
    required_error: "Please select a teacher.",
  }),
})

export function AddTeacherForm({ classId }: FormProps) {
  const { addTeacherToClass } = useAppContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (classId) {
      addTeacherToClass(data.teacher, classId);
    }
  }

  const { getTeacherList, teacherList } = useAppContext();

  useEffect(() => {
    getTeacherList();
  }, []);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mx-auto">
        <FormField
          control={form.control}
          name="teacher"
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
                        ? teacherList.find(
                          (teacher) => teacher.id === field.value
                        )?.name
                        : "Select teacher"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No Teacher found.</CommandEmpty>
                      <CommandGroup>
                        {teacherList.map((teacher) => (
                          <CommandItem
                            value={teacher.id.toString()}
                            key={teacher.id}
                            onSelect={() => {
                              form.setValue("teacher", teacher.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                teacher.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {teacher.name}
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
