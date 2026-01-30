import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn, 
  MdFacebook, 
  MdTwitter, 
  MdLinkedIn, 
  MdInstagram,
  MdArrowUpward
} from 'react-icons/md';

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <>
      <footer className="modern-footer">
        {/* Background Elements */}
        <div className="footer-bg-gradient" />
        <div className="footer-bg-pattern" />
        
        {/* Main Footer Content */}
        <div className="footer-container">
          {/* Top Section */}
          <div className="footer-top">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span>🌾</span>
                </div>
                <span className="logo-text">{t('Title') || 'FarmStack'}</span>
              </div>
              <p className="footer-description">
                Empowering farmers with AI-driven insights and sustainable farming solutions. 
                Join the future of agriculture with smart technology and data-driven decisions.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <MdFacebook />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <MdTwitter />
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <MdLinkedIn />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <MdInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="section-title">Quick Links</h3>
              <ul className="footer-links">
                <li>
                  <a onClick={() => handleNavigation('/')} className="footer-link">
                    {t('NHome') || 'Home'}
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/update')} className="footer-link">
                    {t('NUpdate') || 'Crop Recommendation'}
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/forum')} className="footer-link">
                    {t('NForum') || 'Community Forum'}
                  </a>
                </li>
                <li>
                  <a onClick={() => handleNavigation('/posts')} className="footer-link">
                    {t('Posts') || 'Posts'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="section-title">Our Services</h3>
              <ul className="footer-links">
                <li><a href="#" className="footer-link">Crop Analysis</a></li>
                <li><a href="#" className="footer-link">Weather Forecasting</a></li>
                <li><a href="#" className="footer-link">Soil Testing</a></li>
                <li><a href="#" className="footer-link">Market Insights</a></li>
                <li><a href="#" className="footer-link">Expert Consultation</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="section-title">Get in Touch</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <MdEmail className="contact-icon" />
                  <span>support@farmstack.com</span>
                </div>
                <div className="contact-item">
                  <MdPhone className="contact-icon" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <MdLocationOn className="contact-icon" />
                  <span>123 Agriculture St, Farm City, FC 12345</span>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="newsletter">
                <h4 className="newsletter-title">Stay Updated</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="copyright">
                © 2024 FarmStack. All rights reserved. Built with ❤️ for farmers worldwide.
              </p>
              <div className="footer-bottom-links">
                <a href="#" className="bottom-link">Privacy Policy</a>
                <a href="#" className="bottom-link">Terms of Service</a>
                <a href="#" className="bottom-link">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <MdArrowUpward />
        </button>
      </footer>

      <style>{`
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          color: white;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }

        .footer-bg-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          animation: gradientShift 8s ease-in-out infinite alternate;
        }

        @keyframes gradientShift {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .footer-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: patternMove 30s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 5vw, 2rem);
          position: relative;
          z-index: 10;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: clamp(2rem, 5vw, 4rem);
          padding: clamp(3rem, 8vw, 5rem) 0 clamp(2rem, 5vw, 3rem) 0;
        }

        .footer-brand {
          max-width: 400px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-link:hover {
          background: rgba(59, 130, 246, 0.2);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: white;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 2rem;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border-radius: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s;
          cursor: pointer;
          padding: 0.25rem 0;
          position: relative;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background: #3b82f6;
          transition: width 0.3s;
        }

        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-link:hover::before {
          width: 100%;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .contact-icon {
          font-size: 1.25rem;
          color: #3b82f6;
        }

        .newsletter {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .newsletter-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.3s;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .newsletter-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin: 0;
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }

        .bottom-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }

        .bottom-link:hover {
          color: white;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
          z-index: 1000;
        }

        .scroll-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }

          .footer-brand {
            grid-column: 1 / -1;
            max-width: none;
          }
        }

        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-bottom-links {
            justify-content: center;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-bottom-links {
            flex-direction: column;
            gap: 1rem;
          }

          .social-links {
            justify-content: center;
          }

          .contact-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;