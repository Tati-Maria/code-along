import { TagsList } from "@/components/common/tags-list";
import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/room"
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";


interface RoomPageProps {
    params: {
        roomId: string
    }
}

export default async function RoomsSinglePage({ params: {roomId}}: RoomPageProps) {
    const room = await getRoom(roomId);

    if(!room) {
        return <div>Room not found</div>
    }
    
    return (
      <section className="mt-16 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-4">
          <div className="col-span-1 lg:col-span-3 bg-slate-400 p-8">
            <div className="drop-shadow-lg bg-slate-900 rounded p-12">Video Player</div>
          </div>
          <div className="col-span-1 space-y-3 font-light px-3 py-2">
            <h1 className="text-xl font-medium">{room?.name}</h1>
            <p>{room?.description}</p>
            <TagsList tags={room.tags} />
            <p>
                Host name: Nahary
            </p>
            <Link 
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500 flex items-center space-x-1 hover:underline"
            href={room?.gitUrl as string}>
                Repo Link <GitHubLogoIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    );
}