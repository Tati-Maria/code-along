import NextAuth from "next-auth";
import { handler } from "@/lib/auth";

const options = NextAuth(handler);

export {options as GET, options as POST}