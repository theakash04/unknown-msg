"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters.",
    })
    .max(267, {
      message: "Content must not be longer than 50 characters.",
    }),
});

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const url = pathname.split("/");
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username: url[2],
        content: data.content,
      });
      toast({
        title: "Message have been send successfully!",
      });
      form.reset({ content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen py-10 flex-col items-center gap-10">
      <div className="max-w-7xl w-full">
        <div className="font-bold text-3xl sm:text-5xl flex flex-col items-center">
          Send Your Message{" "}
          <span className="text-muted-foreground transition-all hover:underline font-extrabold pt-4">
            Anonymously
          </span>
        </div>
        <div className="pt-10 w-full flex justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Write your anonymous message here..."
                        className="resize-none shadow-sm text-md"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"default"} className="font-bold">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="bg-background p-8 text-center max-w-4xl pt-20">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Create Your Own Link
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Get anonymous messages and see what others really think! Share your
          link and receive honest feedback, no names attached.
        </p>
        <div className="flex gap-5 w-full items-center justify-center">
          <Link href={"/sign-up"}>
            <Button variant={"default"} size={"lg"}>
              Sign Up Now
            </Button>
          </Link>
          <a href="https://github.com/theakash04" target="blank">
            <Button variant={"secondary"} size={"lg"}>
              Github
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
