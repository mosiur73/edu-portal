// app/api/auth/reset-password/route.js
import bcrypt from "bcryptjs"
import { getUserByResetToken, updateUserPassword, deleteResetToken } from "@/lib/db"

export async function POST(request) {
  console.log('--- API: reset-password POST handler hit ---'); // Keep this log for verification
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      console.log('Reset password: Missing token or password');
      return Response.json({ error: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      console.log('Reset password: Password too short');
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Find user by reset token
    const user = await getUserByResetToken(token)
    if (!user) {
      console.log('Reset password: Invalid or expired token');
      return Response.json({ error: "Invalid or expired reset token" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    await updateUserPassword(user.id, hashedPassword)
    console.log('Reset password: User password updated for ID:', user.id);

    // Delete reset token
    await deleteResetToken(token)
    console.log('Reset password: Reset token deleted');

    return Response.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    console.error("Reset password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}