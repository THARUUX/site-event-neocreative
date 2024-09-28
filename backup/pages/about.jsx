import BackButton from '@/components/BackButton'
import Center from '@/components/Center'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from 'next/image'
import React from 'react'
import logo from '../public/neologo.png'

export default function about() {
  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center'>
        <BackButton />
        <Header />
        <Center className="border border-black">
            <div className='p-24 min-h-screen'>
                <div className='w-full flex justify-center p-10' data-aos="fade">
                    <Image src={logo} alt='neo logo'  width={200}/>
                </div>
                <div data-aos="fade-right" className='w-full justify-center flex'>
                Neo gives you the promise of the best Quality to Price ratio in the Sri Lankan print industry.
                </div>
            </div>
        </Center>
        <Footer/>
    </div>
  )
}
