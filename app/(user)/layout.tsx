import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Manrope } from 'next/font/google';
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import Provider from "@/components/Schematic/SchematicProvider";
import { Toaster } from "sonner";
import DMButton from "@/components/DMButton";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "OnlyBucks: Makes you RICH",
  description: "Made with ❤️ by Rama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-y-scroll scrollbar-hide">
        <Provider>
          <body
            className={`${manrope.variable} antialiased overflow-y-scroll scrollbar-hide`}
          >
            <Header />
            {children}

            <div className="fixed bottom-4 right-8">
              <DMButton />
            </div>
            <Toaster position="bottom-center" />

          </body>
          <SanityLive />
        </Provider>
      </html>
    </ClerkProvider>
  );
}
