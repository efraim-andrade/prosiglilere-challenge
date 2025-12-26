"use client";

import { cva } from "class-variance-authority";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { HousesEnum } from "@/types/houses";

export function Header() {
  const { currentHouse } = useTheme();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const headerVariants = cva(
    "relative flex items-center justify-center w-full border-b border-gray-200 px-4 py-3 shadow-sm h-15",
    {
      variants: {
        house: {
          [HousesEnum.GRYFFINDOR]: "bg-gryffindor/70 text-red-950",
          [HousesEnum.HUFFLEPUFF]: "bg-hufflepuff/70 text-yellow-950",
          [HousesEnum.RAVENCLAW]: "bg-ravenclaw/70 text-blue-950",
          [HousesEnum.SLYTHERIN]: "bg-slytherin/70 text-green-950",
          [HousesEnum.UNKNOWN]: "bg-white border-gray-200 text-black",
        },
      },
    },
  );

  return (
    <header
      className={headerVariants({ house: currentHouse || HousesEnum.UNKNOWN })}
    >
      {isHomePage ? null : (
        <Button variant="link" className="absolute left-4">
          <Link href="/" className=" flex gap-2 items-center">
            <ArrowLeft /> Back
          </Link>
        </Button>
      )}

      <h1 className="text-lg font-semibold text-center">
        Harry Potter Characters
      </h1>
    </header>
  );
}
