"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"

type FormData = {
    email: string
}

export default function ForgotPassword() {
    const { register, handleSubmit } = useForm<FormData>()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: FormData) {
        setLoading(true)
        try {
            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: data.email }),
                }
            )

            const result = await res.json()

            if (res.ok) {
                toast.success("Code sent to your email")
                router.push(`/verify-code?email=${data.email}`)
            } else {
                toast.error(result.message || "Something went wrong")
            }
        } catch {
            toast.error("Error, try again")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl space-y-5"
        >
            <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

            <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border rounded-xl"
            />

            <button
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white py-3 rounded-xl flex justify-center items-center"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    "Send code"
                )}
            </button>
        </form>
    )
}