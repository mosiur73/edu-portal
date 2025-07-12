"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserNav from "@/components/auth/user-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/auth/signin")
  }, [session, status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back, {session.user?.name}!</CardTitle>
              <CardDescription>You are successfully authenticated.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {session.user?.email}
                </p>
                <p>
                  <strong>Name:</strong> {session.user?.name}
                </p>
                {session.user?.image && (
                  <p>
                    <strong>Profile Image:</strong> Available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
