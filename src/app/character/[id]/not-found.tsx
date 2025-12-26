import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="p-10 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Character Not Found</h1>

      <p className="text-gray-600 mb-8">
        The character you're looking for doesn't exist.
      </p>

      <Link href="/">
        <Button>Go Back Home</Button>
      </Link>
    </main>
  );
}
