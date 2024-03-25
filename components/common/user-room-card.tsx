'use client'

import Link from "next/link";
import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { TagsList } from "./tags-list";
import { shortenDescription } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { deleteRoomAction } from "@/actions";
import { toast } from "sonner";

export function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card className="w-[350px] relative">
      <CardHeader>
        <CardTitle className="font-medium text-xl">{room.name}</CardTitle>
        <CardDescription className="font-light">
          {shortenDescription(room.description || "")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TagsList tags={room.tags} />
      </CardContent>
      <CardFooter>
        <Button variant={"link"} asChild>
          <Link href={`/rooms/${room.id}`}>Join room</Link>
        </Button>
        <Button className="ml-auto text-sky-500" variant={"link"} asChild>
          <Link href={`/rooms/${room.id}/edit`}>Edit room</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size={"icon"}
              className="absolute right-0 top-0 mt-2 mr-2"
              variant={"destructive"}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                room.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                  toast.success("Room deleted successfully");
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
