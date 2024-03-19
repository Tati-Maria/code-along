import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Header } from "@/components/header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pair Devs - Find your pair programming partner",
  description: "Pair Devs is a platform to find your pair programming partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
