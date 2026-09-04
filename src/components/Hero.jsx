import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import './Hero.css';

import vid1 from '../assets/videos/1.mp4';
import vid2 from '../assets/videos/2.mp4';
import vid3 from '../assets/videos/3.mp4';
import vid4 from '../assets/videos/4.mp4';

const videos = [vid1, vid2, vid3, vid4];

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef(null);
  const playRef = useRef(null);
  const zonomoRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const charsRef = useRef([]);
  const charsHoverRef = useRef([]);
  const videoSectionRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const word = "ZONOMO";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        zonomoRef.current,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(
        playRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );

      // Video Expand Animation
      gsap.fromTo(
        videoWrapperRef.current,
        {
          scale: 0.2,
          borderRadius: "50%",
        },
        {
          scale: 1,
          borderRadius: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: videoSectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.play().catch(e => console.log(e));
    }
  }, [currentVideoIndex]);

  const handleMouseEnter = () => {
    gsap.to(charsRef.current, { y: "-100%", rotationX: 90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
  };

  const handleMouseLeave = () => {
    gsap.to(charsRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "100%", rotationX: -90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
  };

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="hero-wrapper" ref={containerRef}>
      <section className="hero">
        <div className="hero-giant-text-wrapper">
          <h1 
            className="hero-giant-text" 
            ref={zonomoRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {word.split('').map((char, i) => (
              <span key={i} className="char-wrapper">
                <span className="char" ref={el => charsRef.current[i] = el}>
                  {char}
                </span>
                <span className="char char-hover" ref={el => charsHoverRef.current[i] = el}>
                  {char}
                </span>
              </span>
            ))}
          </h1>
        </div>
      </section>
      
      <section className="video-section" ref={videoSectionRef}>
        <div className="video-expand-wrapper" ref={videoWrapperRef}>
          <video 
            ref={videoPlayerRef}
            src={videos[currentVideoIndex]} 
            autoPlay 
            muted 
            playsInline
            onEnded={handleVideoEnd}
            className="background-video"
          />
        </div>
        <div className="hero-center">
          <button className="play-button" ref={playRef}>
            <div className="play-icon-wrapper">
              <Play fill="currentColor" size={24} />
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
