import ProductCard from '@/components/ProductCard/ProductCard';
import { Products, ProductsResponse } from '@/Interfaces/productInterface';
import Image from 'next/image';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';

export default async function AllProducts() {
  const session = await getServerSession(authOptions);
  const token = (session as any)?.token;
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  const data: ProductsResponse = await response.json();

  let favIds: string[] = [];
  let cartIds: string[] = [];

  if (token) {
    const favRes = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token }
    });

    const favData = await favRes.json();
    favIds = (favData.data || []).map((p: Products) => p._id);

    const cartRes = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token },
      cache: "no-store",
    });

    const cartData = await cartRes.json();
    cartIds = (cartData.data?.products || []).map((item: any) => item.product._id);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.data.map((product) => (
          <ProductCard key={product._id} product={product} favIds={favIds} CartIds={cartIds} />
        ))}
      </div>
    </div>
  );
}