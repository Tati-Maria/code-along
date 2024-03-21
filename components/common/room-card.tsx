import { Room } from "@/db/schema"
import { Badge } from "@/components/ui/badge";
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


interface RoomCardProps {
    room: Room;
}


export function RoomCard ({room}: RoomCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            {room.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge>{room.language}</Badge>
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