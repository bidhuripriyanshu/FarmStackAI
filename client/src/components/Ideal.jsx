import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api';
import Cookies from 'js-cookie';
import axios from 'axios';

const languageName = Cookies.get("languageName");


const Ideal = ({ cropName, soilConditions }) => {
  const [adjustmentSuggestion, setAdjustmentSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buttonVisible, setButtonVisible] = useState(true);  const { t } = useTranslation();


  const getSoilAdjustmentSuggestion = async () => {
    // Check if API key is available
    if (!api || api.trim() === '') {
      setError("API key is not configured. Please set VITE_API_KEY in your .env file.");
      setLoading(false);
      setButtonVisible(true);
      return;
    }

    const instruction = (languageName === "Default" || languageName === "English") ? '' : ` Give instructions in stict ${languageName} Language with no other words than the ${languageName} words.`;
    const url = "https://chatgpt-42.p.rapidapi.com/chatgpt";
    const headers = {
      "Content-Type": "application/json",
      "x-rapidapi-key": api,
      "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    };

    // Format the soil conditions into a readable string for GPT
    const conditionsText = `Nitrogen: ${soilConditions[0]}, Phosphorus: ${soilConditions[1]}, Potassium: ${soilConditions[2]}, Temperature: ${soilConditions[3]}°C, Humidity: ${soilConditions[4]}%, pH: ${soilConditions[5]}, Rainfall: ${soilConditions[6]} mm`;

    const payload = {
      messages: [
        {
          role: "user",
          content: `Given the following soil conditions for ${cropName}: ${conditionsText}.
          Please compare these values to the ideal conditions for growing ${cropName} and suggest adjustments the farmer should make to optimize the soil based on their soil condition data and environment for this crop.${instruction}`,
        },
      ],
      web_access: false,
    };

    try {
      const response = await axios.post(url, payload, { headers });
      
      if (response.data && response.data.result) {
        setAdjustmentSuggestion(response.data.result);
      } else {
        setError("Received unexpected response format from API.");
      }
    } catch (error) {
      console.error("Error:", error);
      
      // Provide specific error messages based on error type
      if (error.response) {
        // Server responded with error status
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
        // Request was made but no response received
        setError("Unable to connect to API. Please check your internet connection.");
      } else {
        // Something else happened
        setError("Failed to fetch soil adjustment suggestion. Please try again.");
      }
      
      setButtonVisible(true); // Show button again on error
    } finally {
      setLoading(false);
    }
  };

  const formatSuggestion = (suggestion) => {
    const parts = suggestion.split(/\n/).map((line, index) => {
      // Split on bold and italic markers
      const lineParts = line.split(/(\*\*.*?\*\*|\*.*?\*)/).filter(Boolean);
      return (
        <p key={index}>
          {lineParts.map((part, idx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={idx}>{part.slice(2, -2)}</strong>; // Bold text
            } else if (part.startsWith('*') && part.endsWith('*')) {
              return <em key={idx}>{part.slice(1, -1)}</em>; // Italic text
            } else {
              return part; // Regular text
            }
          })}
        </p>
      );
    });
    return parts;
  };
  

  const handleAskSuggestion = () => {
    setLoading(true); // Set loading state before fetching
    setError(null); // Clear any previous error
    setButtonVisible(false); // Hide the button after clicking
    getSoilAdjustmentSuggestion();
  };

  useEffect(() => {
    setAdjustmentSuggestion(''); // Reset suggestion when cropName or soilConditions change
    setButtonVisible(true); // Show the button again
  }, [cropName, soilConditions]);

  return (
    <div className='grow_container'>
      <h3>{t("Ideal")}{t(cropName)}</h3>
      {buttonVisible && (
        <button onClick={handleAskSuggestion} style={styles.askButton}>
          <span style={{color:'black' }}>{t("Ask")}</span>
          <img 
            src="ai.svg" 
            alt="AI icon" 
            style={{ width: '24px', height: '24px', verticalAlign: 'middle', marginLeft:'-2px' }} // Set the image size
          />
          <span style={{ marginLeft: '2px', color:'black' }}>{t("Sugg")}</span>
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
      {adjustmentSuggestion && formatSuggestion(adjustmentSuggestion)}
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

export default Ideal;
