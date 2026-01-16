import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const languageName = Cookies.get("languageName");

const Grow = ({ cropName }) => {
  const [growingSuggestion, setGrowingSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);
  const { t } = useTranslation();

  const getGrowingSuggestion = async (cropName) => {
    // Check if API key is available
    if (!api || api.trim() === '') {
      setError("API key is not configured. Please set VITE_API_KEY in your .env file.");
      setLoading(false);
      setButtonVisible(true);
      return;
    }

    const instruction = (languageName === "Default" || languageName === "English") ? '' : ` Give instructions in ${languageName} Language with no other words than the ${languageName} words.`;
    const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";
    const headers = {
      "Content-Type": "application/json",
      "x-rapidapi-key": api,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    };
    const payload = {
      messages: [{ role: "user", content: `How to grow ${cropName}?${instruction}` }], 
      web_access: false,
    };

    try {
      const response = await axios.post(url, payload, { headers });
      
      if (response.data && response.data.result) {
        setGrowingSuggestion(response.data.result);
      } else {
        setError("Received unexpected response format from API.");
      }
    } catch (error) {
      console.error("Error:", error);
      
      // Provide specific error messages based on error type
      if (error.response) {
        if (error.response.status === 401) {
          setError("API key is invalid or expired. Please check your VITE_API_KEY in .env file.");
        } else if (error.response.status === 403) {
          setError("API access forbidden. Please check your API key permissions.");
        } else if (error.response.status === 429) {
          setError("API rate limit exceeded. Please try again later.");
        } else {
          setError(`API error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        setError("Unable to connect to API. Please check your internet connection.");
      } else {
        setError("Failed to fetch growing suggestion. Please try again.");
      }
      
      setButtonVisible(true); // Show button again on error
    } finally {
      setLoading(false);
    }
  };

  const formatSuggestion = (suggestion) => {
    const parts = suggestion.split(/\n/).map((line, index) => {
      const lineParts = line.split(/(\*\*.*?\*\*)/).filter(Boolean);
      return (
        <p key={index}>
          {lineParts.map((part, idx) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={idx}>{part.slice(2, -2)}</strong>
            ) : (
              part
            )
          )}
        </p>
      );
    });
    return parts;
  };

  const handleAskSuggestion = () => {
    setLoading(true);
    setError(null);
    setButtonVisible(false);
    getGrowingSuggestion(cropName);
  };

  useEffect(() => {
    setGrowingSuggestion('');
    setButtonVisible(true);
  }, [cropName]);

  return (
    <div className="grow_container">
      <h3>{t('HowGrow')}{t(cropName)}?</h3>
      {buttonVisible && (
        <button onClick={handleAskSuggestion} style={styles.askButton}>
          <span style={{color:'black' }}>{t("Ask")}</span>
          <img 
            src="ai.svg" 
            alt="AI icon" 
            style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginLeft:'-2px' }} 
          />
          <span style={{ marginLeft: '2px' ,color:'black'}}>{t("Sugg")}</span>
        </button>
      )}
      {loading && (
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <p>Loading AI suggestions...</p>
        </div>
      )}
      {error && (
        <div style={{ 
          padding: '15px', 
          margin: '10px 0',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c33'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {growingSuggestion && formatSuggestion(growingSuggestion)}
    </div>
  );
};

const styles = {
  askButton: {
    margin: '10px 0',
    padding: '8px 12px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid black',
    backgroundColor: "#c7e8ff",
  },
};

export default Grow;
