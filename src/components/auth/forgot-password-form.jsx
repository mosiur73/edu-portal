// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"

// export default function ForgotPasswordForm() {
//   const [email, setEmail] = useState("")
//   const [message, setMessage] = useState("")
//   const [error, setError] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")
//     setMessage("")

//     try {
//       const response = await fetch("/api/auth/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         setMessage(data.message)
//       } else {
//         setError(data.error || "Something went wrong")
//       }
//     } catch (error) {
//       setError("An error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle>Forgot Password</CardTitle>
//         <CardDescription>Enter your email to receive a password reset link</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {message && (
//           <Alert>
//             <AlertDescription>{message}</AlertDescription>
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading ? "Sending..." : "Send Reset Link"}
//           </Button>
//         </form>
//       </CardContent>

//       <CardFooter>
//         <p className="text-sm text-center w-full">
//           Remember your password?{" "}
//           <Link href="/auth/signin" className="text-primary hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Import useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        // --- CRITICAL CHANGE: Redirect if token is received ---
        if (data.token) {
          console.log("Redirecting to reset password page with token:", data.token);
          router.push(`/auth/reset-password?token=${data.token}`);
        }
        // --- END CRITICAL CHANGE ---
      } else {
        setError(data.error || "Something went wrong")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <p className="text-sm text-center w-full">
          Remember your password?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}