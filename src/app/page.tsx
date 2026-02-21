import Image from "next/image";
import heroimage from "@/../public/f7fb4d5395be91fabd9500896062f914.jpg"
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="bg-linear-to-r p-0 md:p-5 from-emerald-50 to-white min-h-[60vh] flex items-center mb-0 md:mb-4">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="flex flex-col gap-6">
              <span className="bg-emerald-100 text-emerald-600 px-4 py-1 rounded-full w-fit text-sm font-medium">
                Big Summer Sale 🔥 Up to 50% Off
              </span>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-800">
                Discover Everything <br />
                You Need at <span className="text-emerald-600">ShopMart</span>
              </h1>

              <p className="text-gray-600 text-lg max-w-lg">
                Shop the latest products with the best prices. Fast delivery,
                secure payment, and easy returns.
              </p>

              <div className="flex flex-wrap gap-4 mt-4">
                <Link href="/products">
                  <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300">
                    Shop Now
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full transition duration-300">
                    Browse Categories
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden md:flex justify-center">
              <Image
                src={heroimage}
                alt="Shopping"
                className="w-70 drop-shadow-2xl rounded-2xl"
              />
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
