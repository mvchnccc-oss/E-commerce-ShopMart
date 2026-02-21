"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/auth"

export type UserStats = {
  ordersCount: number
  wishlistCount: number
  cartCount: number
}

export async function getUserStats(): Promise<UserStats> {
  try {
    const session = await getServerSession(authOptions)
    const token = (session as any)?.token

    if (!token) {
      throw new Error("Unauthorized")
    }

    const ordersRes = await fetch("https://ecommerce.routemisr.com/api/v1/orders", {
      headers: { token },
      cache: "no-store",
    })
    const ordersData = await ordersRes.json()
    const ordersCount = (ordersData.data || []).length

    const wishlistRes = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token },
      cache: "no-store",
    })
    const wishlistData = await wishlistRes.json()
    const wishlistCount = (wishlistData.data || []).length

    const cartRes = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
      cache: "no-store",
    })
    const cartData = await cartRes.json()
    const cartCount = (cartData.data?.products || []).length

    return {
      ordersCount,
      wishlistCount,
      cartCount,
    }
  } catch (err) {
    console.log("Error fetching user stats:", err)
    return {
      ordersCount: 0,
      wishlistCount: 0,
      cartCount: 0,
    }
  }
}

export async function getOrders() {
  try {
    const session = await getServerSession(authOptions)
    const token = (session as any)?.token

    if (!token) {
      throw new Error("Unauthorized")
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders", {
      headers: { token },
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch orders")
    }

    const data = await res.json()
    return (data.data || []).map((order: any) => ({
      ...order,
      products: order.products || [],
      totalOrderPrice: order.totalOrderPrice || 0,
      paid: order.paid || false,
      createdAt: order.createdAt || new Date().toISOString(),
    }))
  } catch (err) {
    console.log("Error fetching orders:", err)
    return []
  }
}
