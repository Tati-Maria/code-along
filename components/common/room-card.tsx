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
    const shortenDescription = (description: string) => {
        return description.length > 100
            ? `${description.slice(0, 100)}...`
            : description;
    };

    const languages = room.language.split(',').map((lang) => lang.trim());

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            {shortenDescription(room.description) || "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap space-x-2">
            {languages.map((lang) => (
              <Badge key={lang}>{lang}</Badge>
            ))}
          </div>
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