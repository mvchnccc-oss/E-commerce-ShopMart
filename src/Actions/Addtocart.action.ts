"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth";
import { revalidatePath } from "next/cache";

export type CartResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

async function getToken(): Promise<string> {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.token;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  return token;
}

export async function getCart(): Promise<any> {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    return await response.json();
  } catch (err: any) {
    console.log("Error fetching cart:", err);
    throw new Error(err.message || "Failed to fetch cart");
  }
}

export async function addToCart(productId: string): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add to cart");
    }

    revalidatePath("/cart");
    return await response.json();
  } catch (err: any) {
    console.log("Error adding to cart:", err);
    throw new Error(err.message || "Failed to add to cart");
  }
}

export async function updateCartCount(
  productId: string,
  count: number,
): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ count }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update cart");
    }

    revalidatePath("/cart");
    return await response.json();
  } catch (err: any) {
    console.log("Error updating cart:", err);
    throw new Error(err.message || "Failed to update cart");
  }
}

export async function removeCartItem(productId: string): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: { token },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove item");
    }

    revalidatePath("/cart");
    return await response.json();
  } catch (err: any) {
    console.log("Error removing from cart:", err);
    throw new Error(err.message || "Failed to remove item");
  }
}

export async function clearCart(): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clear cart");
    }

    revalidatePath("/cart");
    return await response.json();
  } catch (err: any) {
    console.log("Error clearing cart:", err);
    throw new Error(err.message || "Failed to clear cart");
  }
}

export async function getWishlist(): Promise<any> {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: { token },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return await response.json();
  } catch (err: any) {
    console.log("Error fetching wishlist:", err);
    throw new Error(err.message || "Failed to fetch wishlist");
  }
}

export async function addToWishlist(productId: string): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ productId }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add to wishlist");
    }

    revalidatePath("/favs");
    return await response.json();
  } catch (err: any) {
    console.log("Error adding to wishlist:", err);
    throw new Error(err.message || "Failed to add to wishlist");
  }
}

export async function removeFromWishlist(
  productId: string,
): Promise<CartResponse> {
  try {
    const token = await getToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove from wishlist");
    }

    revalidatePath("/favs");
    return await response.json();
  } catch (err: any) {
    console.log("Error removing from wishlist:", err);
    throw new Error(err.message || "Failed to remove from wishlist");
  }
}
