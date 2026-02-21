"use client"
import Image from "next/image"
import imgtest from "@/../public/f7fb4d5395be91fabd9500896062f914.jpg"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getUserStats, type UserStats } from "@/Actions/profile.actions"

export default function ProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats>({
    ordersCount: 0,
    wishlistCount: 0,
    cartCount: 0,
  })
  const [loading, setLoading] = useState(true)

  const user = (session as any)?.user
  const token = (session as any)?.token

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    const fetchStats = async () => {
      try {
        const data = await getUserStats()
        setStats(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [token, router])

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please login first</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] py-2 px-0 lg:px-4 mx-auto">
      <div className=" bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="h-40 bg-linear-to-r from-emerald-500 to-emerald-700 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-full h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
              <Image
                src={imgtest}
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.name || "User"}
              </h2>
              <p className="text-gray-500">{user?.email || "email@example.com"}</p>
              <p className="text-sm text-gray-400 mt-1">Role: {user?.role || "user"}</p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Edit Profile
              </button>

              <button onClick={() => signOut({
                callbackUrl: "/"
              })} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition cursor-pointer">
                Logout
              </button>
            </div>

          </div>

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="bg-gray-50 rounded-xl p-3 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">
                Orders
              </h3>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                {loading ? "..." : stats.ordersCount}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">
                Wishlist
              </h3>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                {loading ? "..." : stats.wishlistCount}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-center shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">
                Cart Items
              </h3>
              <p className="text-3xl font-bold text-emerald-600 mt-2">
                {loading ? "..." : stats.cartCount}
              </p>
            </div>

          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Profile Information
            </h3>

            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold">{user?.name}</span>
              </div>

              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{user?.email}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Role:</span>
                <span className="font-semibold text-emerald-600">{user?.role}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}