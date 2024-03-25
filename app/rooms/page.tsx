import { EmptyState } from "@/components/common/empty-state";
import { RoomCard } from "@/components/common/room-card";
import { SearchBar } from "@/components/search-bar";
import { getRooms } from "@/data-access/room";
import { unstable_noStore } from "next/cache";


export default async function RoomsPage({searchParams}: {searchParams: {search: string}}) {
  unstable_noStore(); // to mark the entire page as dynamic
  const rooms = await getRooms(searchParams.search);

  return (
    <section className="mt-16 flex flex-col space-y-6 h-full">
      <h1 className="font-semibold text-2xl">Rooms</h1>
      <SearchBar />
      <ul className="grid grid-cols-1 h-full sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
            <li key={room.id}>
              <RoomCard room={room} />
            </li>
          ))}
      </ul>
    </section>
  );
}