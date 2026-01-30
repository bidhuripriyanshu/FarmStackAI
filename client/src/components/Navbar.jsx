import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { MdExitToApp, MdMenu, MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import '../util/config';
import url from '../url';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logout = () => {
    removeCookie("token");
    removeCookie("language");
    window.config.resetId();
    window.config.resetName();
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('language');
    Cookies.remove('username');
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand" onClick={() => handleNavClick('/landing')}>
            <div className="brand-icon">
              <span>🌾</span>
            </div>
            <span className="brand-text">{t('Title')}</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-menu desktop-menu">
            <a className="nav-link" onClick={() => handleNavClick('/')}>
              <span className="nav-icon">🏠</span>
              {t('NHome')}
            </a>
            <a className="nav-link" onClick={() => handleNavClick('/update')}>
              <span className="nav-icon">🔄</span>
              {t('NUpdate')}
            </a>
            <a className="nav-link" onClick={() => handleNavClick('/forum')}>
              <span className="nav-icon">💬</span>
              {t('NForum')}
            </a>
            <a className="nav-link" onClick={() => handleNavClick('/posts')}>
              <span className="nav-icon">📝</span>
              {t('Posts')}
            </a>
          </div>

          {/* Desktop Logout Button */}
          <button className="logout-btn desktop-logout" onClick={Logout}>
            <MdExitToApp className="logout-icon" />
            <span>{t('NLogout')}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <a className="mobile-nav-link" onClick={() => handleNavClick('/')}>
              <span className="nav-icon">🏠</span>
              {t('NHome')}
            </a>
            <a className="mobile-nav-link" onClick={() => handleNavClick('/update')}>
              <span className="nav-icon">🔄</span>
              {t('NUpdate')}
            </a>
            <a className="mobile-nav-link" onClick={() => handleNavClick('/forum')}>
              <span className="nav-icon">💬</span>
              {t('NForum')}
            </a>
            <a className="mobile-nav-link" onClick={() => handleNavClick('/posts')}>
              <span className="nav-icon">📝</span>
              {t('Posts')}
            </a>
            <button className="logout-btn mobile-logout" onClick={Logout}>
              <MdExitToApp className="logout-icon" />
              <span>{t('NLogout')}</span>
            </button>
          </div>
        </div>
      </nav>

      <style>{`
        .modern-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(15, 15, 35, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .modern-navbar.scrolled {
          background: rgba(15, 15, 35, 0.98);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem clamp(1rem, 5vw, 2rem);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .navbar-brand:hover {
          transform: translateY(-1px);
        }

        .brand-icon {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .desktop-menu {
          display: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .nav-link:hover {
          color: white;
          transform: translateY(-1px);
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-icon {
          font-size: 1.1rem;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
        }

        .logout-icon {
          font-size: 1.1rem;
        }

        .desktop-logout {
          display: none;
        }

        .mobile-menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .mobile-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(15, 15, 35, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .mobile-nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-logout {
          margin-top: 1rem;
          justify-content: center;
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
          }

          .desktop-logout {
            display: flex;
          }

          .mobile-menu-toggle {
            display: none;
          }

          .mobile-menu {
            display: none;
          }
        }

        /* Large Desktop */
        @media (min-width: 1200px) {
          .navbar-menu {
            gap: 2.5rem;
          }

          .nav-link {
            padding: 0.875rem 1.25rem;
          }
        }

        /* Tablet */
        @media (max-width: 767px) and (min-width: 481px) {
          .navbar-container {
            padding: 0.875rem 1.5rem;
          }

          .brand-text {
            font-size: 1.25rem;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .navbar-container {
            padding: 0.75rem 1rem;
          }

          .brand-icon {
            width: 2rem;
            height: 2rem;
            font-size: 1rem;
          }

          .brand-text {
            font-size: 1.1rem;
          }

          .mobile-menu-content {
            padding: 1rem;
          }

          .mobile-nav-link {
            padding: 0.875rem;
            font-size: 0.95rem;
          }
        }

        /* Add padding to body to account for fixed navbar */
        body {
          padding-top: 80px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
