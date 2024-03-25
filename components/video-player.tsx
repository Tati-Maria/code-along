"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Room } from "@/db/schema";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "@/actions/generate-token";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

export function PairVideoPlayer({room}: {room: Room}) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>();
  const [call, setCall] = useState<Call | null>();
  const router = useRouter();

  useEffect(() => {
    if(!room) {
        return;
    }
    if (!session.data) {
      return;
    }
    const userId = session?.data?.user?.id as string;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name || "Unknown",
        image: session.data.user.image as string,
      },
      tokenProvider: () => generateTokenAction(),
    });
    setClient(client);
    const call = client.call("default", room.id);
    call.join({ create: true });
    setCall(call);

    // Cleanup
    return () => {
      call.leave().then(() => {
        client.disconnectUser();
      }).catch(console.error);
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls 
            onLeave={() => router.push("/")}
            />
            <CallParticipantsList 
            onClose={() => undefined}
            />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
