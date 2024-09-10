import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const response = await resend.emails.send({
      from: "un-msg@akashtwt.tech",
      to: email,
      subject: "Unknown message | verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    if (response.error) {
      throw new Error(response.error.message || "Resend Error");
    }
    return { success: true, message: "verification mail send successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send Verification Email" };
  }
}
