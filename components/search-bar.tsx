"use client";

import { Form, FormField, FormControl, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Search, searchSchema } from "@/lib/validation/search";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const qurey = useSearchParams();
  const form = useForm<Search>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: qurey.get("search") ?? "",
    },
  });

  const onSubmit = (data: Search) => {
    if (data.search) {
      router.push(`/rooms?search=${data.search}`);
    } else {
        router.push("/rooms");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex space-x-4 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Filter rooms by keywords, typescript"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Search</Button>
        {qurey.get("search") && (
            <Button
            variant={"ghost"}
            onClick={() => {
                form.setValue("search", "");
                router.push("/rooms");
            }}
            >
                Clear
            </Button>
        )}
      </form>
    </Form>
  );
}
