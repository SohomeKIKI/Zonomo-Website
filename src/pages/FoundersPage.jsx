import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './FoundersPage.css';

const FoundersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navigation />
      <main className="founders-page">
        <div className="founders-header">
          <h1 className="founders-title">MEET THE FOUNDERS</h1>
          <p className="founders-subtitle">The visionaries behind ZONOMO.</p>
        </div>
        
        <div className="founders-grid">
          <div className="founder-card">
            <div className="founder-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" 
                alt="Founder 1" 
                className="founder-img" 
              />
            </div>
            <div className="founder-info">
              <h2 className="founder-name">JOHN DOE</h2>
              <h3 className="founder-role">CO-FOUNDER & CEO</h3>
              <p className="founder-bio">
                John brings over a decade of experience in building high-growth consumer technology companies. He started ZONOMO with a simple mission: to organize the highly fragmented home services market in India and deliver unparalleled quality and trust to everyday consumers.
              </p>
            </div>
          </div>
          
          <div className="founder-card">
            <div className="founder-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                alt="Founder 2" 
                className="founder-img" 
              />
            </div>
            <div className="founder-info">
              <h2 className="founder-name">JANE SMITH</h2>
              <h3 className="founder-role">CO-FOUNDER & COO</h3>
              <p className="founder-bio">
                With a background in operations and logistics at scale, Jane is the architect behind ZONOMO's lightning-fast service delivery and stringent professional verification processes. She ensures that every service booked is executed flawlessly.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FoundersPage;
