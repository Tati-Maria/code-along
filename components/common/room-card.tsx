import { Room } from "@/db/schema"
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagsList } from "./tags-list";
import { shortenDescription } from "@/lib/utils";


interface RoomCardProps {
    room: Room;
}


export function RoomCard ({room}: RoomCardProps) {

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            {shortenDescription(room.description || "")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TagsList tags={room.tags} />
        </CardContent>
        <CardFooter>
          <Button
            variant={"link"}
            asChild
            className="font-light p-0 text-sky-600"
          >
            <Link href={`/rooms/${room.id}`}>
              Join room <ArrowRightIcon className="ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
}