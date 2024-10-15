import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Center from './Center';
import Image from 'next/image';
import imageFive from '../public/Images/image_5.jpg'
import imageSix from '../public/Images/image_6.jpg'
import imageTwo from '../public/Images/image_2.jpg'
import BlurIn from './ui/blur-in';
import BoxReveal from './magicui/box-reveal';

export default function HeroThree() {

  return (
    <Center>
      <div className=" rounded-2xl shadow-xl w-full video-container">
        <div  className=" w-[7vw] sm:w-24 absolute translate-x-[200%] translate-y-[170%] sm:translate-y-[70%] h-[7vw] sm:h-24 bg-lime-500 rounded-full opacity-50"></div>
        <div  className="w-[11vw] sm:w-40 absolute translate-x-[500%] sm:translate-x-[600%] translate-y-[1250%] sm:translate-y-[150%]  h-[11vw] sm:h-40 bg-lime-500 rounded-full opacity-70"></div>
        <div className="w-[30vw] sm:w-64 absolute translate-x-[60%] sm:translate-x-[100%] translate-y-[780%] sm:translate-y-[180%] h-[30vw] sm:h-64 bg-lime-500 rounded-full opacity-50"></div>
        <div className="h-full w-full rounded-2xl backdrop-blur-lg bg-slate-10 py-10 px-10">
          <div className="w-full text-4xl sm:text-6xl text-center font-mono font-bold text-main-dark" data-aos='fade-in-up'>About the <span className="text-7xl sm:text-9xl relative bottom-0">, </span></div>
          <hr className="mt-10 border-2 border-white/50" />
          <div className="flex flex-col gap-10 my-10 sm:px-10">
            <div className="flex gap-5 flex-col" data-aos='fade-in'>
              <div className=" text-2xl sm:text-3xl font-medium"><BlurIn word='Leather Diaries'/></div>
              <div className="flex gap-64 justify-around">
                <div className="tracking-wide"><BlurIn word="Our premium leather diaries offer a luxurious feel and sophisticated look, perfect for professionals or as a timeless gift. Choose from 33 color options and personalize with Foil, Deboss, or UV Print. Crafted with high-quality 80gsm cream-colored paper and a durable leather cover, these diaries are built to last." /></div>
              </div>
            </div>
            <div className="flex gap-5 flex-col" data-aos='fade-in'>
              <div className="text-2xl sm:text-3xl font-medium"><BlurIn word="Hardcover Diaries" /></div>
              <div className="flex gap-64 justify-around">
                <div className="tracking-wide"><BlurIn word="These elegant hardcover diaries combine durability and style. Featuring a laminated finish and customizable cover designs, they&apos;re perfect for daily planning or corporate use. Inside, you&apos;ll find premium 80gsm paper with customizable pages to suit your needs." /></div>
              </div>
            </div>
            <div className="flex gap-5 flex-col" data-aos='fade-in'>
              <div className="text-2xl sm:text-3xl font-medium"><BlurIn word="Kraft Paper Diaries" /></div>
              <div className="flex gap-64 justify-around">
                <div className="tracking-wide"><BlurIn  word="Our eco-friendly kraft paper diaries are stylish and sustainable. The natural kraft paper cover can be customized with white print, making them ideal for those who prefer a minimalist yet unique design. These diaries feature 80gsm cream-colored paper and offer a lightweight, eco-conscious option." /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-24">
          <div className="text-3xl sm:text-5xl text-main-dark flex flex-col gap-2">
            <BoxReveal boxColor={"#6dd900"} duration={0.7}>
              <div>
                For any bulk order inquiries, 
              </div>
            </BoxReveal>
            <BoxReveal boxColor={"#6dd900"} duration={0.7}>
              <div>
                please feel free to contact us at
              </div>
            </BoxReveal>
              <div className="flex justify-end">
                <BoxReveal boxColor={"#6dd900"} duration={0.7}>
                  <div className="text-main">
                    94768261165
                  </div>
                </BoxReveal>
              </div>
          </div>
      </div>
    </Center>
  );
}
