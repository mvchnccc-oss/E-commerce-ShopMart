"use client";

import { clearCart } from "@/Actions/Addtocart.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ClearCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClear = async () => {
    try {
      setLoading(true);
      await clearCart();
      toast.success("Cart cleared 🗑️");
      router.refresh();
    } catch {
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleClear}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all active:scale-95"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-t-white border-r-transparent rounded-full animate-spin"></div>
        ) : (
          "Clear Cart"
        )}
      </button>
    </div>
  );
}
