"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { Message } from "@/model/User.model";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    const response = await axios.delete<ApiResponse>(
      `/api/delete-message/${message._id}`
    );
    toast({
      title: response.data.message,
    });
    //check might give some error
    onMessageDelete(message._id as string);
  };
  return (
    <Card className="max-w-96 flex flex-col h-full justify-between bg-secondary">
      <CardHeader>
        <CardDescription className="font-normal text-lg text-primary pr-3">
          {message.content}
        </CardDescription>
      </CardHeader>
      <div className="flex justify-between items-center">
        <CardFooter className="text-muted-foreground text-sm flex h-full">
          <span className="mt-5">
            {new Date(message.createdAt)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, "-")}
          </span>
        </CardFooter>
        <div className="pr-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size={"icon"}>
                <TrashIcon className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}

export default MessageCard;
