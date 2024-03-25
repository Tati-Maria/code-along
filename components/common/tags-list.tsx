import { Badge } from "@/components/ui/badge";
import { splitTags } from "@/lib/utils";

export function TagsList({ tags }: { tags: string }) {
    const tagsArray = splitTags(tags);

  return (
    <div className="flex flex-wrap space-x-2">
      {tagsArray.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}
