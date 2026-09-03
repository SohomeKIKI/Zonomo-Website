import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const playRef = useRef(null);
  const zonomoRef = useRef(null);
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
        [playRef.current, textRef.current],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.5 }
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

  const handleMouseEnter = () => {
    gsap.to(charsRef.current, { y: "-100%", rotationX: 90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
  };

  const handleMouseLeave = () => {
    gsap.to(charsRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "100%", rotationX: -90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
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
            src="https://www.w3schools.com/html/mov_bbb.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="background-video"
          />
        </div>
        <div className="hero-center">
          <button className="play-button" ref={playRef}>
            <div className="play-icon-wrapper">
              <Play fill="currentColor" size={24} />
            </div>
          </button>
          <div className="hero-text-wrapper" ref={textRef}>
            <h2 className="hero-text">Watch Showreel</h2>
            <p className="hero-subtext">2015-26</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
