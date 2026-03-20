"use server"

import dbConnect from "@/lib/db/connect"
import User from "@/lib/db/models/user"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function login(email: string, password: string) {
  await dbConnect()

  // Find user
  const user = await User.findOne({ email })
  if (!user) {
    return { success: false, message: "Invalid credentials" }
  }

  // Check password
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return { success: false, message: "Invalid credentials" }
  }

  // Create token
  const token = await new SignJWT({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(JWT_SECRET))

  // Set cookie
  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  return {
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export async function logout() {
  cookies().delete("auth-token")
  return { success: true }
}

export async function getSession() {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    return verified.payload
  } catch (error) {
    return null
  }
}

export async function createInitialAdmin() {
  await dbConnect()

  // Check if admin exists
  const adminExists = await User.findOne({ role: "admin" })

  if (!adminExists) {
    // Create admin user
    await User.create({
      name: "Abhishek Sharma",
      email: "admin@example.com",
      password: "password",
      role: "admin",
    })

    console.log("Initial admin user created")
  }
}
