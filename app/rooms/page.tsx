import { RoomCard } from "@/components/common/room-card";
import { db } from "@/db"


export default async function RoomsPage() {
    const rooms = await db.query.room.findMany();
    return (
        <section className="mt-16 flex flex-col space-y-6">
            <h1 className="font-semibold text-2xl">Rooms</h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {rooms.map((room) => (
                    <li key={room.id}>
                        <RoomCard room={room} />
                    </li>
                ))}
            </ul>
        </section>
    )
}