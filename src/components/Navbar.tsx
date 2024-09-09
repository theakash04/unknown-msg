"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="py-4 px-0 md:px-6 md:py-6">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-xl font-bold" href="/">
          unknown messages
        </a>
        {session ? (
          <>
            <Button className="md:w-auto font-bold" onClick={() => signOut()} variant={"destructive"} size={"sm"}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button className="md:w-auto font-bold" size={"sm"}>Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
