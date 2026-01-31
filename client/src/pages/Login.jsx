import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url';
import { MdAgriculture, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const handleSuccess = () =>
    toast.success('User Logged in Successfully');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${url}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message, token } = data;
      if (token) {
        Cookies.set('token', token);
      }
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/landing");
        }, 1000);
      } else {
        handleError(message);
        setIsLoading(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
      handleError(errorMessage);
      setIsLoading(false);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">
      {/* Left: Form */}
      <div className="auth-form-side">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <MdAgriculture />
            </div>
            <h1 className="auth-title">FarmStack</h1>
            <p className="auth-subtitle">Welcome back! Please login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                placeholder="name@example.com"
                className="auth-input"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  required
                  placeholder="Enter your password"
                  className="auth-input auth-input-password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="auth-submit"
            >
              {isLoading ? (
                <span className="auth-submit-loading">
                  <span className="auth-spinner" aria-hidden />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="auth-footer">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="auth-link">Create an account</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Decorative (no photos, no animation) */}
      <div className="auth-decor-side" aria-hidden>
        <div className="auth-decor-gradient" />
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }
        
        .auth-page {
          min-height: 100vh;
          display: flex;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .auth-form-side {
          flex: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 5vw, 3rem);
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          position: relative;
        }
        
        .auth-form-side::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .auth-decor-side {
          flex: 1;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%),
                      url('/LOGIN.png') center/cover no-repeat;
          background-blend-mode: overlay;
          position: relative;
          overflow: hidden;
        }
        
        .auth-decor-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 100%);
        }
        
        .auth-decor-side::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
        }
        
        .auth-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
          padding: clamp(2rem, 5vw, 3rem);
          position: relative;
          z-index: 1;
        }
        
        .auth-brand {
          margin-bottom: 2.5rem;
          text-align: center;
        }
        
        .auth-brand-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          position: relative;
        }
        
        .auth-brand-icon::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 22px;
          z-index: -1;
          opacity: 0.5;
          filter: blur(10px);
        }
        
        .auth-title {
          font-size: clamp(1.75rem, 4vw, 2rem);
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.025em;
        }
        
        .auth-subtitle {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .auth-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.025em;
        }
        
        .auth-input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem;
          font-size: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .auth-input::placeholder {
          color: #94a3b8;
        }
        
        .auth-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }
        
        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .auth-input-password {
          padding-right: 3rem;
        }
        
        .auth-password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          font-size: 1.25rem;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }
        
        .auth-password-toggle:hover {
          color: #374151;
          background: rgba(102, 126, 234, 0.1);
        }
        
        .auth-submit {
          width: 100%;
          height: 3.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .auth-submit::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .auth-submit:hover:not(:disabled)::before {
          left: 100%;
        }
        
        .auth-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        
        .auth-submit:disabled {
          cursor: not-allowed;
          opacity: 0.7;
          transform: none;
        }
        
        .auth-submit-loading {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .auth-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: auth-spin 0.8s linear infinite;
        }
        
        @keyframes auth-spin {
          to { transform: rotate(360deg); }
        }
        
        .auth-footer {
          font-size: 0.95rem;
          color: #64748b;
          margin: 1.5rem 0 0 0;
          text-align: center;
          line-height: 1.5;
        }
        
        .auth-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }
        
        .auth-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #667eea;
          transition: width 0.3s;
        }
        
        .auth-link:hover::after {
          width: 100%;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .auth-page { 
            flex-direction: column; 
          }
          .auth-form-side { 
            flex: none; 
            min-height: auto; 
            padding: 2rem 1rem; 
          }
          .auth-decor-side { 
            flex: none; 
            min-height: 40vh; 
            order: -1;
          }
        }
        
        @media (max-width: 640px) {
          .auth-form-side {
            padding: 1rem;
          }
          .auth-card {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }
          .auth-decor-side {
            min-height: 30vh;
          }
        }
        
        @media (max-width: 480px) {
          .auth-card {
            padding: 1.5rem 1rem;
          }
          .auth-input {
            height: 2.75rem;
            font-size: 0.95rem;
          }
          .auth-submit {
            height: 3rem;
          }
        }
      `}</style>
      <Toaster />
    </div>
  );
};

export default Login;
