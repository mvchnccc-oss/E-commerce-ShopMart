import { Products } from '@/Interfaces/productInterface';
import { Params } from 'next/dist/server/request/params'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import React from 'react'
import FavsButton from '@/components/Favsbutton/Favsbutton';
import Cartbutton from '@/components/Cartbutton/Cartbutton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth';
import { redirect } from 'next/navigation';

export default async function Productdetails({ params }: { params: Params }) {
    const session = await getServerSession(authOptions);
    const token = (session as any)?.token;
    
    
    const { productid } = await params;
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/" + productid)
    const { data: product }: { data: Products } = await response.json();

    const Favresponse = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
            token: token
        },
    })
    const Favdata = await Favresponse.json();
    const favIds = (Favdata.data || []).map((p: Products) => p._id)
    return (
        <>
            <div className='container mx-auto mb-5 md:mb-0 py-10 border rounded-none md:rounded-2xl shadow-2xl px-5'>
                <div className="grid md:grid-cols-2 gap-8">

                    {/* image slider */}
                    <div className="relative">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {product.images.map((img: string, index: number) => (
                                    <CarouselItem key={index}>
                                        <div className="relative w-full h-100 rounded-xl overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={product.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                            <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                        </Carousel>
                    </div>

                    {/* details */}
                    <div className="space-y-4 px-2 md:px-0">
                        <p className="text-sm text-gray-500">{product.category.name}</p>

                        <h2 className="text-3xl font-bold">{product.title}</h2>

                        <p className="text-gray-600">{product.description}</p>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded">
                            <span className="text-xs font-bold text-yellow-700">{product.ratingsAverage}</span>
                            <svg className="h-3 w-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-emerald-600">
                                EGP {product.priceAfterDiscount || product.price}
                            </span>
                            {product.priceAfterDiscount && (
                                <span className="text-xs text-gray-400 line-through">
                                    EGP {product.price}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Cartbutton productId={product._id}
                                initialCartIds={[]}
                                token={token} />
                            <FavsButton productId={product._id} initialFavIds={favIds || []} token={token} />


                        </div>

                    </div>

                </div>
            </div>
        </>)
}
