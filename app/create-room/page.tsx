import { CreateRoomForm } from "@/components/create-room-form";

export default function CreateRoomPage() {
    return (
        <div className="mt-16 flex flex-col space-y-10">
            <h1 className="font-semibold text-xl md:text-2xl">Create a room</h1>
            <CreateRoomForm />
        </div>
    )
}