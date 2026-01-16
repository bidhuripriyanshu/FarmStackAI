import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import url from '../url';
import bgImage1 from "../assets/image1.png";
import bgImage2 from "../assets/image2.png";
import bgImage3 from "../assets/image3.png";
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = inputValue;

  // Image paths with proper encoding
// const bgImage1 = '/image1.png';
// const bgImage2 = '/image2.png';
// const bgImage3 = '/image3.png';
  
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

  const handleSuccess = (msg) =>
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
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Animated Background Images with Parallax */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}>
        {/* Background Image Layer 1 */}
<div
  className="bg-image-layer-1"
  style={{
    position: "absolute",
    width: "120%",
    height: "120%",
    top: "-10%",
    left: "-10%",
    backgroundImage: `url(${bgImage1})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.3,
    animation: "parallaxSlow 20s ease-in-out infinite",
    filter: "blur(2px) brightness(0.4)",
  }}
/>

{/* Background Image Layer 2 */}
<div
  className="bg-image-layer-2"
  style={{
    position: "absolute",
    width: "110%",
    height: "110%",
    top: "-5%",
    right: "-5%",
    backgroundImage: `url(${bgImage2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.25,
    animation: "parallaxMedium 25s ease-in-out infinite",
    filter: "blur(3px) brightness(0.3)",
  }}
/>

{/* Background Image Layer 3 */}
<div
  className="bg-image-layer-3"
  style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundImage: `url(${bgImage3})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.2,
    animation: "parallaxFast 15s ease-in-out infinite",
    filter: "blur(1px) brightness(0.35)",
  }}
/>

        {/* Gradient Overlay for better text readability */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%)",
          zIndex: 1
        }}></div>

        {/* Floating Particles */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 2
        }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${20 + i * 10}px`,
                height: `${20 + i * 10}px`,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${6 + i * 2}s ease-in-out infinite ${i * 0.5}s`,
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)"
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg); 
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-60px) translateX(-20px) rotate(180deg); 
            opacity: 0.4;
          }
          75% { 
            transform: translateY(-30px) translateX(10px) rotate(270deg); 
            opacity: 0.5;
          }
        }
        @keyframes parallaxSlow {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          50% { 
            transform: translate(-20px, -20px) scale(1.05);
          }
        }
        @keyframes parallaxMedium {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          50% { 
            transform: translate(30px, 30px) scale(1.08);
          }
        }
        @keyframes parallaxFast {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
          }
          50% { 
            transform: translate(-15px, 15px) scale(1.03);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .login-form-container {
          animation: slideIn 0.6s ease-out;
        }
        @media (max-width: 768px) {
          .bg-image-layer-1,
          .bg-image-layer-2,
          .bg-image-layer-3 {
            filter: blur(3px) brightness(0.2) !important;
          }
        }
      `}</style>

      <div className="login-form-container" style={{
        width: "100%",
        maxWidth: "450px",
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        borderRadius: "32px",
        padding: "3rem 2.5rem",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        position: "relative",
        zIndex: 1
      }}>
        {/* Logo/Brand Section */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 1.5rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
          }}>
            <span style={{ fontSize: "2.5rem" }}>🌾</span>
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 2.5rem)",
            fontWeight: "700",
            margin: "0 0 0.5rem 0",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            FarmStack
          </h1>
          <p style={{
            color: "#6b7280",
            fontSize: "1rem",
            margin: 0,
            fontWeight: "400"
          }}>
            Welcome back! Please login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#374151",
              fontSize: "0.875rem",
              fontWeight: "600"
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem",
                  fontSize: "1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "#374151",
              fontSize: "0.875rem",
              fontWeight: "600"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem 0.875rem 1rem",
                  fontSize: "1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  fontSize: "1.2rem",
                  padding: "0.5rem"
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.875rem",
              fontSize: "1rem",
              fontWeight: "600",
              background: isLoading 
                ? "#9ca3af" 
                : "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              borderRadius: "12px",
              color: "white",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: isLoading 
                ? "none" 
                : "0 4px 15px rgba(102, 126, 234, 0.4)",
              marginBottom: "1.5rem"
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <span style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block"
                }}></span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>

          {/* Signup Link */}
          <div style={{
            textAlign: "center",
            paddingTop: "1.5rem",
            borderTop: "1px solid #e5e7eb"
          }}>
            <p style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              margin: "0 0 0.5rem 0"
            }}>
              Don't have an account?
            </p>
            <Link
              to="/signup"
              style={{
                color: "#667eea",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.color = "#764ba2"}
              onMouseOut={(e) => e.target.style.color = "#667eea"}
            >
              Create an account →
            </Link>
          </div>
        </form>

        <Toaster />
      </div>
    </div>
  );
};

export default Login;