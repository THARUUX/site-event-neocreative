import Link from 'next/link';
import React, { useRef, useEffect, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CartContext } from './CartContext';
import Center from './Center';
import LetterPullup from './magicui/letter-pullup';

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  const videoRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Play the video when it comes into view
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: 'top 80%', // Start when the top of the video is 80% down the viewport
      end: 'bottom 20%', // End when the bottom of the video is 20% up the viewport
      onEnter: () => {
        videoRef.current.play();
      },
    });
  }, []);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Center>
      <section className="z-[-1]">
        <div className="h-auto lg:h-auto pb-24 overflow-hidden featured-div-1">
          <div className="w-full h-full flex flex-col md:flex-row feature-inner-1 items-center featured-div-2">
            <div className="w-2/4 flex flex-col gap-3 pt-10 featured-div-2-1">
              <h1 className="text-3xl w-fit tracking-wide text-main-dark" data-aos="fade-left">
                <LetterPullup
                  className="text-3xl font-normal justify-start text-left tracking-wide text-main-dark"
                  words={"Diary 2025"}
                  delay={0.05}
                />
              </h1>
              <p
                id="feturedDesc"
                className="text-sm mb-4 text-main-dark"
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="2000"
              >
                Looking for the perfect corporate gift? Our fully customizable 2025 diaries are a sophisticated choice that combines style and functionality.
                <br />
                Select from three premium cover options: Standard Laminated Hardcover, Kraft Paper, or Leather in 33 rich colors.
                <br />
                Showcase your brand with custom Print, Foil, Deboss, or UV Print finishes for a lasting impression.
                <br />
                <br />
                For any bulk order inquiries, please feel free to contact us at 0768261165
              </p>
              <div className="flex gap-3 featured-div-2-1-1">
                <div className="">
                  <Link
                    href={"/Category/66d2e69e54f2b22a9fc18f4c"}
                    className="py-1 flex gap-2 bg-main px-3 text-center addToCart-btn hover:bg-lime-500 text-white cursor-pointer"
                    data-aos="fade"
                    data-aos-delay="1500"
                    data-aos-duration="3000"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="w-2/4 h-full flex justify-center featured-div-2-2"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <video
                ref={videoRef}
                width="500"
                muted
                className="video-element h-full w-full"
                preload="auto"
              >
                <source src="/Images/books1.webm" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
    </Center>
  );
}
