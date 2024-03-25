import { EditRoomForm } from "@/components/edit-room-form";
import { getRoom } from "@/data-access/room";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({params}: {params: {roomId: string}}) {
    unstable_noStore();
    const room = await getRoom(params.roomId);

    if(!room) {
        return <div>Room not found</div>
    }

  return (
    <div className="mt-16">
        <h1 className="font-medium text-2xl md:text-3xl">Edit room</h1>
        <EditRoomForm room={room} />
    </div>
  );
}