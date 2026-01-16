import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import NewCropCard from '../components/NewCropCard'
import url from '../url';
import getCropDetails from "../util/CropDetails";
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [id, setId] = useState('');
  const { t } = useTranslation();
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      try {
        const { data } = await axios.post(
          `${url}`,
          { tok: cookies.token },
          { withCredentials: true }
        );
        const { status, user, id, language } = data;
        setUsername(user);
        setId(id);
        Cookies.set('id', id);
        Cookies.set('language', language);
        Cookies.set('username', user);
        if (!status) {
          removeCookie("token");
          Cookies.remove('id');
          navigate("/login");
        }
      } catch (error) {
        removeCookie("token");
        Cookies.remove('id');
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  //api for post of data
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios.post(`${url}/Cropfetch`, { id })
        .then(response => {
          const { Crop1, Crop2, Crop3, Crop4, Crop5 } = response.data;
          const cropNames = [Crop1, Crop2, Crop3, Crop4, Crop5];
          const cropDetailsArray = cropNames.map(getCropDetails);
          setCrops(cropDetailsArray);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching crops:', error);
          setIsLoading(false);
        });
    }
  }, [id]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="home-container">
      {/* Animated Background */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="welcome-card">
            <div className="user-greeting">
              <div className="greeting-icon">🌾</div>
              <div className="greeting-text">
                <h1 className="greeting-title">{getGreeting()}, {username}!</h1>
                <p className="greeting-subtitle">Discover your perfect crops for today</p>
              </div>
            </div>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Recommended Crops</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🌱</div>
                <div className="stat-info">
                  <h3>100%</h3>
                  <p>AI Optimized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <p className="loading-text">Analyzing your soil data...</p>
          </div>
        ) : (
          <div className="crop-recommendations">
            <div className="section-header">
              <h2 className="section-title">Your Crop Recommendations</h2>
              <p className="section-subtitle">Based on your soil analysis and climate conditions</p>
            </div>
            
            <div className="crop-cards-container">
              {crops.length > 0 && (
                <div className="featured-crop">
                  <NewCropCard crop={crops[0]} crops={crops} />
                </div>
              )}
            </div>

            {/* Additional Features */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌡️</div>
                <h3>Weather Insights</h3>
                <p>Get real-time weather data for optimal planting</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💧</div>
                <h3>Water Management</h3>
                <p>Smart irrigation recommendations</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Growth Tracking</h3>
                <p>Monitor your crop progress</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;