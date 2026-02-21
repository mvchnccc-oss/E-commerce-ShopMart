import ProductCard from '@/components/ProductCard/ProductCard'
import { Products, ProductsResponse } from '@/Interfaces/productInterface';
import Link from 'next/link';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { redirect } from 'next/navigation';

export default async function Favs() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.token;
  
  if (!token) {
    redirect('/login');
  }
  
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      "Content-Type": "application/json",
      token: token
    },
  })
  const data = await response.json();
  const products: Products[] = data.data || []
  console.log(data);

  const favIds = products.map((p: Products) => p._id)
  
  const cartRes = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
      token: token
    },
    cache: "no-store",
  });
  const cartData = await cartRes.json();
  const cartIds = (cartData.data?.products || []).map((item: any) => item.product._id);

  if (products.length === 0) {
    return <div className='mx-auto text-4xl md:text-5xl font-bold text-center text-gray-800'>No products yet
      <button className='rounded-lg py-2 text-sm font-bold text-white active:scale-95'>
        <h2 className='text-blue-500'>
          <Link href="/products">Return to products</Link>
        </h2>
      </button>
    </div>
  }

  return (
    <>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product: Products) => (
            <ProductCard key={product._id} product={product} favIds={favIds} CartIds={cartIds} />
          ))}
        </div>
      </div>
    </>)
}