import { db } from "@/db";

export default async function Home() {
  const items = await db.query.testing.findMany();
  console.log(items);
  return <></>;
}
