import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductListView({product}) {
    const navigate = useNavigate()
    const {addToCart} = useCart()
  return (
    <div className='space-y-4 mt-2 rounded-md'> 
    <div className=' bg-gray-100 flex gap-7 items-center p-2 roundrd-md'>
    <img src={product.images} alt={product.title} className=' md:h-60 md:w-60 h-25 w-25 rounded-md cursor-pointer' onClick={()=>navigate(`/products/${product.id}`)} />
    <div className=' space-y-2'>
        <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[220px]'>{product.title}</h1>
        <p className='font-semibold flex items-center md:text-lg text-sm'><span className='md:text-4xl text-3xl text-red-500'><span className='font-semibold text-2xl text-black'>$</span>{product.price}</span>({product.discount}% off)</p>
        <p className=' text-sm'>FREE delivery by <span className='font-semibold'>Fri,18 Dec</span>  <br />
         or fastest delivery by <span className='font-semibold'>Tomorrow,17 Dec</span></p>
        <button className='bg-red-500 text-white px-3 py-1 cursor-pointer rounded-md' onClick={()=>addToCart(product)}>Add to Cart</button>
    </div>
    </div>
    </div>
  )
}

export default ProductListView
