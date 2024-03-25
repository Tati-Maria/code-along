"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("Session not found");
  }
  const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
  const api_secret = process.env.STREM_API_SECRET_KEY!;

  // iNIITIALIZE THE sERVER CLIENT
  const serverClient = StreamChat.getInstance(apikey, api_secret);
  // Create user token
  const token = serverClient.createToken(session.user.id);
  return token;
}
