import { Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({text, className}: {text: string, className?: string}) {
    return (
      <div className={cn("flex flex-col text-muted font-light items-center justify-center h-full", className)}>
        <Code className="block mx-auto h-10 w-10 md:h-20 md:w-20" />
        <p className="text-lg text-center">{text}</p>
      </div>
    );
}