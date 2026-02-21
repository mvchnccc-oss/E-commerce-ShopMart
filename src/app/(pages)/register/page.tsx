"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { registerUser } from "@/Actions/auth.actions"

export default function Register() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError("")

        const formData = new FormData(e.currentTarget)

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const rePassword = formData.get("rePassword") as string
        const phone = formData.get("phone") as string
        const city = formData.get("city") as string
        const country = formData.get("country") as string

        // Validate passwords match
        if (password !== rePassword) {
            setError("Passwords do not match")
            toast.error("Passwords do not match")
            setLoading(false)
            return
        }

        try {
            const response = await registerUser(name, email, password, phone, city, country)

            if (response.success) {
                toast.success("Registered successfully...")
                await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                })
                router.push("/products")
            } else {
                const errorMsg = response.error || response.message || "Registration failed"
                setError(errorMsg)
                toast.error(errorMsg)
            }
        } catch (error) {
            const errorMsg = "Error, try again"
            setError(errorMsg)
            toast.error(errorMsg)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleRegister}
            className="max-w-md mx-auto my-5 bg-white shadow-xl rounded-2xl p-8 space-y-5 border"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                <p className="text-gray-500 text-sm">Sign up to get started</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
            )}

            <div className="space-y-4">

                <input
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="rePassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="city"
                    placeholder="City"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

                <input
                    name="country"
                    placeholder="Country"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />

            </div>

            <button
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Create Account"
                )}
            </button>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
                   <Link href={"/login"}> Sign in</Link>
                </span>
            </p>
        </form>)
}