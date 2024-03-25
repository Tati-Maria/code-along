"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Room, roomSchema } from "@/lib/validation/room";
import { createRoomAction } from "@/actions";
import {  useRouter } from "next/navigation";
import { toast } from "sonner";

export function CreateRoomForm() {
  const router = useRouter();
  const form = useForm<Room>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: "",
      gitUrl: "",
    },
  });
  const minLength = 10;
  const maxLength = 500;

  async function handleSubmit(data: Room) {
    await createRoomAction(data);
    toast.success("Room created successfully");
    router.push("/rooms");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Name <span className="text-red-500 text-xs ">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  disabled={formState.isSubmitting}
                  {...field}
                  placeholder="Enter room name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Tags{" "}
                <span className="text-red-500 text-xs ">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Eg. JavaScript, Python, Java, etc."
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Separate multiple tags with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gitUrl"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Github Repo <span className="text-red-500 text-xs ">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter github repo url"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormDescription>
                Please provide a valid github repository URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Description <span className="text-red-500 text-xs ">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={formState.isSubmitting}
                  {...field}
                  placeholder="Your project description goes here."
                  maxLength={600}
                  minLength={10}
                />
              </FormControl>
              <FormDescription>
                {form.getValues("description").length}/{maxLength}{" "}
                characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Create Room
        </Button>
      </form>
    </Form>
  );
}
