import React from 'react'
import { useRouter } from 'next/router';


export default function Loading() {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen loader' data-aos="fade">
        <div className='w-full h-full flex justify-center items-center'>
            <div class="spinner">
                <div></div>   
                <div></div>    
                <div></div>    
                <div></div>    
            </div>
        </div>
    </div>
  )
}
