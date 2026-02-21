import CartItemCard from '@/components/CartCard/CartitemCard';
import ClearCart from '@/components/ClearCart/ClearCart';
import { CartResponse } from '@/Interfaces/CartInterfaces';
import Link from 'next/link';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.token;

  if (!token) {
    redirect('/login');
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    }
  );

  const data: CartResponse = await response.json();

  const cartItems = data.data?.products || [];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {cartItems.length > 0 && (
        <>

          <ClearCart />

          <div className="bg-gray-100 p-4 rounded-xl shadow-sm flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Total: <span className="text-emerald-600">{data.data.totalCartPrice} EGP</span>
            </h2>
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-emerald-600">{data.numOfCartItems} Items</span>
            </h2>
            <Link
              href="/checkout"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition active:scale-95"
            >
              Checkout
            </Link>
          </div>

        </>
      )}
      {cartItems.length === 0 ? (
        <div className='mx-auto text-4xl md:text-5xl font-bold text-center text-gray-800'>Your cart is empty
          <button className='rounded-lg py-2 text-sm font-bold text-white active:scale-95'>
            <h2 className='text-blue-500'>
              <Link href="/products">Return to products</Link>
            </h2>
          </button>
        </div>
      ) : (
        cartItems.map((item) => (
          <CartItemCard
            key={item._id}
            item={item}
          />
        ))
      )}

    </div>
  );
}
