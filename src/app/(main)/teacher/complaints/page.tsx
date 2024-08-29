"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createGrievance } from "@/db/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  teacherName: z.string().min(1, {
    message: "Teacher Name is required",
  }),
  teacherId: z.string().min(1, {
    message: "Teacher ID is required",
  }),
  classroomNumber: z.string().min(1, {
    message: "Classroom Number is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
  type: z.enum([
    "projector",
    "computer",
    "internet",
    "other",
    "light",
    "fan",
    "AC",
  ]),
});

export default function SubmitGrievance() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherName: "Alia Bhatt",
      teacherId: "",
      classroomNumber: "",
      message: "",
      type: "computer",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await createGrievance(values);
      toast.success("Grievance submitted successfully");
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex h-svh w-full items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Submit Grievance</CardTitle>
          <CardDescription>
            Please fill out the form below to submit your grievance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="teacherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher Name</FormLabel>
                    <FormControl>
                      <Input disabled placeholder="Enter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                {/* <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teacher ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Grievance</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="computer">Computer</SelectItem>
                          <SelectItem value="projector">Projector</SelectItem>
                          <SelectItem value="internet">Internet</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="fan">Fan</SelectItem>
                          <SelectItem value="AC">AC</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="classroomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classroom Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button color="primary" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
