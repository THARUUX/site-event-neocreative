import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Import ScrollTrigger
import Image from 'next/image';
import imageOne from '@/public/Images/imageOne.png';
import TextReveal from "@/components/magicui/text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function HeroTwo() {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const el = imgRef.current;
      const text = textRef.current;
      const text2 = textRef2.current;
      const text3 = textRef3.current;

      // Animate the image width
      gsap.to(el, {
        width: "70%",
        height: "70%",
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top bottom", // Start animation when the image reaches the center of the viewport
          end: "bottom center", // End animation at the bottom center of the viewport
          scrub: true,
        },
      });
      gsap.to(text, {
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top center", // Start animation when the image reaches the center of the viewport
          end: "bottom center", // End animation at the bottom center of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      });
      gsap.to(text2, {
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top center", // Start animation when the image reaches the center of the viewport
          end: "bottom+=40 center", // End animation at the bottom center of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      });
      gsap.to(text3, {
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "center center", // Start animation when the image reaches the center of the viewport
          end: "bottom center", // End animation at the bottom center of the viewport
          scrub: true, // Smooth scrubbing effect
        },
      });
    }
  }, []);

  return (
    <div className="sm:hidden lg:flex scroll-container overflow-auto m-0 p-0 flex-col items-center flex justify-center max-w-screen-2xl w-screen max-h-[1536px]">
        <div className="m-0 p-0">
            <div className="scroll-text relative sm:top-24 text-3xl sm:text-5xl opacity-0 w-full text-start sm:px-24 font-bold tracking-wider" ref={textRef}>
                Customizable Pages
            </div>
            <div className="scroll-text relative sm:text-3xl opacity-0 w-full text-start sm:px-24 font-bold tracking-wider" ref={textRef2}>
                Change colour or add your own design
            </div>
        </div>
      <div className="scroll-image w-[full] h-[full]" ref={imgRef}>
        <Image className="w-[200%] h-full object-cover drop-shadow-2xl" src={imageOne} alt="alt" width={0} height={0} />
      </div>
      <div className="scroll-text sm:right-32 relative text-main-dark sm:top-[-6rem] text-2xl opacity-0 w-full text-end px-24 font-bold tracking-wider" ref={textRef3}>
        Customizable Inner Pages
      </div>
    </div>
  );
}
