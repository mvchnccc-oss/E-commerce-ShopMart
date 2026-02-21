import { getServerSession } from "next-auth";
import { authOptions } from "../auth/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.token;

  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cartId");

  const formData = await req.formData();

  const body = {
    shippingAddress: {
      details: formData.get("details"),
      phone: formData.get("phone"),
      city: formData.get("city"),
    },
  };

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return NextResponse.redirect(data.session.url);
}