import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MdPsychology, MdAnalytics, MdEco, MdAgriculture } from 'react-icons/md';

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
    <>
      <div className="landing-page">
        {/* Background Elements */}
        <div className="landing-bg-gradient" />
        <div className="landing-bg-pattern" />
        <div className="landing-floating-elements">
          <div className="floating-element element-1" />
          <div className="floating-element element-2" />
          <div className="floating-element element-3" />
        </div>

        {/* Main Content */}
        <div className="landing-container">
          {/* Left Content */}
          <div className="landing-content">
            <div className="landing-hero-card">
              <div className="hero-badge">
                <MdAgriculture className="badge-icon" />
                <span className="badge-text">Smart Farming</span>
              </div>
              
              <h1 className="landing-title">
                {t('FarmStack')}
              </h1>
              
              <h2 className="landing-slogan">
                {t('LSlogan')}
              </h2>
              
              <p className="landing-description">
                {t('LDesc')}
              </p>
              
              <div className="landing-cta">
                <button className="landing-btn-primary" onClick={Start}>
                  <span className="btn-text">{t('LButton')}</span>
                  <span className="btn-icon">→</span>
                </button>
                
                <div className="landing-features">
                  <div className="feature-item">
                    <MdPsychology className="feature-icon" />
                    <span className="feature-text">AI Powered</span>
                  </div>
                  <div className="feature-item">
                    <MdAnalytics className="feature-icon" />
                    <span className="feature-text">Data Driven</span>
                  </div>
                  <div className="feature-item">
                    <MdEco className="feature-icon" />
                    <span className="feature-text">Sustainable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="landing-visual">
            <div className="visual-container">
              <div className="visual-glow" />
              <img 
                src="slider-dec.gif" 
                alt="Smart Farming Animation" 
                className="landing-image"
              />
              <div className="visual-overlay" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .landing-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .landing-bg-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
          animation: gradientShift 8s ease-in-out infinite alternate;
        }

        @keyframes gradientShift {
          0% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.05); }
        }

        .landing-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px, 80px 80px;
          animation: patternMove 20s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .landing-floating-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
          backdrop-filter: blur(20px);
        }

        .element-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 10%;
          animation: float1 12s ease-in-out infinite;
        }

        .element-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 15%;
          animation: float2 10s ease-in-out infinite reverse;
        }

        .element-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation: float3 8s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-180deg); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.1); }
        }

        .landing-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(2rem, 5vw, 4rem);
          position: relative;
          z-index: 10;
        }

        .landing-content {
          padding-right: clamp(2rem, 5vw, 4rem);
        }

        .landing-hero-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: clamp(2.5rem, 6vw, 4rem);
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          position: relative;
        }

        .landing-hero-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
          border-radius: 32px;
          pointer-events: none;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 50px;
          padding: 0.75rem 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
        }

        .badge-text {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .landing-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .landing-slogan {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1.5rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .landing-description {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
          line-height: 1.6;
          max-width: 90%;
        }

        .landing-cta {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .landing-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
          align-self: flex-start;
        }

        .landing-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .landing-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(59, 130, 246, 0.4);
        }

        .landing-btn-primary:hover::before {
          opacity: 1;
        }

        .btn-icon {
          font-size: 1.25rem;
          transition: transform 0.3s;
        }

        .landing-btn-primary:hover .btn-icon {
          transform: translateX(4px);
        }

        .landing-features {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.75rem 1.25rem;
          backdrop-filter: blur(10px);
        }

        .feature-icon {
          font-size: 1.25rem;
          color: #3b82f6;
        }

        .feature-text {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .landing-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .visual-container {
          position: relative;
          width: 100%;
          max-width: 600px;
        }

        .visual-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }

        .landing-image {
          width: 100%;
          height: auto;
          border-radius: 24px;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
        }

        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          border-radius: 24px;
          z-index: 3;
          pointer-events: none;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .landing-container {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 3rem;
            padding: 2rem 1rem;
          }

          .landing-content {
            padding-right: 0;
            order: 2;
          }

          .landing-visual {
            order: 1;
          }

          .landing-hero-card {
            text-align: center;
          }

          .landing-btn-primary {
            align-self: center;
          }

          .landing-features {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .landing-container {
            padding: 1rem;
            gap: 2rem;
          }

          .landing-hero-card {
            padding: 2rem 1.5rem;
            border-radius: 24px;
          }

          .landing-features {
            flex-direction: column;
            align-items: center;
          }

          .feature-item {
            width: 100%;
            justify-content: center;
          }

          .hero-badge {
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .landing-hero-card {
            padding: 1.5rem 1rem;
          }

          .landing-btn-primary {
            padding: 1rem 2rem;
            font-size: 1rem;
          }

          .landing-description {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Landing;
