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
  const [p1Index, setP1Index] = useState(0);
  const [p2Index, setP2Index] = useState(1);
  const [activePlayer, setActivePlayer] = useState(1);
  const containerRef = useRef(null);
  const playRef = useRef(null);
  const zonomoRef = useRef(null);
  const player1Ref = useRef(null);
  const player2Ref = useRef(null);
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
    if (activePlayer === 1 && player1Ref.current) {
      player1Ref.current.play().catch(e => console.log(e));
    } else if (activePlayer === 2 && player2Ref.current) {
      player2Ref.current.play().catch(e => console.log(e));
    }
  }, [activePlayer]);

  const handleMouseEnter = () => {
    gsap.to(charsRef.current, { y: "-100%", rotationX: 90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
  };

  const handleMouseLeave = () => {
    gsap.to(charsRef.current, { y: "0%", rotationX: 0, opacity: 1, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
    gsap.to(charsHoverRef.current, { y: "100%", rotationX: -90, opacity: 0, stagger: 0.04, duration: 0.5, ease: "power3.inOut" });
  };

  const handleVideoEnd = () => {
    if (activePlayer === 1) {
      setActivePlayer(2);
      setP1Index((p2Index + 1) % videos.length);
    } else {
      setActivePlayer(1);
      setP2Index((p1Index + 1) % videos.length);
    }
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
            ref={player1Ref}
            src={videos[p1Index]} 
            autoPlay={activePlayer === 1}
            muted 
            playsInline
            onEnded={activePlayer === 1 ? handleVideoEnd : undefined}
            className="background-video"
            style={{ 
              position: 'absolute', top: 0, left: 0, 
              opacity: activePlayer === 1 ? '' : 0, 
              transition: 'opacity 0.4s ease-in-out',
              zIndex: activePlayer === 1 ? 1 : 0
            }}
          />
          <video 
            ref={player2Ref}
            src={videos[p2Index]} 
            autoPlay={activePlayer === 2}
            muted 
            playsInline
            onEnded={activePlayer === 2 ? handleVideoEnd : undefined}
            className="background-video"
            style={{ 
              position: 'absolute', top: 0, left: 0, 
              opacity: activePlayer === 2 ? '' : 0, 
              transition: 'opacity 0.4s ease-in-out',
              zIndex: activePlayer === 2 ? 1 : 0
            }}
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
