"use server"

import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import { authOptions } from "@/app/api/auth/auth"

export type AuthResponse = {
  success: boolean
  message: string
  user?: {
    name: string
    email: string
    role: string
  }
  error?: string
}

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return null
    }

    return {
      name: (session as any)?.user?.name || "",
      email: (session as any)?.user?.email || "",
      role: (session as any)?.user?.role || "",
      token: (session as any)?.token || "",
    }
  } catch (err) {
    console.log("Error getting current user:", err)
    return null
  }
}

export async function checkAuth(): Promise<boolean> {
  try {
    const session = await getServerSession(authOptions)
    return !!session && !!(session as any)?.token
  } catch (err) {
    console.log("Error checking auth:", err)
    return false
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string,
  phone: string,
  city: string,
  country: string
): Promise<AuthResponse> {
  try {
    if (!name || !email || !password || !phone || !city || !country) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          rePassword: password,
          phone,
          city,
          country,
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return {
        success: false,
        message: errorData.message || "Registration failed",
        error: errorData.message,
      }
    }

    const data = await response.json()
    return {
      success: true,
      message: "Registration successful",
      user: {
        name: data.user?.name || "",
        email: data.user?.email || "",
        role: data.user?.role || "",
      },
    }
  } catch (err: any) {
    console.log("Error registering user:", err)
    return {
      success: false,
      message: "An error occurred during registration",
      error: err.message,
    }
  }
}
export async function logoutUser() {
  try {
    // signOut is not needed in Server Action, just clearing the session is done by next-auth automatically
    // by calling signOut from client
    return {
      success: true,
      message: "Logged out successfully",
    }
  } catch (err) {
    console.log("Error logging out:", err)
    return {
      success: false,
      message: "Failed to logout",
    }
  }
}
export async function getCartCount(): Promise<number> {
  try {
    const session = await getServerSession(authOptions)
    const token = (session as any)?.token

    if (!token) {
      return 0
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        "Content-Type": "application/json",
        token,
      },
      cache: "no-store",
    })

    const data = await res.json()
    return data.data?.products?.length || 0
  } catch (err) {
    console.log("Error fetching cart count:", err)
    return 0
  }
}
