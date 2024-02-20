import type {Metadata} from "next";

import {Analytics} from "@vercel/analytics/react";

import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "#PORRACOAC",
  description: "Desarrollado por @rafasanabria1",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className="dark grid min-h-screen w-screen max-w-full grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <Header />
        <main className="">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          PORRA COAC 2024 by @rafasanabria1
        </footer>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
