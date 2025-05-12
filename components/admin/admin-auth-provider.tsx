"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AdminAuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    // For demo purposes, hardcoded credentials
    if (email === "admin@example.com" && password === "password") {
      const user = {
        id: "1",
        name: "John Doe",
        email: "admin@example.com",
        role: "admin",
      }
      setUser(user)
      localStorage.setItem("adminUser", JSON.stringify(user))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("adminUser")
    router.push("/admin")
  }

  // If loading, show nothing
  if (isLoading) {
    return null
  }

  // If not logged in, show login form
  if (!user) {
    return <AdminLoginForm login={login} />
  }

  // If logged in, show children
  return <AdminAuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
