import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background flex px-10 flex-col min-h-screen gap-10 justify-around">
      <div className="w-full h-full sm:flex hidden items-center justify-center">
        <Image
          src={"/error.svg"}
          width={700}
          height={700}
          alt="Picture for going in wrong page"
        />
      </div>
      <div className="w-full items-center flex justify-center h-full flex-col gap-10">
        <div className="text-muted-foreground text-4xl max-w-30 font-bold">
          Ooops No Page Found!!
        </div>
        <Link href={"/"}>
          <Button variant={"default"} size={"lg"}>
            Go to HomePage
          </Button>
        </Link>
      </div>
    </div>
  );
}
