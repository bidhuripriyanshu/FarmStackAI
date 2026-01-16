# API Key Setup Guide

## 🔑 Setting Up RapidAPI Key for ChatGPT Features

The application uses RapidAPI's ChatGPT API for AI-powered suggestions. You need to set up an API key to use these features.

### Step 1: Get Your RapidAPI Key

1. **Sign up/Login to RapidAPI:**
   - Go to [https://rapidapi.com/](https://rapidapi.com/)
   - Create an account or log in

2. **Subscribe to ChatGPT API:**
   - Visit: [https://rapidapi.com/rohan-patra/api/chatgpt-42](https://rapidapi.com/rohan-patra/api/chatgpt-42)
   - Click "Subscribe to Test" or choose a plan
   - Most plans have a free tier for testing

3. **Get Your API Key:**
   - After subscribing, go to your [RapidAPI Dashboard](https://rapidapi.com/developer/billing)
   - Find your API key (it looks like: `abc123def456ghi789...`)

### Step 2: Configure the API Key

1. **Create `.env` file in the `client` directory:**
   ```bash
   cd CropSathi/client
   ```

2. **Add your API key:**
   ```env
   VITE_API_KEY=your_rapidapi_key_here
   ```
   
   Replace `your_rapidapi_key_here` with your actual RapidAPI key.

   **Example:**
   ```env
   VITE_API_KEY=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
   ```

3. **Restart the development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

### Step 3: Verify It's Working

1. Navigate to a page with AI features (e.g., crop recommendations)
2. Click "Ask AI Suggestion" button
3. If configured correctly, you should see AI-generated suggestions
4. If you see an error, check:
   - The `.env` file exists in the `client` directory
   - The API key is correct (no extra spaces)
   - You've restarted the dev server after adding the key
   - Your RapidAPI subscription is active

## ⚠️ Troubleshooting

### Error: "API key is not configured"
- **Solution:** Make sure you have a `.env` file in the `client` directory with `VITE_API_KEY` set

### Error: "401 Unauthorized" or "API key is invalid or expired"
- **Solution:** 
  - Check your API key is correct
  - Verify your RapidAPI subscription is active
  - Make sure you've subscribed to the ChatGPT-42 API
  - Try regenerating your API key from RapidAPI dashboard

### Error: "429 Rate limit exceeded"
- **Solution:** You've exceeded your API quota. Wait a bit or upgrade your RapidAPI plan

### Error: "Unable to connect to API"
- **Solution:** Check your internet connection and try again

## 📝 Important Notes

- **Never commit your `.env` file to Git** - it's already in `.gitignore`
- **API keys are sensitive** - don't share them publicly
- **Free tier limits** - Most RapidAPI free tiers have usage limits
- **Environment variables** - Must start with `VITE_` to be accessible in Vite apps

## 🔒 Security Best Practices

1. Keep your API key secret
2. Don't hardcode API keys in source code
3. Use environment variables (as we're doing)
4. Rotate keys if they're exposed
5. Monitor your API usage in RapidAPI dashboard

## 💡 Alternative: Using Different API

If you want to use a different ChatGPT API provider:

1. Update the API endpoint in:
   - `src/components/Ideal.jsx`
   - `src/components/Grow.jsx`
   - `src/util/Ideal.js`
   - `src/util/HowToGrow.js`

2. Update the headers to match the new API's requirements

3. Update the response parsing if the response format differs

---

**Need Help?** Check the RapidAPI documentation or contact their support.
