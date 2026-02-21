"use client"

import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"

type FormData = {
    resetCode: string
}

export default function VerifyCode() {
    const { register, handleSubmit } = useForm<FormData>()
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const [loading, setLoading] = useState(false)
    async function onSubmit(data: FormData) {
        setLoading(true)
        try {
            const res = await fetch(
                "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ resetCode: data.resetCode }),
                }
            )

            const result = await res.json()

            if (res.ok) {
                toast.success("Code verified")
                router.push(`/reset-password?email=${email}`)
            } else {
                toast.error(result.message || "Invalid code")
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
            <h2 className="text-2xl font-bold text-center">Verify Code</h2>

            <input
                {...register("resetCode")}
                placeholder="Enter 6 digit code"
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
                    "Verify"
                )}
            </button>
        </form>
    )
}