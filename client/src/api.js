// API key from environment variables
// Set VITE_API_KEY in your .env file
const api = import.meta.env.VITE_API_KEY || '';

if (!api) {
  console.warn('VITE_API_KEY is not set in environment variables');
}

export default api;
