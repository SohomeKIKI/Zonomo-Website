import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

import imgRepair from '../assets/images/zonomo_repair.jpg';
import imgCleaning from '../assets/images/zonomo_cleaning.jpg';
import imgBeauty from '../assets/images/zonomo_beauty.jpg';
import imgCare from '../assets/images/zonomo_care.jpg';
import imgPet from '../assets/images/zonomo_pet.jpg';
import imgMoving from '../assets/images/zonomo_moving.jpg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: '01', title: 'Home Repair', category: 'Maintenance', img: imgRepair, sub: ['Electrician', 'Plumber'] },
  { id: '02', title: 'Cleaning', category: 'Deep Clean', img: imgCleaning, sub: ['Home Cleaning', 'Bathroom Cleaning'] },
  { id: '03', title: 'Beauty & Wellness', category: 'At Home', img: imgBeauty, sub: ['Salon at Home', 'Physiotherapy'] },
  { id: '04', title: 'Care Services', category: 'Professional', img: imgCare, sub: ['Babysitter', 'Elder Care'] },
  { id: '05', title: 'Pet Care', category: 'Grooming', img: imgPet, sub: ['Dog Walking', 'Pet Grooming'] },
  { id: '06', title: 'Moving & Logistics', category: 'Packers', img: imgMoving, sub: ['Packers & Movers'] },
];

const Work = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-section" id="work" ref={containerRef}>
      <div className="work-header">
        <h2 className="section-title">Services</h2>
        <p className="work-desc">
          Verified professionals. Exceptional service. We connect you with experts to handle your everyday needs with precision and care.
        </p>
      </div>

      <div className="work-list">
        {services.map((service, index) => (
          <div 
            className="work-item" 
            key={service.id}
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <div className="work-item-index">{service.id}</div>
            <div className="work-item-content">
              <div className="work-item-services">
                {service.sub.map((s, i) => <div key={i}>{s}</div>)}
              </div>
              <div className="work-item-title-wrapper">
                <h3 className="work-item-title">{service.title}</h3>
                <span className="work-item-category">{service.category}</span>
              </div>
            </div>
            <div className="work-item-image-wrapper">
              <img src={service.img} alt={service.title} className="work-item-image" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Work;
