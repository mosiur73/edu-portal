// import { getUserByEmail, saveResetToken } from "@/lib/db"
// import { generateResetToken, sendResetEmail } from "@/lib/password-reset"

// export async function POST(request) {
//   try {
//     const { email } = await request.json()

//     if (!email) {
//       return Response.json({ error: "Email is required" }, { status: 400 })
//     }

//     // Check if user exists
//     const user = await getUserByEmail(email)
//     if (!user) {
//       // Don't reveal if user exists or not for security
//       return Response.json(
//         { message: "If an account with that email exists, we've sent a password reset link." },
//         { status: 200 },
//       )
//     }

//     // Generate reset token
//     const resetToken = generateResetToken()
//     const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

//     // Save reset token to database
//     await saveResetToken(user.id, resetToken, expiresAt)

//     // Send reset email
//     await sendResetEmail(email, resetToken)

//     return Response.json(
//       { message: "If an account with that email exists, we've sent a password reset link." },
//       { status: 200 },
//     )
//   } catch (error) {
//     console.error("Forgot password error:", error)
//     return Response.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
import { getUserByEmail, saveResetToken } from "@/lib/db"
import { generateResetToken, sendResetEmail } from "@/lib/password-reset"

export async function POST(request) {
  try {
    const { email } = await request.json()
    console.log('API: Forgot password request received for email:', email);

    if (!email) {
      console.log('API: Email is missing');
      return Response.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      // For security, still return a generic message, but we won't redirect on client
      // if user doesn't exist. The client will handle the redirect only if a token is returned.
      return Response.json(
        { message: "If an account with that email exists, we've sent a password reset link." },
        { status: 200 },
      )
    }

    console.log('API: User found, generating reset token for user ID:', user.id);
    const resetToken = generateResetToken()
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    await saveResetToken(user.id, resetToken, expiresAt)
    console.log('API: Reset token saved to DB.');

    // Send reset email (this will still log to terminal or send real email if configured)
    await sendResetEmail(email, resetToken)
    console.log('API: sendResetEmail function called.');

    // --- CRITICAL CHANGE: Return the token for client-side redirect ---
    return Response.json(
      { 
        message: "Password reset link generated. Redirecting...", 
        token: resetToken // Return the token here
      }, 
      { status: 200 }
    )
    // --- END CRITICAL CHANGE ---

  } catch (error) {
    console.error("Forgot password error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}