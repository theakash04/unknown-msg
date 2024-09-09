import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { User } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  const messageId = params.messageid;
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user: User = session?.user as User;
  const userId = new mongoose.Types.ObjectId(user._id);

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated!",
      },
      { status: 401 },
    );
  }
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageId } } },
    );
    if(updatedResult.modifiedCount === 0){
      return Response.json(
        {
          success: false,
          message: "Message Not found or already deleted",
        },
        { status: 404 },
      );
    }
    
    return Response.json(
      {
        success: true,
        message: "Message Deleted",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while deleting message",
      },
      { status: 500 },
    );
  }
}
