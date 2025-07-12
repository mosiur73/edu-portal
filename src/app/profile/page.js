"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import ProfileView from "@/components/profile/profile-view"
import ProfileEdit from "@/components/profile/profile-edit"
import UserNav from "@/components/auth/user-nav"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/auth/signin")
      return
    }

    fetchUserProfile()
  }, [session, status, router])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (updatedUser) => {
    setUser(updatedUser)
    setIsEditing(false)
    // Update the session with new user data
    await update({
      ...session,
      user: {
        ...session.user,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">{isEditing ? "Edit Profile" : "Profile"}</h1>
            <UserNav />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isEditing ? (
            <ProfileEdit user={user} onSave={handleSave} onCancel={handleCancel} />
          ) : (
            <ProfileView user={user} onEdit={handleEdit} />
          )}
        </div>
      </main>
    </div>
  )
}
