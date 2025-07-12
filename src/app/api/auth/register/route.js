import bcrypt from "bcryptjs"
import { createUser, getUserByEmail } from "@/lib/db"

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    console.log('Registration attempt:', { name, email })

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields')
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password length
    if (password.length < 6) {
      return Response.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      console.log('User already exists')
      return Response.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    })

    console.log('User registered successfully:', user.id)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return Response.json({ 
      message: "User created successfully", 
      user: userWithoutPassword 
    }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return Response.json({ error: "User already exists" }, { status: 400 })
    }
    
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}