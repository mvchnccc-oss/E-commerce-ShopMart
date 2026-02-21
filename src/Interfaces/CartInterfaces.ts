import { Brand, Category, Subcategory } from '@/Interfaces/productInterface';
export interface CartResponse {
  status: string
  message?: string
  numOfCartItems: number
  cartId: string
  data: Cart
}

export interface Cart {
  _id: string
  cartOwner: string
  products: CartItem[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}
export interface CartItem {
  count: number
  _id: string
  product: Product2   
  price: number
}


export interface Product2 {
  sold?: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  id: string
  priceAfterDiscount?: number
}

