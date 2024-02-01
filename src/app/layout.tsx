import type {Metadata} from "next";

import Link from "next/link";

import "./globals.css";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "#PORRACOAC",
  description: "Desarrollado por @rafasanabria1",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <header className="mx-auto flex w-full max-w-xl justify-between text-xl font-bold leading-[4rem]">
          <Link className="text-gray-500" href="/">
            #PORRACOAC2024
          </Link>
          <Link href="/agrupaciones">Info agrupaciones</Link>
        </header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          PORRA COAC 2024 by @rafasanabria1
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
