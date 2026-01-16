# Setup Guide - CropSathi

## 🚀 Quick Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Atlas account or local MongoDB installation)
- npm or yarn

---

## Step-by-Step Setup

### 1. Server Setup

#### 1.1 Navigate to Server Directory
```bash
cd CropSathi/server
```

#### 1.2 Install Dependencies
```bash
npm install
```

#### 1.3 Create Environment File
Create a `.env` file in the `server` directory:

```env
PORT=4999
MONGO_URL=your_mongodb_connection_string_here
```

**MongoDB Connection String Examples:**
- **MongoDB Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/cropsathi?retryWrites=true&w=majority`
- **Local MongoDB:** `mongodb://localhost:27017/cropsathi`

**How to get MongoDB Atlas connection string:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `cropsathi` (or your preferred database name)

#### 1.4 Start the Server
```bash
npm start
```

**Expected Output:**
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
Server is listening on port 4999
Server URL: http://localhost:4999
```

**✅ Verify:** Open `http://localhost:4999` in browser - you should see "Hello World"

---

### 2. Client Setup

#### 2.1 Navigate to Client Directory
Open a **NEW terminal window**:
```bash
cd CropSathi/client
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Create Environment File (Optional)
Create a `.env` file in the `client` directory:

```env
VITE_API_KEY=your_api_key_here
```

**Note:** This is only needed if you're using external APIs. For basic login/signup, this is optional.

#### 2.4 Start the Client
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**✅ Verify:** Open `http://localhost:5173` in browser - you should see the application

---

## 🎯 Running Both Servers

You need **TWO terminal windows** running simultaneously:

### Terminal 1 - Backend Server
```bash
cd CropSathi/server
npm start
```

### Terminal 2 - Frontend Client
```bash
cd CropSathi/client
npm run dev
```

---

## ✅ Verification Checklist

After setup, verify everything is working:

- [ ] Server terminal shows: "Server is listening on port 4999"
- [ ] Server terminal shows: "MongoDB Connected: ..."
- [ ] Browser can access `http://localhost:4999` (shows "Hello World")
- [ ] Client terminal shows: "Local: http://localhost:5173/"
- [ ] Browser can access `http://localhost:5173` (shows the app)
- [ ] No errors in server console
- [ ] No errors in client console (F12 in browser)

---

## 🔧 Troubleshooting

### Server won't start
- Check if `.env` file exists in `server` directory
- Verify `PORT` and `MONGO_URL` are set in `.env`
- Check MongoDB connection string is correct
- Ensure MongoDB Atlas cluster is running (if using Atlas)
- Check if port 4999 is already in use

### Client can't connect to server
- Verify server is running (check Terminal 1)
- Check server shows "Server is listening on port 4999"
- Verify `http://localhost:4999` is accessible in browser
- Check browser console (F12) for detailed error messages

### MongoDB Connection Error
- Verify connection string format is correct
- Check username and password in connection string
- If using Atlas, ensure your IP is whitelisted
- Check internet connection

For more detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📁 Project Structure

```
CropSathi/
├── server/          # Backend (Node.js/Express)
│   ├── .env         # Server environment variables (create this)
│   ├── index.js     # Server entry point
│   └── ...
├── client/          # Frontend (React/Vite)
│   ├── .env         # Client environment variables (optional)
│   ├── src/
│   └── ...
└── README.md
```

---

## 🆘 Need Help?

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues
2. Verify all steps above are completed
3. Check server and client console for error messages
4. Ensure both servers are running in separate terminals
