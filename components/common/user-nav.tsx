"use client";

import { UserAvatar } from "./user-avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut, signIn } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DeleteIcon, LogOut, User2 } from "lucide-react";
import Link from "next/link";
import { deleteAccountAction } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardIcon } from "@radix-ui/react-icons";

export function UserNav() {
  const session = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const noSession =
    session.status === "unauthenticated" || session.status === "loading";

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                  <DashboardIcon className="h-4 w-4 mr-2" /><Link href={"/your-rooms"}>Your rooms</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />Sign out
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <DeleteIcon className="mr-2" /> Delete Account
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
    </>
  );
}
