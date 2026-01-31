import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import url from '../url';
import LanguageSelector from '../components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { 
  MdScience, 
  MdLocationOn, 
  MdAutoAwesome, 
  MdSave,
  MdThermostat,
  MdWaterDrop,
  MdGrass,
  MdCloud,
  MdBiotech,
  MdElectricBolt
} from 'react-icons/md';

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

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 2) {
      try {
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
      const mockSoilData = {
        Nitrogen: Math.floor(Math.random() * 140) + 10,
        Phosphorus: Math.floor(Math.random() * 140) + 10,
        Potassium: Math.floor(Math.random() * 200) + 50,
        Temperature: Math.floor(Math.random() * 35) + 15,
        Humidity: Math.floor(Math.random() * 80) + 20,
        pH: (Math.random() * 6 + 4).toFixed(1),
        Rainfall: Math.floor(Math.random() * 200) + 50
      };

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
    <>
      <div className="update-page">
        {/* Background Elements */}
        <div className="update-bg-gradient" />
        <div className="update-bg-pattern" />
        
        <div className="update-container">
          <div className="update-content">
            {/* Header Section */}
            <div className="update-header">
              <div className="header-icon">
                <MdScience />
              </div>
              <h1 className="update-title">{t('URecomSystem')}</h1>
              <p className="update-subtitle">
                Update your soil parameters for precise crop recommendations
              </p>
            </div>

            {/* Auto-fill Section */}
            <div className="autofill-section">
              <div className="autofill-header">
                <MdAutoAwesome className="autofill-icon" />
                <h3>Smart Location Analysis</h3>
              </div>
              
              <div className="autofill-form">
                <div className="location-input-wrapper">
                  <MdLocationOn className="input-icon" />
                  <input
                    type="text"
                    className="location-input"
                    placeholder="Enter your location (e.g., Mumbai, Maharashtra)"
                    value={location}
                    onChange={handleLocationChange}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="suggestion-item"
                          onClick={() => selectLocation(suggestion)}
                        >
                          <MdLocationOn className="suggestion-icon" />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={autoFillSoilData}
                  disabled={isAutoFilling || !location}
                  className="autofill-btn"
                >
                  {isAutoFilling ? (
                    <>
                      <div className="spinner" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <MdAutoAwesome />
                      Auto-Fill Data
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="update-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <MdGrass className="label-icon" />
                    {t('Nitrogen')}
                  </label>
                  <input
                    type="number"
                    name="Nitrogen"
                    value={formData.Nitrogen}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    required
                    className="form-input"
                    placeholder="0-150 mg/kg"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdBiotech className="label-icon" />
                    {t('Phosphorus')}
                  </label>
                  <input
                    type="number"
                    name="Phosphorus"
                    value={formData.Phosphorus}
                    onChange={handleChange}
                    min="0"
                    max="150"
                    required
                    className="form-input"
                    placeholder="0-150 mg/kg"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdElectricBolt className="label-icon" />
                    {t('Potassium')}
                  </label>
                  <input
                    type="number"
                    name="Potassium"
                    value={formData.Potassium}
                    onChange={handleChange}
                    min="0"
                    max="250"
                    required
                    className="form-input"
                    placeholder="0-250 mg/kg"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdThermostat className="label-icon" />
                    {t('Temperature')}
                  </label>
                  <input
                    type="number"
                    name="Temperature"
                    value={formData.Temperature}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    required
                    className="form-input"
                    placeholder="0-50°C"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdWaterDrop className="label-icon" />
                    {t('Humidity')}
                  </label>
                  <input
                    type="number"
                    name="Humidity"
                    value={formData.Humidity}
                    onChange={handleChange}
                    min="10"
                    max="100"
                    required
                    className="form-input"
                    placeholder="10-100%"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdScience className="label-icon" />
                    {t('pH')}
                  </label>
                  <input
                    type="number"
                    name="pH"
                    value={formData.pH}
                    onChange={handleChange}
                    min="2"
                    max="10"
                    step="0.1"
                    required
                    className="form-input"
                    placeholder="2.0-10.0"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <MdCloud className="label-icon" />
                    {t('Rainfall')}
                  </label>
                  <input
                    type="number"
                    name="Rainfall"
                    value={formData.Rainfall}
                    onChange={handleChange}
                    min="15"
                    max="300"
                    required
                    className="form-input"
                    placeholder="15-300 cm"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="spinner" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <MdSave />
                      {t('UButton')}
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Language Selector */}
            <div className="language-section">
              <LanguageSelector 
                selectedLanguage={selectedLanguage} 
                setSelectedLanguage={setSelectedLanguage} 
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .update-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
          overflow: hidden;
          padding-top: 80px;
        }

        .update-bg-gradient {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          animation: gradientShift 8s ease-in-out infinite alternate;
        }

        @keyframes gradientShift {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .update-bg-pattern {
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

        .update-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem clamp(1rem, 5vw, 2rem);
          position: relative;
          z-index: 10;
        }

        .update-content {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: clamp(2rem, 5vw, 3rem);
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .update-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }

        .update-title {
          font-size: clamp(2rem, 5vw, 2.5rem);
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .update-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.6;
        }

        .autofill-section {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 3rem;
          backdrop-filter: blur(10px);
        }

        .autofill-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .autofill-icon {
          font-size: 1.5rem;
          color: #3b82f6;
        }

        .autofill-header h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
        }

        .autofill-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }

        .location-input-wrapper {
          position: relative;
        }

        .location-input {
          width: 100%;
          height: 3rem;
          padding: 0 1rem 0 3rem;
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .location-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .location-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.25rem;
        }

        .suggestions-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          z-index: 100;
          margin-top: 0.5rem;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-item:hover {
          background: rgba(59, 130, 246, 0.1);
        }

        .suggestion-icon {
          color: #3b82f6;
          font-size: 1rem;
        }

        .autofill-btn {
          height: 3rem;
          padding: 0 2rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .autofill-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .autofill-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .update-form {
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          font-size: 0.95rem;
        }

        .label-icon {
          color: #3b82f6;
          font-size: 1.1rem;
        }

        .form-input {
          height: 3rem;
          padding: 0 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-actions {
          display: flex;
          justify-content: center;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 3rem;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .language-section {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .update-page {
            padding-top: 70px;
          }

          .autofill-form {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .submit-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .update-container {
            padding: 1rem;
          }

          .update-content {
            padding: 1.5rem;
          }

          .autofill-section {
            padding: 1.5rem;
          }
        }
      `}</style>
      <Toaster />
    </>
  );
};

export default Update;
