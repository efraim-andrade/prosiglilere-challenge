"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <header className="relative flex items-center justify-center w-full border-b border-gray-200 bg-white px-4 py-3 shadow-sm h-15">
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
