import type { Metadata } from "next";
import "../globals.css";

import { Manrope } from 'next/font/google';

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "OnlyBucks -- Admin",
  description: "Made with ❤️ by Rama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
