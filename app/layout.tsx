import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "@/providers";
import { Header } from "@/components/header";
import { Container } from "@/components/common/container";
import { Footer } from "@/components/footer";
import NextTopLoader from "nextjs-toploader";


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
          <Container>
            <NextTopLoader />
            <Header />
            <main className="h-full">{children}</main>
            <Footer />
          </Container>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
