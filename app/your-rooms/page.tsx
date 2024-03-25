import { EmptyState } from "@/components/common/empty-state";
import { UserRoomCard } from "@/components/common/user-room-card";
import { getUserRooms } from "@/data-access/room";
import { unstable_noStore } from "next/cache";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms = await getUserRooms();

  return (
    <section className="mt-16 flex flex-col space-y-6 h-full">
      <h1 className="font-medium text-2xl md:text-3xl">Your rooms</h1>
      <ul className="grid h-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length === 0 ? (
          <EmptyState 
            className="col-span-3"
          text="No rooms found" />
        ) : (
          rooms.map((room) => (
            <li key={room.id}>
              <UserRoomCard room={room} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
