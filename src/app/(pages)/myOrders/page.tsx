"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { getOrders } from "@/Actions/profile.actions"

type Order = {
  _id: string
  totalOrderPrice: number
  products: {
    _id: string
    title: string
    quantity: number
    price: number
  }[]
  paid: boolean
  createdAt: string
}

export default function OrdersPage() {
  const { data: session } = useSession()
  const token = (session as any)?.token
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    async function fetchOrders() {
      setLoading(true)
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        console.log("Error fetching orders:", err)
        toast.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [token])

  if (!token) {
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        <p className="mb-4">Please login to view your orders</p>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg"
        >
          Go to Login
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex mx-auto justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (orders.length === 0) {
    return <div className="text-center mt-20 text-xl">No orders found</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-xl p-4 shadow-sm space-y-2">
          <div className="flex justify-between">
            <p>Order ID: {order._id}</p>
            <p>
              Status:{" "}
              <span className={order.paid ? "text-green-600" : "text-yellow-600"}>
                {order.paid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>

          <p>Total: {order.totalOrderPrice} EGP</p>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>

          <div className="mt-2">
            <h3 className="font-semibold mb-2">Products:</h3>
            {order.products && order.products.length > 0 ? (
              order.products.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between border-b py-1 last:border-b-0"
                >
                  <span>{p.title} x {p.quantity}</span>
                  <span>{p.price * p.quantity} EGP</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No products in this order</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}