"use client";

import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export function UserNav() {
  const session = useSession();
  const noSession = session.status === "unauthenticated" || session.status === "loading";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={noSession ? "secondary" : "ghost"}
          className={cn("relative h-8 w-8 rounded-full", noSession && "rounded-md h-auto w-auto")}
        >
          {session.status === "loading" ? (
            <Icons.loading className="animate-spin h-4 w-4" />
          ) : session.data?.user ? (
            <UserAvatar
              src={session.data.user.image as string}
              name={session.data.user.name as string}
            />
          ) : (
            !session.data && "Sign in"
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-56">
        <DropdownMenuGroup>
          {session.data?.user ? (
            <>
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </DropdownMenuItem>
              <DropdownMenuItem>Delete account</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => {
                  signIn("github");
                }}
              >
                Sign in with GitHub
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  signIn("google");
                }}
              >
                Sign in with Google
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
