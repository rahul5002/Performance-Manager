# Deployment Guide - Committee Performance Dashboard

This guide will walk you through deploying the Committee Performance Dashboard to production using **Vercel** (frontend) and **Render.com** (backend).

## 🎯 Architecture Overview

- **Frontend**: React app deployed to Vercel
- **Backend**: FastAPI server deployed to Render.com
- **Database**: MongoDB Atlas (cloud-hosted)

---

## 📋 Prerequisites

Before you begin, you'll need:

1. **GitHub Account** (to connect repositories)
2. **Vercel Account** (free tier available) - [vercel.com](https://vercel.com)
3. **Render Account** (free tier available) - [render.com](https://render.com)
4. **MongoDB Atlas Account** (free tier available) - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

---

## Part 1: Set Up MongoDB Atlas (Database)

### Step 1.1: Create MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Click **"Build a Database"**
4. Choose **"FREE"** tier (M0 Sandbox)
5. Select a cloud provider and region (choose closest to your users)
6. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 1.2: Create Database User

1. In the left sidebar, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create a username (e.g., `performance-manager-user`)
5. **Generate a secure password** (save this!)
6. Under "Database User Privileges", select **"Read and write to any database"**
7. Click **"Add User"**

### Step 1.3: Configure Network Access

1. In the left sidebar, click **"Network Access"**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ Note: For production, you should restrict this to your backend server's IP
4. Click **"Confirm"**

### Step 1.4: Get Connection String

1. Click **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. **Save this connection string** - you'll need it later!

---

## Part 2: Deploy Backend to Render.com

### Step 2.1: Push Code to GitHub

1. Make sure your code is committed and pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2.2: Create Render Account & Service

1. Go to [Render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not already connected)
4. Find and select your **Performance-Manager** repository
5. Configure the service:
   - **Name**: `performance-manager-backend` (or your choice)
   - **Region**: Select closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Step 2.3: Configure Environment Variables

In the **Environment Variables** section, add these:

| Key | Value | Notes |
|-----|-------|-------|
| `MONGO_URL` | Your MongoDB connection string from Step 1.4 | 🔒 Keep secret! |
| `DB_NAME` | `performance_manager` | Database name |
| `CORS_ORIGINS` | `https://your-app.vercel.app` | You'll update this after frontend deployment |
| `ENVIRONMENT` | `production` | |
| `API_VERSION` | `1.0.0` | |
| `LOG_LEVEL` | `INFO` | |
| `PYTHON_VERSION` | `3.11.0` | |

⚠️ **Important**: Leave `CORS_ORIGINS` as a placeholder for now. We'll update it after deploying the frontend.

### Step 2.4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for the build and deployment
3. Once deployed, you'll see a URL like: `https://performance-manager-backend.onrender.com`
4. **Save this URL** - you'll need it for the frontend!

### Step 2.5: Test Backend

1. Visit `https://your-backend-url.onrender.com/health`
2. You should see:
```json
{
  "status": "healthy",
  "service": "Committee Performance Dashboard API",
  "version": "1.0.0",
  "database": "connected"
}
```

3. If `database` shows `"disconnected"`, check your `MONGO_URL` is correct

---

## Part 3: Deploy Frontend to Vercel

### Step 3.1: Create Vercel Account

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### Step 3.2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Select **Import Git Repository**
3. Find and select your **Performance-Manager** repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `build` (or leave default)

### Step 3.3: Configure Environment Variables

In the **Environment Variables** section:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://your-backend-url.onrender.com` |

Replace with your actual Render backend URL from Part 2, Step 2.4.

### Step 3.4: Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build
3. Once complete, you'll get a URL like: `https://your-app.vercel.app`
4. **Save this URL!**

### Step 3.5: Update Backend CORS

Now that you have the frontend URL, go back to Render:

1. Go to your backend service on Render
2. Click **"Environment"** in the left sidebar
3. Find the `CORS_ORIGINS` variable
4. Update it to your Vercel URL: `https://your-app.vercel.app`
5. Click **"Save Changes"**
6. The backend will automatically redeploy (takes 1-2 minutes)

---

## Part 4: Verify Deployment

### Step 4.1: Test the Application

1. Visit your Vercel URL: `https://your-app.vercel.app`
2. The dashboard should load with sample data
3. Try these actions:
   - ✅ View committee members
   - ✅ Add a new member
   - ✅ Edit a member
   - ✅ Delete a member
   - ✅ View analytics tabs

### Step 4.2: Check Browser Console

Open browser DevTools (F12) and check:
- ✅ No CORS errors
- ✅ API calls succeed (Status 200)
- ✅ No JavaScript errors

### Step 4.3: Monitor Backend Health

Visit: `https://your-backend-url.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

---

## 🎉 Deployment Complete!

Your application is now live:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend-url.onrender.com`
- **API Docs**: `https://your-backend-url.onrender.com/docs` (only in dev mode)

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

#### For Vercel (Frontend):
1. Go to your project → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

#### For Render (Backend):
1. Go to your service → **Settings** → **Custom Domains**
2. Add your custom domain
3. Configure DNS records as instructed

**Important**: After adding custom domains, update `CORS_ORIGINS` in Render to include your custom domain!

### Environment Updates

If you need to update environment variables:

**Backend (Render)**:
1. Service → Environment
2. Update variable
3. Save (auto-redeploys)

**Frontend (Vercel)**:
1. Project → Settings → Environment Variables
2. Update variable
3. Redeploy from **Deployments** tab

---

## 🐛 Troubleshooting

### Frontend can't connect to backend

**Symptoms**: API calls fail, "Network Error" in console

**Solutions**:
1. Check `REACT_APP_BACKEND_URL` is correct in Vercel
2. Verify backend is running: visit `/health` endpoint
3. Check browser console for CORS errors
4. Ensure `CORS_ORIGINS` in backend includes your frontend URL

### Backend shows "database disconnected"

**Symptoms**: `/health` shows `"database": "disconnected"`

**Solutions**:
1. Check `MONGO_URL` is correct in Render environment variables
2. Verify MongoDB Atlas network access allows 0.0.0.0/0
3. Confirm database user credentials are correct
4. Check Render logs for detailed error messages

### CORS Errors

**Symptoms**: Browser console shows "Access-Control-Allow-Origin" errors

**Solutions**:
1. Verify `CORS_ORIGINS` in Render matches your frontend URL exactly
2. Include `https://` in the URL
3. No trailing slash in the URL
4. After updating, wait for backend to redeploy

### Backend is slow to respond

**Symptoms**: First request takes 30+ seconds

**Solutions**:
- This is normal on Render free tier (cold starts)
- Backend spins down after 15 minutes of inactivity
- Consider upgrading to paid tier for always-on service
- Use a monitoring service to ping `/health` every 10 minutes

### Build Failures

**Frontend Build Fails**:
1. Check `package.json` has all dependencies
2. Verify `frontend/` directory structure is correct
3. Check Vercel build logs for specific errors

**Backend Build Fails**:
1. Check `requirements.txt` is valid
2. Verify Python version compatibility
3. Check Render build logs for specific errors

---

## 📊 Monitoring & Maintenance

### Check Application Logs

**Render (Backend)**:
1. Go to your service
2. Click **"Logs"** tab
3. Monitor for errors and performance issues

**Vercel (Frontend)**:
1. Go to your project
2. Click **"Deployments"**
3. Click on a deployment → **"View Function Logs"**

### Database Monitoring

1. Go to MongoDB Atlas
2. Click **"Metrics"** on your cluster
3. Monitor:
   - Connection count
   - Operations per second
   - Storage usage

### Uptime Monitoring (Recommended)

Use a free service like:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

Configure to ping your `/health` endpoint every 5-10 minutes.

---

## 🔒 Security Best Practices

### Before Going to Production

1. **Enable IP Whitelisting** in MongoDB Atlas
   - Get your Render service's outbound IP
   - Update MongoDB Network Access to allow only that IP

2. **Use Secrets Management**
   - Never commit `.env` files
   - Rotate database passwords regularly
   - Use Render's secret environment variables

3. **Set Up SSL/TLS** (automatic on Vercel & Render)
   - Verify HTTPS is working
   - Update all API calls to use HTTPS

4. **Enable Rate Limiting**
   - Consider adding rate limiting to backend
   - Use Cloudflare for additional protection

5. **Regular Backups**
   - Enable MongoDB Atlas automated backups
   - Export data periodically

---

## 💰 Cost Estimates

### Free Tier Limits

**Vercel**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ⚠️ Team features limited

**Render**:
- ✅ 750 hours/month free
- ✅ 512MB RAM
- ⚠️ Spins down after 15 minutes inactivity
- ⚠️ Slower cold starts

**MongoDB Atlas**:
- ✅ 512MB storage
- ✅ Shared cluster
- ⚠️ Limited connections

### When to Upgrade

Consider paid plans when:
- Traffic exceeds 10,000 requests/day
- Need always-on backend (no cold starts)
- Require more than 512MB RAM
- Need team collaboration features
- Storage exceeds 500MB

---

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **FastAPI Documentation**: https://fastapi.tiangolo.com
- **React Documentation**: https://react.dev

---

## 🚀 Next Steps

After successful deployment:

1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domains
3. ✅ Enable automated backups
4. ✅ Add authentication/authorization
5. ✅ Implement rate limiting
6. ✅ Set up CI/CD pipelines
7. ✅ Write integration tests
8. ✅ Create API documentation

---

## 📝 Deployment Checklist

Use this checklist before going live:

- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with secure password
- [ ] Network access configured
- [ ] Backend deployed to Render
- [ ] All backend environment variables set
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable set
- [ ] CORS configured correctly
- [ ] Application loads without errors
- [ ] All CRUD operations work
- [ ] Browser console shows no errors
- [ ] Custom domains configured (optional)
- [ ] Monitoring set up
- [ ] Team members have access
- [ ] Backup strategy in place

---

**Need help?** Open an issue on GitHub or check the troubleshooting section above.

**Happy Deploying! 🎉**
