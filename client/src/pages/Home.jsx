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
import { 
  MdAgriculture, 
  MdAnalytics, 
  MdEco, 
  MdThermostat, 
  MdWaterDrop, 
  MdTrendingUp,
  MdScience,
  MdCloud,
  MdLightbulb
} from 'react-icons/md';
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
    <>
      <div className="home-page">
        {/* Background Elements */}
        <div className="home-bg-gradient" />
        <div className="home-bg-pattern" />
        <div className="home-floating-elements">
          <div className="floating-element element-1" />
          <div className="floating-element element-2" />
          <div className="floating-element element-3" />
        </div>

        <div className="home-container">
          {/* Welcome Header */}
          <div className="welcome-header">
            <div className="welcome-card">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <MdAgriculture />
                </div>
                <div className="welcome-text">
                  <h1 className="welcome-title">
                    {getGreeting()}, {username}!
                  </h1>
                  <p className="welcome-subtitle">
                    Welcome to your personalized farming dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Left Column - Main Content */}
            <div className="main-column">
              {isLoading ? (
                <div className="loading-card">
                  <div className="card-header">
                    <MdAnalytics className="header-icon" />
                    <div className="header-text">
                      <h2>Analyzing Your Data</h2>
                      <p>Processing your farming information...</p>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="loading-spinner">
                      <div className="spinner" />
                    </div>
                    <p className="loading-text">
                      Processing soil conditions and climate data for optimal recommendations...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="recommendations-card">
                  <div className="card-header">
                    <MdLightbulb className="header-icon" />
                    <div className="header-text">
                      <h2>Your Crop Recommendations</h2>
                      <p>AI-powered suggestions based on your data</p>
                    </div>
                  </div>
                  <div className="card-content">
                    {crops.length > 0 ? (
                      <div className="crop-display">
                        <NewCropCard crop={crops[0]} crops={crops} />
                      </div>
                    ) : (
                      <div className="no-data">
                        <MdEco className="no-data-icon" />
                        <h3>No Recommendations Yet</h3>
                        <p>Complete your profile to get personalized crop recommendations</p>
                        <button 
                          className="update-btn"
                          onClick={() => navigate('/update')}
                        >
                          Update Profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="actions-card">
                <div className="card-header">
                  <MdTrendingUp className="header-icon" />
                  <div className="header-text">
                    <h2>Quick Actions</h2>
                    <p>Manage your farming activities</p>
                  </div>
                </div>
                <div className="card-content">
                  <div className="actions-grid">
                    <button 
                      className="action-btn"
                      onClick={() => navigate('/update')}
                    >
                      <MdScience className="action-icon" />
                      <span>Update Soil Data</span>
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => navigate('/forum')}
                    >
                      <MdAnalytics className="action-icon" />
                      <span>Community Forum</span>
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => navigate('/posts')}
                    >
                      <MdLightbulb className="action-icon" />
                      <span>View Posts</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Features */}
            <div className="sidebar-column">
              {/* Stats Card */}
              <div className="stats-card">
                <div className="card-header">
                  <MdAnalytics className="header-icon" />
                  <div className="header-text">
                    <h2>Your Stats</h2>
                    <p>Current farming metrics</p>
                  </div>
                </div>
                <div className="card-content">
                  <div className="stats-list">
                    <div className="stat-item">
                      <div className="stat-icon">
                        <MdEco />
                      </div>
                      <div className="stat-details">
                        <span className="stat-value">5</span>
                        <span className="stat-label">Recommended Crops</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">
                        <MdScience />
                      </div>
                      <div className="stat-details">
                        <span className="stat-value">100%</span>
                        <span className="stat-label">AI Optimized</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">
                        <MdTrendingUp />
                      </div>
                      <div className="stat-details">
                        <span className="stat-value">Smart</span>
                        <span className="stat-label">Analysis Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="features-card">
                <div className="card-header">
                  <MdCloud className="header-icon" />
                  <div className="header-text">
                    <h2>Smart Features</h2>
                    <p>Available tools for you</p>
                  </div>
                </div>
                <div className="card-content">
                  <div className="features-list">
                    <div className="feature-item">
                      <MdThermostat className="feature-icon" />
                      <div className="feature-info">
                        <h4>Weather Insights</h4>
                        <p>Real-time weather data</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <MdWaterDrop className="feature-icon" />
                      <div className="feature-info">
                        <h4>Water Management</h4>
                        <p>Smart irrigation tips</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <MdScience className="feature-icon" />
                      <div className="feature-info">
                        <h4>Soil Health</h4>
                        <p>Comprehensive analysis</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <MdEco className="feature-icon" />
                      <div className="feature-info">
                        <h4>Sustainability</h4>
                        <p>Eco-friendly practices</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;