import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Center from './Center';

export default function HeroThree() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Play the video when it enters the viewport
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: 'top 80%', // When 80% of the video is in view
      end: 'bottom 20%', // Stop when the bottom of the video is near the bottom of the viewport
      onEnter: () => {
        videoRef.current.play();
      },
      onLeave: () => {
        videoRef.current.pause();
      },
    });
  }, []);

  return (
    <Center>
      <div className="h-screen max-h-[1257px] w-full video-container">
        <video
          ref={videoRef}
          width="600"
          muted
          className="video-element"
          preload="auto"
        >
          <source src="/Images/books1.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </Center>
  );
}
