import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Studio.css';

gsap.registerPlugin(ScrollTrigger);

const tickerItems = [
  "🟢 Deep Cleaning booked in Gurgaon — 2 mins ago",
  "🟢 AC Repair booked in Noida — 5 mins ago",
  "🟢 Salon at Home booked in South Delhi — 12 mins ago",
  "🟢 Plumber dispatched to Vasant Kunj — 15 mins ago",
  "🟢 Packers & Movers booked in Gurgaon — 22 mins ago"
];

// ZONOMO Testimonial Data
const reviews = [
  {
    name: "Rohan K.",
    username: "@rohan_delhi",
    body: "“The deep cleaning service was incredible. The team was professional, on time, and my apartment has never looked better.”",
    profile: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    name: "Sneha M.",
    username: "@sneha_gurgaon",
    body: "“Finally, a reliable platform for home repairs. The electrician knew exactly what he was doing and pricing was transparent upfront.”",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    name: "Amit V.",
    username: "@amit_noida",
    body: "“Booked packers and movers through ZONOMO. They handled everything with care. Zero stress move, highly recommended!”",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    name: "Priya S.",
    username: "@priyas_88",
    body: "“Salon at home was a game changer for me. The beautician was so polite and the hygiene standards were top-notch.”",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    name: "Vikram R.",
    username: "@vik_tech",
    body: "“Had an emergency plumbing issue at 9 PM. ZONOMO got someone there in 30 minutes. Absolute lifesavers.”",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&q=80",
  },
  {
    name: "Neha G.",
    username: "@neha_g",
    body: "“The pet grooming service is fantastic. My golden retriever usually hates baths, but the groomer was so gentle with him.”",
    profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces&q=80",
  }
];

const firstRow = reviews.slice(0, 3);
const secondRow = reviews.slice(3, 6);

const ReviewCard = ({ profile, name, username, body }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <img className="review-avatar" src={profile} alt={name} />
        <div className="review-info">
          <p className="review-name">{name}</p>
          <p className="review-username">{username}</p>
        </div>
      </div>
      <p className="review-body">{body}</p>
    </div>
  );
};

const Studio = () => {
  const containerRef = useRef(null);
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Testimonial Marquees
      if (marquee1Ref.current && marquee2Ref.current) {
        // Marquee 1: Left to Right
        const tween1 = gsap.to(marquee1Ref.current, {
          xPercent: -50,
          ease: "none",
          duration: 35,
          repeat: -1
        });
        
        // Marquee 2: Right to Left
        gsap.set(marquee2Ref.current, { xPercent: -50 });
        const tween2 = gsap.to(marquee2Ref.current, {
          xPercent: 0,
          ease: "none",
          duration: 35,
          repeat: -1
        });

        // Pause on hover
        const handleEnter1 = () => tween1.pause();
        const handleLeave1 = () => tween1.play();
        const handleEnter2 = () => tween2.pause();
        const handleLeave2 = () => tween2.play();

        marquee1Ref.current.addEventListener('mouseenter', handleEnter1);
        marquee1Ref.current.addEventListener('mouseleave', handleLeave1);
        marquee2Ref.current.addEventListener('mouseenter', handleEnter2);
        marquee2Ref.current.addEventListener('mouseleave', handleLeave2);

        // Cleanup hover listeners is handled by ctx.revert() cleaning up DOM nodes, 
        // but it's good practice to explicitly remove them if component unmounts.
        return () => {
          if (marquee1Ref.current) {
            marquee1Ref.current.removeEventListener('mouseenter', handleEnter1);
            marquee1Ref.current.removeEventListener('mouseleave', handleLeave1);
          }
          if (marquee2Ref.current) {
            marquee2Ref.current.removeEventListener('mouseenter', handleEnter2);
            marquee2Ref.current.removeEventListener('mouseleave', handleLeave2);
          }
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="studio-section" id="platform" ref={containerRef}>
      <div className="studio-header">
        <h2 className="section-title">PLATFORM</h2>
        <div className="studio-header-content">
          <p className="studio-desc">
            Redefining home services in India. No more haggling, no more unreliable contractors. Just verified professionals, transparent pricing, and exceptional quality delivered right to your doorstep.
          </p>
          
          <div className="app-buttons">
            <a href="#" className="app-btn">
              <svg viewBox="0 0 512 512" width="28" height="28" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div className="btn-text">
                <span className="btn-small">GET IT ON</span>
                <span className="btn-large">Google Play</span>
              </div>
            </a>
            <a href="#" className="app-btn">
              <svg viewBox="0 0 384 512" width="28" height="28" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div className="btn-text">
                <span className="btn-small">Download on the</span>
                <span className="btn-large">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="reviews-container">
        <div className="reviews-fade-left"></div>
        <div className="reviews-fade-right"></div>
        
        <div className="marquee-wrapper">
          <div className="marquee-track" ref={marquee1Ref}>
            {[...firstRow, ...firstRow].map((review, i) => (
              <ReviewCard key={`row1-${i}`} {...review} />
            ))}
          </div>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-track" ref={marquee2Ref}>
            {[...secondRow, ...secondRow].map((review, i) => (
              <ReviewCard key={`row2-${i}`} {...review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
