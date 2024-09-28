import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import imageTwo from '@/public/Images/imageTwo.png';
import imageThree from '@/public/Images/image_3.jpg';
import imageFour from '@/public/Images/image_2.jpg';
import { useGSAP } from '@gsap/react';
import Center from './Center';
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const pinnedImageRef = useRef(null);
  const scrollImagesRef = useRef(null);
  const scrollTextRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const pinnedImage = pinnedImageRef.current;
    const scrollImages = scrollImagesRef.current.children;
    const scrollText = scrollTextRef.current;

    // Pin the main image
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedImage,
      pinSpacing: false,
    });

    // Animate the scrolling images
    gsap.to(scrollImages, {
      yPercent: -50 * (scrollImages.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollImagesRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 1,
      },
    });
    gsap.to(scrollText, {
      yPercent: 100 * (scrollText.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: scrollTextRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Fade in and scale effect for scrolling images
    Array.from(scrollImages).forEach((img, index) => {
      gsap.fromTo(img, 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: img,
            start: "top bottom-=100",
            end: "center center",
            scrub: true,
          }
        }
      );
    });
    Array.from(scrollText).forEach((text, index) => {
      gsap.fromTo(text, 
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: text,
            start: "top bottom-=100",
            end: "center center",
            scrub: true,
          }
        }
      );
    });

  }, []);

  return (
    <Center>
      <div ref={containerRef} className="relative  w-full h-[1257px] overflow-visible">
      <DotPattern
        className={`${cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
        )} relative h-full w-full`}
      />
        <div ref={scrollImagesRef} className="absolute w-full top-0 h-[100%] flex flex-col items-stretch justify-center gap-[10%] py-[0vh]">
          <div className="z-10 flex justify-around gap-5 h-screen lg:h-auto items-center w-full">
            <Image className="w-[40%] sm:w-[20%] rounded-lg shadow-xl" src={imageThree} alt="Scrolling image 1" width={500} height={500} />
            <div ref={scrollTextRef} className="text-2xl sm:text-4xl text-main-dark">2 Colour special print</div>
          </div>
          <div className="z-10 flex justify-around gap-5 h-screen lg:h-auto items-center w-full">
            <div ref={scrollTextRef} className="text-3xl sm:text-5xl w-1/3 text-main-dark text-start">80GSM Cream coloured premium paper</div>
            <Image className="w-[40%] sm:w-[20%] rounded-lg shadow-xl" src={imageFour} alt="Scrolling image 2" width={500} height={500} />
          </div>
          <div className="z-10 flex justify-around gap-5 h-screen lg:h-auto items-center w-full">
            <Image className="w-[40%] sm:w-[20%] rounded-lg shadow-xl" src={imageThree} alt="Scrolling image 3" width={500} height={500} />
            <div ref={scrollTextRef} className="text-4xl sm:text-6xl w-1/3 text-main-dark">Rs.650 +</div>
          </div>
        </div>
        {/*<div ref={scrollTextRef} className="absolute w-full top-0 h-[100%] flex flex-col items-end justify-around gap-[40%] py-[10%]">
          <div className="z-0 flex justify-start sm:justify-center w-full font-bold tracking-widest">
            <div className="text-2xl sm:text-4xl w-1/2 sm:w-1/2 text-main-dark">2 Colour special print</div>
          </div>
          <div className="z-0 flex justify-end w-full font-bold tracking-widest">
            <div className="text-3xl sm:text-5xl w-2/3 sm:w-1/2 text-main-dark text-end">80GSM Cream coloured premium paper</div>
          </div>
          <div className="z-0 flex justify-start w-full font-bold tracking-widest">
            <div className="text-4xl sm:text-6xl w-1/2 sm:w-1/2 text-main-dark">Rs.650 +</div>
          </div>
        </div>*/}
      </div>
      </Center>
  );
}