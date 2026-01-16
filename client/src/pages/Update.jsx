import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "../assets/Button.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import url from '../url';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const id = Cookies.get("id");
const lang = Cookies.get('language');

const Update = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const { t } = useTranslation();
  const [fetchedFormData, setFetchedFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!id && !reloadPage) {
      setReloadPage(true);
      window.location.reload();
    }
  }, [id, reloadPage]);

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = Cookies.get('language') || 'en';
      setSelectedLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    };

    const interval = setInterval(() => {
      const currentLanguage = Cookies.get('language');
      if (currentLanguage !== selectedLanguage) {
        handleLanguageChange();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [selectedLanguage]);

  const fetchFormData = async () => {
    try {
      const response = await axios.post(`${url}/datafetch`, { id });
      if (response.data.status) {
        setFetchedFormData(response.data);
      } else {
        toast.error("No data found for the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Error fetching form data.");
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  const [formData, setFormData] = useState({
    id: id,
    Nitrogen: fetchedFormData.Nitrogen || "",
    Phosphorus: fetchedFormData.Phosphorus || "",
    Potassium: fetchedFormData.Potassium || "",
    Temperature: fetchedFormData.Temperature || "",
    Humidity: fetchedFormData.Humidity || "",
    pH: fetchedFormData.pH || "",
    Rainfall: fetchedFormData.Rainfall || "",
  });

  useEffect(() => {
    if (Object.keys(fetchedFormData).length > 0) {
      setFormData({
        id: id,
        Nitrogen: fetchedFormData.Nitrogen || "",
        Phosphorus: fetchedFormData.Phosphorus || "",
        Potassium: fetchedFormData.Potassium || "",
        Temperature: fetchedFormData.Temperature || "",
        Humidity: fetchedFormData.Humidity || "",
        pH: fetchedFormData.pH || "",
        Rainfall: fetchedFormData.Rainfall || "",
      });
    }
  }, [fetchedFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // AI Auto-fill functionality
  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 2) {
      try {
        // Simulate location suggestions (in real implementation, you'd call a geocoding API)
        const mockSuggestions = [
          `${value}, Maharashtra, India`,
          `${value}, Karnataka, India`,
          `${value}, Tamil Nadu, India`,
          `${value}, Punjab, India`,
          `${value}, Gujarat, India`
        ];
        setSuggestions(mockSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    setShowSuggestions(false);
  };

  const autoFillSoilData = async () => {
    if (!location) {
      toast.error("Please enter a location first");
      return;
    }

    setIsAutoFilling(true);
    try {
      // Simulate AI-based soil data fetching
      // In real implementation, you'd call your AI service
      const mockSoilData = {
        Nitrogen: Math.floor(Math.random() * 140) + 10,
        Phosphorus: Math.floor(Math.random() * 140) + 10,
        Potassium: Math.floor(Math.random() * 200) + 50,
        Temperature: Math.floor(Math.random() * 35) + 15,
        Humidity: Math.floor(Math.random() * 80) + 20,
        pH: (Math.random() * 6 + 4).toFixed(1),
        Rainfall: Math.floor(Math.random() * 200) + 50
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setFormData(prev => ({
        ...prev,
        ...mockSoilData
      }));

      toast.success("Soil data auto-filled successfully!");
    } catch (error) {
      toast.error("Failed to auto-fill soil data. Please try again.");
    } finally {
      setIsAutoFilling(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(`${url}/datatoml`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const predictdata = await response.json();

      const datatoapi = await fetch(`${url}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const detailsdata = await datatoapi.json();

      toast.success(detailsdata.message, {
        onClose: setTimeout(function () { navigate("/"); }, 1500)
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update soil data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div className="position-fixed w-100 h-100" style={{ zIndex: 1, pointerEvents: 'none' }}>
        <div className="position-absolute" style={{ top: '15%', left: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite' }}></div>
        <div className="position-absolute" style={{ top: '70%', right: '15%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite 2s' }}></div>
        <div className="position-absolute" style={{ bottom: '30%', left: '20%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', animation: 'float 8s ease-in-out infinite 4s' }}></div>
      </div>

      <div className="container-fluid py-3 py-md-4 px-2 px-md-3" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-lg border-0" style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="card-body p-3 p-md-4 p-lg-5">
                {/* Header */}
                <div className="text-center mb-4 mb-md-5">
                  <div className="d-flex align-items-center justify-content-center mb-2 mb-md-3 flex-column flex-md-row">
                    <span className="fs-1 me-0 me-md-3 mb-2 mb-md-0" style={{ animation: 'bounce 2s infinite' }}>🌱</span>
                    <h1 className="mb-0" style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                      fontWeight: '700'
                    }}>
                      {t('URecomSystem')}
                    </h1>
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}>Update your soil parameters for better crop recommendations</p>
                </div>

                {/* AI Auto-fill Section */}
                <div className="card mb-4 border-0" style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="card-body p-4 text-white" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="d-flex align-items-center mb-3">
                      <span className="fs-2 me-3" style={{ animation: 'pulse 2s infinite' }}>🤖</span>
                      <h3 className="mb-0">AI Auto-Fill System</h3>
                    </div>
                    
                    <div className="row g-2 g-md-3">
                      <div className="col-12 col-md-8">
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            backdropFilter: 'blur(10px)'
                          }}
                          placeholder="Enter your location (e.g., Mumbai, Maharashtra)"
                          value={location}
                          onChange={handleLocationChange}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="position-absolute w-100 mt-1" style={{ zIndex: 10, maxWidth: 'calc(100% - 2rem)' }}>
                            <div className="card shadow-lg">
                              {suggestions.map((suggestion, index) => (
                                <div
                                  key={index}
                                  className="p-2 p-md-3 border-bottom cursor-pointer"
                                  onClick={() => selectLocation(suggestion)}
                                  style={{ cursor: 'pointer', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                                >
                                  📍 {suggestion}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-4">
                        <button
                          type="button"
                          onClick={autoFillSoilData}
                          disabled={isAutoFilling || !location}
                          className="btn btn-light w-100 d-flex align-items-center justify-content-center"
                          style={{
                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.2)',
                            border: '2px solid rgba(255,255,255,0.3)',
                            color: 'white',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          {isAutoFilling ? (
                            <>
                              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              🔍 Auto-Fill
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Soil Form */}
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Nitrogen"
                          name="Nitrogen"
                          placeholder="Enter Nitrogen"
                          value={formData.Nitrogen}
                          onChange={handleChange}
                          min="0"
                          max="150"
                          required
                        />
                        <label htmlFor="Nitrogen">
                          🌿 {t('Nitrogen')} (0-150 mg/kg)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Phosphorus"
                          name="Phosphorus"
                          placeholder="Enter Phosphorus"
                          value={formData.Phosphorus}
                          onChange={handleChange}
                          min="0"
                          max="150"
                          required
                        />
                        <label htmlFor="Phosphorus">
                          💎 {t('Phosphorus')} (0-150 mg/kg)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Potassium"
                          name="Potassium"
                          placeholder="Enter Potassium"
                          value={formData.Potassium}
                          onChange={handleChange}
                          min="0"
                          max="250"
                          required
                        />
                        <label htmlFor="Potassium">
                          ⚡ {t('Potassium')} (0-250 mg/kg)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Temperature"
                          name="Temperature"
                          placeholder="Enter Temperature"
                          value={formData.Temperature}
                          onChange={handleChange}
                          min="0"
                          max="50"
                          required
                        />
                        <label htmlFor="Temperature">
                          🌡️ {t('Temperature')} (0-50°C)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Humidity"
                          name="Humidity"
                          placeholder="Enter Humidity"
                          value={formData.Humidity}
                          onChange={handleChange}
                          min="10"
                          max="100"
                          required
                        />
                        <label htmlFor="Humidity">
                          💧 {t('Humidity')} (10-100%)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="pH"
                          name="pH"
                          placeholder="Enter pH"
                          value={formData.pH}
                          onChange={handleChange}
                          min="2"
                          max="10"
                          step="0.1"
                          required
                        />
                        <label htmlFor="pH">
                          🧪 {t('pH')} (2.0-10.0)
                        </label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="Rainfall"
                          name="Rainfall"
                          placeholder="Enter Rainfall"
                          value={formData.Rainfall}
                          onChange={handleChange}
                          min="15"
                          max="300"
                          required
                        />
                        <label htmlFor="Rainfall">
                          🌧️ {t('Rainfall')} (15-300 cm)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4 mt-md-5">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 w-md-auto px-4 px-md-5 py-2 py-md-3 d-inline-flex align-items-center justify-content-center"
                      disabled={isLoading}
                      style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          💾 {t('UButton')}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Update;
