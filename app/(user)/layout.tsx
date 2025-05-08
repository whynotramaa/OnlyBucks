import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Manrope } from 'next/font/google';
import Header from "@/components/Header";

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
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
