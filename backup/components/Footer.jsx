import React from 'react'
import logo from '../public/neologo.png'
import Image from 'next/image'
import Link from 'next/link'
import Center from './Center'


export default function Footer() {
  return (
    <div className='w-full footer pb-10 flex flex-col  items-center bottom-0'>
        <div className='h-36  w-full'></div>
        <Center>
        <div className='w-full flex flex-col sm:flex-row justify-between items-end p-2 lg:p-2'>
            <div className='md:ml-10 lg:ml-10 ml-2 w-full sm:w-3/4'>
                <div className='flex items-center ml-2 gap-2 text-lime-600'>
                    NEO Creative
                </div>
                <div className='flex  items-center gap-4 mt-10'>
                    <div className='flex text-sm gap-2 ml-1 text-main'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        info@neo.lk
                    </div>
                    <div className='flex text-sm gap-2 ml-1 text-main'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        +94 112 820 220
                    </div>
                </div>
                <div className='flex text-sm gap-2 mt-3 ml-1 text-main'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
                No.44, Udahamulla Station Road, Nugegoda, 10250, Sri Lanka.
                </div>
            </div>
                <div className='sm:text-end text-center px-10 h-full w-full text-xs md:text-sm lg:text-sm mt-3 md:mt-0 lg:mt-0  text-lime-700'>
                Copyright © 2024 Neo Creative
                </div>
        </div>
        </Center>
    </div>
  )
}
