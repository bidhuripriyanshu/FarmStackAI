# CropSathi Client

Frontend client application for CropSathi - An AI-powered crop recommendation and farming community platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your API key:
     ```
     VITE_API_KEY=your_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components
├── util/           # Utility functions
├── locales/        # i18n translation files
├── assets/         # CSS and static assets
├── api.js          # API configuration
├── url.js          # Backend URL configuration
└── App.jsx         # Main application component
```

## 🔧 Environment Variables

Required environment variables (see `.env.example`):
- `VITE_API_KEY`: Your API key for external services

## 🌐 Features

- Multi-language support (12+ languages)
- User authentication
- Crop recommendations based on soil data
- Community forum for farmers
- AI-powered translations
- Responsive design

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ⚠️ Important Notes

- Make sure to set `VITE_API_KEY` in your `.env` file before running the application
- The backend server should be running on the configured URL (see `src/url.js`)
- API keys should never be committed to version control

## 🔒 Security

- API keys are stored in environment variables (not in source code)
- Tokens are stored in cookies with appropriate security settings
- Always use HTTPS in production

## 📚 Tech Stack

- React 18
- Vite
- React Router
- Axios
- i18next (Internationalization)
- Bootstrap
- React Hot Toast
