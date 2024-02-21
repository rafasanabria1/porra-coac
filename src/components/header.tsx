import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between text-xl font-bold leading-[4rem]">
      <Link className="text-gray-500" href="/">
        #PORRACOAC2024
      </Link>
      <div className="flex items-center justify-center">
        <DropdownMenu modal>
          <DropdownMenuTrigger>
            <svg
              fill="none"
              height="36"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" stroke="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="pointer">
              <Link href="/agrupaciones">Agrupaciones participantes 2024</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="pointer">
              <Link href="/preliminar">#PorraCOAC2024Preliminares</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="pointer">
              <Link href="/cuartos">#PorraCOAC2024Cuartos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="pointer">
              <Link href="/semifinal">#PorraCOAC2024Semifinales</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="pointer">
              <Link href="/final">#PorraCOAC2024GranFinal</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
