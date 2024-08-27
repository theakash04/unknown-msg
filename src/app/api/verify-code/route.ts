import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    const decodedUsername = decodeURIComponent(username.username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isverified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account Verified Successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code!",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired Please signUp again to get a new code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", Error);
    return Response.json(
      {
        success: false,
        message: "Error Verifying user",
      },
      { status: 500 }
    );
  }
}
