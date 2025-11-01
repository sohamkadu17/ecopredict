# 🚀 Quick Start Guide - EcoPredict

## Get Up and Running in 5 Minutes!

### Step 1: Start the Backend (Django)

Open a terminal and run:

```bash
cd backend
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

✅ Backend is ready! Keep this terminal open.

---

### Step 2: Install Frontend Dependencies

Open a **NEW terminal** (or use Command Prompt if PowerShell gives errors):

```bash
# Navigate to project root
cd "c:\Users\kadus\OneDrive\Documents\CLG\Indradhanu\ecopredict (1)"

# Install dependencies
npm install
```

Wait for installation to complete (~2-3 minutes).

---

### Step 3: Start the Frontend (Vite)

In the same terminal, run:

```bash
npm run dev
```

You should see:
```
  VITE v6.3.5  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ Frontend is ready!

---

### Step 4: Open in Browser

Visit: **http://localhost:3000**

You should see the EcoPredict landing page! 🎉

---

## 🎯 What You'll See

1. **Landing Page** - Beautiful animated entry screen
2. **Click "Enter App"** - Takes you to the main application
3. **Dashboard** - Climate metrics and analytics
4. **Navigation Bar** - Switch between different features:
   - 🗺️ Risk Maps
   - 📊 Climate Trends
   - 🌱 Carbon Tracker
   - 🚜 Agriculture Mode
   - 🔮 Scenario Simulator
5. **ChatBot** - Floating button in bottom-right corner

---

## 🔌 Testing API Connection

### Check Backend API

Open: **http://localhost:8000/api/**

You should see:
```json
{
  "message": "Welcome to EcoPredict API",
  "version": "1.0.0",
  "endpoints": {
    "metrics": "/api/metrics/",
    "historical": "/api/historical/",
    ...
  }
}
```

### Check Sample Data

Open: **http://localhost:8000/api/metrics/current/**

You should see current climate metrics (temperature, rainfall, CO2, etc.).

---

## 🐛 Common Issues & Solutions

### Issue 1: PowerShell Script Execution Error

**Error:**
```
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded
```

**Solution:** Use Command Prompt instead:
```cmd
cmd /c "cd /d YOUR_PROJECT_PATH && npm install"
```

---

### Issue 2: Port Already in Use

**Error:**
```
Error: Port 3000 is already in use
```

**Solution:**
```bash
# Find and kill the process using port 3000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change the port in vite.config.ts:
# server: { port: 3001 }
```

---

### Issue 3: CORS Error in Browser

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
1. Ensure Django backend is running on port 8000
2. Check `backend/backend/settings.py` has:
   ```python
   CORS_ALLOW_ALL_ORIGINS = True  # For development
   ```
3. Restart both frontend and backend

---

### Issue 4: No Sample Data

**Error:** API returns empty arrays `[]`

**Solution:** Load sample data:
```bash
cd backend
python add_sample_data.py
```

---

## 📝 Next Steps

Once everything is running:

1. **Explore the UI** - Click through all features
2. **Check Browser Console** - Look for any errors (F12)
3. **Test API Calls** - Open Network tab and watch API requests
4. **Customize** - Start modifying components in `src/components/`

---

## 🛠️ Development Workflow

### Making Changes to Frontend

1. Edit files in `src/components/`
2. Save - changes appear instantly (Hot Module Replacement)
3. No need to restart Vite server!

### Making Changes to Backend

1. Edit files in `backend/api/`
2. Django auto-reloads on save
3. For model changes:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

---

## 🌐 API Endpoints You Can Test

### Get Current Metrics
```
GET http://localhost:8000/api/metrics/current/
```

### Get Active Alerts
```
GET http://localhost:8000/api/alerts/active/
```

### Get Daily Forecasts
```
GET http://localhost:8000/api/forecasts/daily/
```

### Create Simulation
```
POST http://localhost:8000/api/simulate/
Content-Type: application/json

{
  "temperature_change": 2.0,
  "co2_change": 100,
  "rainfall_change": -15,
  "simulation_name": "Test Scenario"
}
```

### Chat with Bot
```
POST http://localhost:8000/api/chatbot/query/
Content-Type: application/json

{
  "message": "What is the current temperature?",
  "session_id": "test-session-123"
}
```

---

## 📚 Documentation

- **Full README**: [README.md](README.md)
- **Migration Details**: [MIGRATION_SUMMARY.md](MIGRATION_SUMMARY.md)
- **Backend API Docs**: http://localhost:8000/api/ (when running)
- **Django Admin**: http://localhost:8000/admin/ (create superuser first)

---

## 🆘 Still Stuck?

1. **Check both terminals** - Make sure both servers are running
2. **Clear browser cache** - Hard refresh with Ctrl+F5
3. **Check logs** - Look at terminal output for errors
4. **Restart everything**:
   ```bash
   # Stop both servers (Ctrl+C)
   # Then restart:
   
   # Terminal 1
   cd backend
   python manage.py runserver
   
   # Terminal 2
   npm run dev
   ```

---

## ✅ Success Checklist

- [ ] Django backend running on port 8000
- [ ] Vite frontend running on port 3000
- [ ] Landing page loads at http://localhost:3000
- [ ] Can click "Enter App" button
- [ ] Dashboard shows (even with mock data)
- [ ] No CORS errors in browser console
- [ ] Can navigate between pages
- [ ] ChatBot button visible

---

**Happy Coding! 🎉**

If everything works, you're ready to start developing! 🚀
