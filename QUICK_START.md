# ⚡ Quick Start - Fix Connection Refused Error

## The Problem
You're seeing `ERR_CONNECTION_REFUSED` because the **backend server is not running**.

## 🚀 Solution (2 Steps)

### Step 1: Start the Backend Server

Open **Terminal 1** and run:

```bash
cd CropSathi/server
```

**First time only:** Create `.env` file:
```bash
# Create .env file with this content:
PORT=4999
MONGO_URL=your_mongodb_connection_string_here
```

**Then start server:**
```bash
npm install  # Only needed first time
npm start
```

**✅ You should see:**
```
MongoDB Connected: ...
Server is listening on port 4999
Server URL: http://localhost:4999
```

### Step 2: Start the Frontend Client

Open **Terminal 2** (new terminal) and run:

```bash
cd CropSathi/client
npm install  # Only needed first time
npm run dev
```

**✅ You should see:**
```
Local: http://localhost:5173/
```

---

## ✅ Verify It's Working

1. **Check Server:** Open `http://localhost:4999` → Should show "Hello World"
2. **Check Client:** Open `http://localhost:5173` → Should show the app
3. **Try Login/Signup:** Should work without connection errors

---

## 🔴 Still Not Working?

### Issue: "MONGO_URL is not defined"
**Fix:** Create `.env` file in `server` folder with:
```
PORT=4999
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/cropsathi
```

### Issue: "Port 4999 already in use"
**Fix:** 
- Find what's using the port and stop it, OR
- Change PORT in `.env` to another number (e.g., 5000) and update `client/src/url.js`

### Issue: MongoDB connection error
**Fix:** 
- Check your MongoDB connection string is correct
- If using MongoDB Atlas, ensure your IP is whitelisted

---

## 📚 Need More Help?

- See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
