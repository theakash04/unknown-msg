"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

function Navbar() {
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-xl font-bold" href="/">
          unkown messages
        </a>
        {session ? (
          <>
            <Button className="md:w-auto font-bold" onClick={() => signOut()} variant={"destructive"} size={"lg"}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>
              <Button className="md:w-auto font-bold" size={"lg"}>Login</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
