import Link from 'next/link'
import React from 'react'
import FeatureImage from '../public/feature.png'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext } from './CartContext'
import Center from './Center'


export default function Featured({product}) {
    const {addProduct} = useContext(CartContext);
    function addFeaturedToCart() {
    addProduct(product._id);
    }

  return (
    <Center>
      <div className='h-auto overflow-hidden featured-div-1'>
        <div className='w-full h-full flex flex-col md:flex-row feature-inner-1 items-center featured-div-2'>
          <div className='w-2/4 flex flex-col gap-3 py-10 featured-div-2-1' data-aos='fade-right'>
            <h1 className='text-3xl tracking-wide text-main-dark'>{product?.title}</h1>
            <p className='text-sm mb-4 mt-3 text-main-dark'>
              {product?.description}
            </p>
            <div className='flex gap-3 featured-div-2-1-1'>
              <Link href={'/product/'+product?._id} className=''>
                <div className='border py-1 border-slate-600 px-3 text-center hover:border-slate-500 readmore-btn cursor-pointer'>
                  Read More
                </div>
              </Link>
              <div className=''>
                <div 
                className=' py-1 flex gap-2 bg-main px-3 text-center  addToCart-btn hover:bg-lime-500 text-white cursor-pointer'
                onClick={addFeaturedToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  Add to cart
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/4 h-full mt-10 flex justify-center featured-div-2-2' data-aos='fade-left'>
            <Image src={FeatureImage} alt="Product Image" width={0} height={0} className='feature-image object-cover' />
          </div>
        </div>
      </div>
    </Center>
  )
}
