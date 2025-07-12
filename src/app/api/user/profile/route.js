import { getUserById, updateUserProfile } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserById(session.user.id)
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user
    return Response.json({ user: userWithoutPassword }, { status: 200 })
  } catch (error) {
    console.error("Get profile error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request) {
  console.log('API: PUT /api/user/profile hit'); // LOG 1
  try {
    const session = await getServerSession(authOptions)
    console.log('API: Session user ID:', session?.user?.id); // LOG 2

    if (!session?.user?.id) {
      console.log('API: Unauthorized - No session user ID'); // LOG 3
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, university, address } = await request.json()
    console.log('API: Received profile data:', { name, email, university, address }); // LOG 4

    if (!name || !email) {
      console.log('API: Missing name or email'); // LOG 5
      return Response.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('API: Invalid email format'); // LOG 6
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    const updatedUser = await updateUserProfile(session.user.id, {
      name,
      email,
      university,
      address,
    })

    console.log('API: updateUserProfile returned:', updatedUser); // LOG 7

    if (!updatedUser) { // This check helps if updateUserProfile returns null unexpectedly
      console.error('API: updatedUser is null/undefined after updateUserProfile call'); // LOG 8
      return Response.json({ error: "Failed to retrieve updated user data" }, { status: 500});
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser
    console.log('API: User data after removing password:', userWithoutPassword); // LOG 9
    return Response.json({ user: userWithoutPassword }, { status: 200 })
  } catch (error) {
    console.error("Update profile error (caught in API route):", error); // LOG 10

    // Handle duplicate email error
    if (error.code === 11000) {
      return Response.json({ error: "Email already exists" }, { status: 400 })
    }

    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}