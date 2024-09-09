"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10">
      {/* Feature Section */}
      <section className="w-full flex flex-col gap-20 items-center">
        <div className="max-w-7xl border-dashed border-b-2 pb-1 mx-2">
          <div className="font-extrabold md:text-7xl text-[10vw] leading-none w-full text-center bg-gradient-to-b from-foreground dark:to-zinc-400 bg-clip-text text-transparent tracking-tighter pb-4">
            Messages Without Faces
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid gap-10 px-4">
          <p className="text-muted-foreground text-center md:text-xl max-w-2xl">
            Receive anonymous messages with ease! Create an account, get a
            unique link, and share it. People can send you messages{" "}
            <span className="text-primary font-bold">anonymously</span>, letting
            you read their thoughts without knowing who they are.
          </p>
          <div className="w-full flex items-center justify-center gap-5">
            <Link href={"/sign-up"}>
              <Button size={"lg"}>Continue</Button>
            </Link>
            <a href={"https://twitter.com/THEAkash04"}>
              <Button size={"lg"} variant={"outline"}>
                Creater Social
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Image
            width={1000}
            height={400}
            src={"/dashboard.png"}
            alt="Example image of dashboard"
            className="drop-shadow-[0_15px_25px_rgba(225,225,225,0.25)] sm:drop-shadow-[0_15px_35px_rgba(225,225,225,0.25)] hover:scale-105 transition-all ease-linear px-10 rounded-md"
          />
        </div>
      </section>
    </div>
  );
}
