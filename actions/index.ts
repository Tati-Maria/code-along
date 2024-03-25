'use server';

import { createRoom, deleteRoom, editRoom, getRoom } from "@/data-access/room";
import { deleteUser } from "@/data-access/users";
import { Room} from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();
    if(!session) {
        throw new Error("You must be logged in to create a room");
    }
    const room = await createRoom(roomData, session.user.id);

    revalidatePath("/rooms");
    return room;
}

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();

  if (!session) {
    throw new Error("you must be logged in to create this room");
  }

  const room = await getRoom(roomData.id);

  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();

  if(!session) {
    throw new Error("You must be logged in to delete a room");
  }

  const room = await getRoom(roomId);

  if(room?.userId !== session.user.id) {
    throw new Error("User not authorized");
  }

  await deleteRoom(roomId);
  revalidatePath("/your-rooms");
  redirect("/your-rooms");
}

export async function deleteAccountAction() {
  const session = await getSession();

  if(!session) {
    throw new Error("You must be logged in to delete your account");
  }

  await deleteUser(session.user.id);
}