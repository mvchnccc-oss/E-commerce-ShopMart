"use client"
import { addToCart } from "@/Actions/Addtocart.action"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { FaShoppingCart } from "react-icons/fa"
import { useSession } from "next-auth/react"

interface CartButtonProps {
    productId: string
    initialCartIds?: string[]
}

export default function Cartbutton({
    productId,
    initialCartIds = [],
}: CartButtonProps) {

    const { data: session } = useSession()
    const token = (session as any)?.token
    const [isInCart, setIsInCart] = useState(
        initialCartIds.includes(productId)
    )
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleCart() {
        if (!token) {
            router.push("/login")
            return
        }
        try {
            setLoading(true);
            await addToCart(productId);
            setIsInCart(true);
            toast.success("Added to cart 🛒")
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong ❌")
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleCart}
            disabled={loading}
            className={`flex-1 flex justify-center items-center gap-2 py-2 px-4 rounded-2xl text-white bg-emerald-500 hover:bg-emerald-600 transition-all`}
        >
            {loading ? (
                <div className="w-4 h-4 border-4 border-t-white border-r-transparent rounded-full animate-spin"></div>
            ) : (
                <FaShoppingCart className="w-4 h-4" />
            )}
            Add To Cart
        </button>
    )
}
