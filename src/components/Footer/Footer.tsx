import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <div className='p-5 bg-gray-100 border-t'>
      <div className='py-8'>
        <div className="container mx-auto px-4">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10'>

            {/* Logo + Info */}
            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-lg'>
                  S
                </div>
                <h2 className='text-xl font-bold'>ShopMart</h2>
              </div>

              <p className='text-gray-600 text-sm leading-6'>
                Your one-stop destination for the latest technology, fashion,
                and lifestyle products. Quality guaranteed with fast shipping
                and excellent customer service.
              </p>

              <div className='space-y-2 text-sm text-gray-600'>
                <div className='flex items-center gap-2'>
                  <MapPin size={16} />
                  <span>123 Shop Street, October City, DC 12345</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone size={16} />
                  <span>(+20) 01093333333</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail size={16} />
                  <span>support@shopmart.com</span>
                </div>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h3 className='font-semibold mb-4'>SHOP</h3>
              <ul className='space-y-2 text-gray-600 text-sm'>
                <li className='hover:text-gray-800 cursor-pointer'>Electronics</li>
                <li className='hover:text-gray-800 cursor-pointer'>Fashion</li>
                <li className='hover:text-gray-800 cursor-pointer'>Home & Garden</li>
                <li className='hover:text-gray-800 cursor-pointer'>Sports</li>
                <li className='hover:text-gray-800 cursor-pointer'>Deals</li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className='font-semibold mb-4'>CUSTOMER SERVICE</h3>
              <ul className='space-y-2 text-gray-600 text-sm'>
                <li className='hover:text-gray-800 cursor-pointer'>Contact Us</li>
                <li className='hover:text-gray-800 cursor-pointer'>Help Center</li>
                <li className='hover:text-gray-800 cursor-pointer'>Track Your Order</li>
                <li className='hover:text-gray-800 cursor-pointer'>Returns & Exchanges</li>
                <li className='hover:text-gray-800 cursor-pointer'>Size Guide</li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className='font-semibold mb-4'>ABOUT</h3>
              <ul className='space-y-2 text-gray-600 text-sm'>
                <li className='hover:text-gray-800 cursor-pointer'>About shopmart</li>
                <li className='hover:text-gray-800 cursor-pointer'>Careers</li>
                <li className='hover:text-gray-800 cursor-pointer'>Press</li>
                <li className='hover:text-gray-800 cursor-pointer'>Investor Relations</li>
                <li className='hover:text-gray-800 cursor-pointer'>Sustainability</li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className='font-semibold mb-4'>POLICIES</h3>
              <ul className='space-y-2 text-gray-600 text-sm'>
                <li className='hover:text-gray-800 cursor-pointer'>Privacy Policy</li>
                <li className='hover:text-gray-800 cursor-pointer'>Terms of Service</li>
                <li className='hover:text-gray-800 cursor-pointer'>Cookie Policy</li>
                <li className='hover:text-gray-800 cursor-pointer'>Shipping Policy</li>
                <li className='hover:text-gray-800 cursor-pointer'>Refund Policy</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
