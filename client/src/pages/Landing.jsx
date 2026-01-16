import React, { useState, useEffect } from 'react';
import "../assets/Button.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Start = () => {
    navigate("/update");
  };

  return (
    <div style={{
      backgroundColor: "#c9d4f8",
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: isMobile ? '40px 20px' : '0 50px',
      position: 'relative',
    }}>
      <div style={{
        height: isMobile ? 'auto' : '100vh',
        marginTop: isMobile ? '20px' : '40px',
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '100%' : '50%',
      }}>
        <div style={{
          backgroundImage: 'url(blob.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: isMobile ? '40px 30px' : '100px',
          borderRadius: '20px',
          width: '100%',
        }}>
          <h1 style={{
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(3rem, 5vw, 5em)',
            marginBottom: '10px',
            color: '#fff',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {t('Title')}
          </h1>
          <h2 style={{
            fontSize: isMobile ? 'clamp(1.2rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 3vw, 2em)',
            marginBottom: '20px',
            color: '#fff',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {t('LSlogan')}
          </h2>
          <p style={{
            fontSize: isMobile ? 'clamp(0.9rem, 2.5vw, 1rem)' : 'clamp(1rem, 1.5vw, 1.2em)',
            marginBottom: '30px',
            maxWidth: '100%',
            color: '#fff',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {t('LDesc')}
          </p>
          <button 
            className="btnu-hover color-2" 
            style={{
              padding: isMobile ? '12px 24px' : '10px 20px',
              fontSize: isMobile ? '1rem' : '1em',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'block',
              margin: isMobile ? '0 auto' : '0',
            }} 
            onClick={Start}
          >
            {t('LButton')}
          </button>
        </div>
      </div>
      <div style={{
        width: isMobile ? '100%' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: isMobile ? '20px' : '0',
      }}>
        <img 
          src="slider-dec.gif" 
          alt="Crop" 
          style={{
            marginTop: isMobile ? '0' : '-60px',
            width: isMobile ? '100%' : '500px',
            maxWidth: isMobile ? '300px' : '500px',
            height: 'auto',
          }} 
        />
      </div>
    </div>
  );
};

export default Landing;
