import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="h-screen space-y-4 flex flex-col items-center text-center justify-center">
      <h1 className="font-semibold text-4xl md:text-6xl lg:text-8xl">
        Welcome to <span className="text-sky-500">Pair Devs</span>
      </h1>
      <p className="font-extralight text-base sm:text-lg md:text-xl lg:max-w-lg">
        Pair Devs is a platform that connects developers with other developers to
        work on projects together.
      </p>
      <div className="flex items-center space-x-6">
        <Link
          className={cn(buttonVariants({ variant: "outline" }), "text-base")}
          href={"/rooms"}
        >
          Find a room
        </Link>
        <Link
          className={cn(buttonVariants({ variant: "default" }), "text-base")}
          href={"/create-room"}
        >
          Create a room
        </Link>
      </div>
    </section>
  );
}
