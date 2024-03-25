export {default} from "next-auth/middleware";

export const config = {
    matcher: ["/your-rooms", "/rooms/create-room", "/rooms/[roomId]"]
}