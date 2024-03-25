'use client';

import { badgeVariants } from "@/components/ui/badge";
import { cn, splitTags } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function TagsList({ tags }: { tags: string }) {
    const tagsArray = splitTags(tags);
    const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {tagsArray.map((tag) => (
        <button
          className={cn(badgeVariants({ variant: "default" }), "hover:bg-primary/80")}
          onClick={() => router.push(`/rooms?search=${tag}`)}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
