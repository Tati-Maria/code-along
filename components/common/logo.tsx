import Image from "next/image";
import Link from "next/link";
import { Young_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const youngSerif = Young_Serif({ weight: ["400"], subsets: ["latin"]});

export function Logo (){
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <Image
          src={"/pair-dev.svg"}
          alt="Pair Dev Logo"
          width={45}
          height={45}
        />
        <strong className={cn("text-xl md:text-2xl hidden sm:block w-auto h-auto", youngSerif.className)}>
          Pair Devs
        </strong>
      </Link>
    );
}