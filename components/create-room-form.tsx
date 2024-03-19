"use client";

import {
  Form,
  FormControl,
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

export function CreateRoomForm() {
  const router = useRouter();
  const form = useForm<Room>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "",
      gitUrl: "",
    },
  });

  async function handleSubmit(data: Room) {
    console.log(data);
    await createRoomAction(data);
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
          name="language"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>
                Primary Programming Language{" "}
                <span className="text-red-500 text-xs ">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Eg. JavaScript"
                  disabled={formState.isSubmitting}
                />
              </FormControl>
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
                  placeholder="what is this room about?"
                  maxLength={1000}
                  minLength={10}
                />
              </FormControl>
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
