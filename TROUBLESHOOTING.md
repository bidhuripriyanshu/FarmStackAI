# Troubleshooting Guide - Connection Refused Errors

## Issue: `ERR_CONNECTION_REFUSED` when trying to login/signup

This error occurs when the frontend cannot connect to the backend server. The server is either not running or not accessible.

## ✅ Solution Steps

### Step 1: Check if Server is Running

1. **Navigate to server directory:**
   ```bash
   cd CropSathi/server
   ```

2. **Check if server is running:**
   - Look for a terminal/console window showing: `Server is listening on port 4999`
   - If you don't see this, the server is not running

### Step 2: Set Up Environment Variables

1. **Create `.env` file in the `server` directory:**
   ```bash
   cd CropSathi/server
   # Copy the example file
   cp .env.example .env
   # Or create manually
   ```

2. **Edit `.env` file with your configuration:**
   ```env
   PORT=4999
   MONGO_URL=your_mongodb_connection_string_here
   ```

   **Important:** Replace `your_mongodb_connection_string_here` with your actual MongoDB connection string:
   - **MongoDB Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - **Local MongoDB:** `mongodb://localhost:27017/cropsathi`

### Step 3: Install Server Dependencies (if not done)

```bash
cd CropSathi/server
npm install
```

### Step 4: Start the Server

```bash
cd CropSathi/server
npm start
```

You should see:
```
MongoDB Connected: ...
Server is listening on port 4999
```

### Step 5: Verify Server is Running

1. **Open browser and go to:** `http://localhost:4999`
2. **You should see:** "Hello World"
3. **If you see this, the server is running correctly**

### Step 6: Start the Client (Frontend)

In a **new terminal window**:

```bash
cd CropSathi/client
npm run dev
```

The client should start on `http://localhost:5173` (or another port if 5173 is busy)

## 🔍 Common Issues and Solutions

### Issue 1: "MONGO_URL is not defined"
**Solution:** Make sure you have a `.env` file in the `server` directory with `MONGO_URL` set.

### Issue 2: "MongoDB Connection Error"
**Solutions:**
- Check your MongoDB connection string is correct
- If using MongoDB Atlas, ensure your IP is whitelisted
- Check your internet connection
- Verify MongoDB credentials are correct

### Issue 3: "Port 4999 already in use"
**Solutions:**
- Find and stop the process using port 4999:
  ```bash
  # Windows
  netstat -ano | findstr :4999
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:4999 | xargs kill
  ```
- Or change the PORT in `.env` file and update `client/src/url.js` accordingly

### Issue 4: CORS Errors
**Solution:** The server CORS is already configured for `localhost:5173` (Vite default). If you're using a different port, update `server/index.js`:
```javascript
origin: ["http://localhost:4000","http://localhost:4999","http://localhost:5173","http://localhost:YOUR_PORT"],
```

### Issue 5: Server starts but immediately crashes
**Check:**
1. MongoDB connection string is valid
2. All required dependencies are installed (`npm install`)
3. Node.js version is compatible (v16+)

## 📋 Quick Checklist

Before reporting issues, verify:

- [ ] Server `.env` file exists with `PORT` and `MONGO_URL`
- [ ] MongoDB is accessible (Atlas cluster running or local MongoDB running)
- [ ] Server dependencies installed (`npm install` in server directory)
- [ ] Server is running (`npm start` in server directory)
- [ ] Server shows "Server is listening on port 4999"
- [ ] Client dependencies installed (`npm install` in client directory)
- [ ] Client is running (`npm run dev` in client directory)
- [ ] Browser can access `http://localhost:4999` (shows "Hello World")

## 🚀 Quick Start Commands

**Terminal 1 - Start Server:**
```bash
cd CropSathi/server
npm install  # Only needed first time
npm start
```

**Terminal 2 - Start Client:**
```bash
cd CropSathi/client
npm install  # Only needed first time
npm run dev
```

## 📞 Still Having Issues?

1. Check server console for error messages
2. Check browser console (F12) for detailed error messages
3. Verify both server and client are running in separate terminals
4. Ensure MongoDB connection is working
5. Check firewall/antivirus isn't blocking localhost connections
