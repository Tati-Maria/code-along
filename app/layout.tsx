import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Header } from "@/components/header";
import { Container } from "@/components/common/container";
import { Footer } from "@/components/footer";

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
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
