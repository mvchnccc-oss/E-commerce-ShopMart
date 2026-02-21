"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import brandimage from "@/../public/globe.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from 'next-auth/react'
import { getCartCount } from '@/Actions/auth.actions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const links = [
    { path: "/products", label: "Products" },
    { path: "/brands", label: "Brands" },
    { path: "/categories", label: "Categories" },
  ];
  const { data: session } = useSession()
  const [cartCount, setCartCount] = useState(0)
  const token = (session as any)?.token
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    async function fetchCart() {
      if (!token) {
        setCartCount(0)
        return
      }
      try {
        const count = await getCartCount()
        setCartCount(count)
      } catch (error) {
        console.log("Error fetching cart count:", error)
      }
    }

    fetchCart()
  }, [pathname, token])

  const handleLogout = async () => {
    try {
      // Use signOut from next-auth/react for client-side logout
      const { signOut } = await import('next-auth/react')
      const result = await signOut({ redirect: false })
      if (result) {
        toast.success("Logged out successfully")
        router.push("/")
      } else {
        toast.error("Failed to logout")
      }
    } catch (error) {
      toast.error("Failed to logout")
      console.log(error)
    }
  }

  const [toggeler, setToggeler] = useState(false);
  return (<>
    <nav className='shadow-2xl px-4 sm:px-0 py-4 bg-[#111111] fixed start-0 end-0 z-50'>
      <div className='container mx-auto text-slate-100 rounded-2xl '>
        {/* Computer & tablet view */}
        <div className="flex justify-between items-center">

          <div className='flex items-center gap-2'>
            <Image width={50} height={50} alt="brandimage" className='rounded-full' src={brandimage} />
            <Link href="/" className='text-3xl font-bold'>
              ShopMart
              <h2 className='text-sm text-[#95BF47] font-medium'>All you want ,right away</h2>
            </Link>
          </div>

          <div className='hidden sm:block'>
            <ul className='py-3 md:px-10 px-5 bg-black text-white rounded-3xl flex items-center gap-8'>
              {
                links.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className={pathname === link.path ? "text-[#95BF47]" : "text-white"}>{link.label}</Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className='hidden sm:flex items-center gap-2'>
            <Link href="/favs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            </Link>
            <Link href="/cart" className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-2 -right-1.5 bg-[#95BF47] text-xs w-4 h-4 flex items-center justify-center rounded-full text-white">
                {cartCount}
              </span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  {token ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/profile">Profile</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/myOrders">My Orders</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>Logout</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Login</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/register">Register</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>

          <div className='block sm:hidden'>
            <svg onClick={() => setToggeler(!toggeler)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </div>

        </div>
        {/* Mobile view */}
        <ul className={`text-white space-y-3 mt-3 overflow-hidden transition-all duration-700 ease-in-out ${toggeler ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-8"}`}>

          {
            links.map((link) => (
              <li key={link.path}>
                <Link onClick={() => setToggeler(false)} href={link.path} className={pathname === link.path ? "text-[#95BF47]" : "text-white"}>{link.label}</Link>
              </li>
            ))
          }
          <div className="flex gap-2 items-center mt-2">
            <Link href="/favs"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            </Link>
            <Link href="/cart" className='relative'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -top-2 -right-1.5 bg-[#95BF47] text-xs w-4 h-4 flex items-center justify-center rounded-full text-white">
                {cartCount}
              </span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer duration-500 hover:text-[#95BF47]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>

                      {token ? (
                        <>
                          <Link href="/profile">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>

                          <Link href="/myOrders">
                            <DropdownMenuItem>My Orders</DropdownMenuItem>
                          </Link>

                          <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>Logout</DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <Link href="/login">
                            <DropdownMenuItem>Login</DropdownMenuItem>
                          </Link>

                          <Link href="/register">
                            <DropdownMenuItem>Register</DropdownMenuItem>
                          </Link>
                        </>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </ul>

      </div>
    </nav>


  </>)
}
