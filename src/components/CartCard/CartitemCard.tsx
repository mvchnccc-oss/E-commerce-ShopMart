"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { removeCartItem, updateCartCount } from "@/Actions/Addtocart.action"
export default function CartItemCard({ item }: any) {
    const router = useRouter()
    const [incLoading, setIncLoading] = useState(false)
    const [decLoading, setDecLoading] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)

    async function updateCount(newCount: number) {
        if (newCount < 1) return
        try {
            if (newCount > item.count) setIncLoading(true)
            else setDecLoading(true)

            await updateCartCount(item.product._id, newCount)

            router.refresh()
        } finally {
            setIncLoading(false)
            setDecLoading(false)
        }
    }

    async function removeItem() {
        try {
            setRemoveLoading(true)

            await removeCartItem(item.product._id)

            router.refresh()
        } finally {
            setRemoveLoading(false)
        }
    }

    const spinner = (
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    )

    return (
        <div className="flex gap-5 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition">
            <Link href={`/products/${item.product._id}`}>
                <div className="relative w-28 h-28 bg-gray-50 rounded-xl overflow-hidden cursor-pointer">
                    <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                    />
                </div>
            </Link>

            <div className="flex flex-col flex-1 justify-between">
                <div>
                    <h3 className="font-semibold text-lg line-clamp-1">{item.product.title}</h3>
                    <p className="text-emerald-600 font-bold mt-1">EGP {item.price}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-100 rounded-full">
                        <button
                            onClick={() => updateCount(item.count - 1)}
                            disabled={item.count <= 1 || decLoading || incLoading}
                            className="px-3 py-1 text-lg font-bold "
                        >
                            {decLoading ? spinner : "-"}
                        </button>

                        <span className="px-4">{item.count}</span>

                        <button
                            onClick={() => updateCount(item.count + 1)}
                            disabled={incLoading || decLoading}
                            className="px-3 py-1 text-lg font-bold"
                        >
                            {incLoading ? spinner : "+"}
                        </button>
                    </div>

                    <button
                        onClick={removeItem}
                        disabled={removeLoading || incLoading || decLoading}
                        className="text-red-500 hover:text-red-600 font-medium"
                    >
                        {removeLoading ? spinner : "Remove"}
                    </button>
                </div>

                <div className="text-right font-bold text-gray-700 mt-2">
                    Total: EGP {item.price * item.count}
                </div>
            </div>
        </div>
    )
}