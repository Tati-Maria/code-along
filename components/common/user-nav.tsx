"use client";

import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import Link from "next/link";
import { deleteAccountAction } from "@/actions";
import { useRouter } from "next/navigation";

export function UserNav() {
  const session = useSession();
  const router = useRouter();
  const noSession =
    session.status === "unauthenticated" || session.status === "loading";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={noSession ? "secondary" : "ghost"}
          className={cn(
            "relative h-8 w-8 rounded-full",
            noSession && "rounded-md h-auto w-auto"
          )}
        >
          {noSession ? (
            <User2 className="h-5 w-5" />
          ) : (
            <UserAvatar
              src={session.data?.user?.image as string}
              name={session.data?.user?.name as string}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-56">
        <DropdownMenuGroup>
          {session.data?.user ? (
            <>
              <DropdownMenuItem>
                <Link href={"/your-rooms"}>Your rooms</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  deleteAccountAction();
                  router.push("/");
                }}
              >
                Delete account
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
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
