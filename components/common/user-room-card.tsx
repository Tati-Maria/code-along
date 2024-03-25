import Link from "next/link";
import { Pen, Trash2 } from "lucide-react";
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
import { Button } from "../ui/button";


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
            <Button
            className="ml-auto text-sky-500"
             variant={"link"} asChild>
                <Link href={`/rooms/${room.id}/edit`}>Edit room</Link>
            </Button>
            <Button
            size={"icon"}
            className="absolute right-0 top-0 mt-2 mr-2"
             variant={"destructive"}
             onClick={() => {}}
             >
                <Trash2 className="h-5 w-5"/>
            </Button>
        </CardFooter>
      </Card>
    )
}