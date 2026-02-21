"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const token = (session as any)?.token
  
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    details: "",
    phone: "",
    city: "",
    paymentMethod: "online", 
  })

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-red-50 p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Not Authorized</h2>
        <p className="text-gray-600 mb-4">Please login first to continue with checkout</p>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl"
        >
          Go to Login
        </button>
      </div>
    )
  }

  async function handleCheckout(e: FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      if (!token) {
        router.push("/login")
        return
      }

      const cartRes = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
        cache: "no-store",
      })
      const cartData = await cartRes.json()
      const cartId = cartData?.data?._id || cartData?.cartId

      if (!cartId) {
        toast.error("Your cart is empty")
        router.push("/cart")
        return
      }

      if (form.paymentMethod === "online") {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token,
            },
            body: JSON.stringify({
              shippingAddress: {
                details: form.details,
                phone: form.phone,
                city: form.city,
              },
            }),
          }
        )
        const data = await res.json()
        if (res.ok) {
          window.location.href = data.session.url
        } else {
          toast.error(data.message || "Checkout failed")
        }
      } else {
        // Cash on Delivery
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token,
            },
            body: JSON.stringify({
              shippingAddress: {
                details: form.details,
                phone: form.phone,
                city: form.city,
              },
            }),
          }
        )
        const data = await res.json()
        if (res.ok) {
          toast.success("Order placed! Pay on delivery.")
          setTimeout(() => {
            router.push("/myOrders")
            router.refresh()
          }, 1000)
        } else {
          toast.error(data.message || "Failed to place order")
        }
      }
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleCheckout}
      className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">Checkout</h2>

      <input
        value={form.details}
        onChange={(e) => setForm({ ...form, details: e.target.value })}
        placeholder="Address Details"
        required
        className="w-full px-4 py-3 border rounded-xl"
      />

      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone"
        required
        className="w-full px-4 py-3 border rounded-xl"
      />

      <input
        value={form.city}
        onChange={(e) => setForm({ ...form, city: e.target.value })}
        placeholder="City"
        required
        className="w-full px-4 py-3 border rounded-xl"
      />

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="online"
            checked={form.paymentMethod === "online"}
            onChange={() => setForm({ ...form, paymentMethod: "online" })}
            className="accent-emerald-600"
          />
          Online Payment
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="cash"
            checked={form.paymentMethod === "cash"}
            onChange={() => setForm({ ...form, paymentMethod: "cash" })}
            className="accent-emerald-600"
          />
          Cash on Delivery
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl flex justify-center items-center"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Place Order"
        )}
      </button>
    </form>
  )
}