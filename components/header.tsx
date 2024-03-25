'use client';

import { ModeToggle } from "./mode-toggle";
import { Logo } from "./common/logo";
import { UserNav } from "./common/user-nav";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useSession } from "next-auth/react";

export function Header() {
  const session = useSession();
  const isLoggedIn = session.data?.user;

  return (
    <header className="flex items-center justify-between border-b pb-4 border-muted">
      <Logo />
      <nav className="flex space-x-6 items-center">
        {isLoggedIn && (
          <Link
            className={cn(buttonVariants({ variant: "link" }))}
            href={"/create-room"}
          >
            Create Room
          </Link>
        )}
        <Link
          className={cn(buttonVariants({ variant: "link" }))}
          href={"/rooms"}
        >
          Rooms
        </Link>
      </nav>
      <div className="flex items-center space-x-6">
        <UserNav />
        <ModeToggle />
      </div>
    </header>
  );
}
