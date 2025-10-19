# 🚀 Quick Start - Deployment in 30 Minutes

The fastest path from code to production.

## ⏱️ Time Estimate: 30-45 minutes

---

## Step 1: MongoDB Atlas (10 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free M0 cluster
4. Create database user with password
5. Set Network Access to **0.0.0.0/0** (Allow from Anywhere)
6. Get connection string (Click Connect → Drivers)
7. Save: `mongodb+srv://username:PASSWORD@cluster.mongodb.net/`

---

## Step 2: Deploy Backend to Render (10 minutes)

1. Go to https://render.com
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Select your **Performance-Manager** repository
5. Configure:
   - **Name**: `performance-manager-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`

6. Add Environment Variables:
   ```
   MONGO_URL = your-mongodb-connection-string
   DB_NAME = performance_manager
   CORS_ORIGINS = https://temp.com (we'll update this)
   ENVIRONMENT = production
   LOG_LEVEL = INFO
   PYTHON_VERSION = 3.11.0
   ```

7. Click **Create Web Service**
8. Wait for deployment (~5 minutes)
9. **Save your backend URL**: `https://your-name.onrender.com`
10. Test: Visit `https://your-name.onrender.com/health`

---

## Step 3: Deploy Frontend to Vercel (10 minutes)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **Add New...** → **Project**
4. Select your **Performance-Manager** repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
6. Add Environment Variable:
   ```
   REACT_APP_BACKEND_URL = https://your-backend.onrender.com
   ```
   (Use your Render URL from Step 2)

7. Click **Deploy**
8. Wait for build (~3 minutes)
9. **Save your frontend URL**: `https://your-name.vercel.app`
10. Test: Visit your frontend URL

---

## Step 4: Update CORS (5 minutes)

1. Go back to **Render Dashboard**
2. Select your backend service
3. Click **Environment** in sidebar
4. Update `CORS_ORIGINS`:
   ```
   https://your-name.vercel.app
   ```
   (Use your Vercel URL from Step 3)

5. Click **Save Changes**
6. Wait for auto-redeploy (~2 minutes)

---

## Step 5: Test Everything (5 minutes)

1. Visit your Vercel URL
2. Dashboard should load with sample data
3. Open browser DevTools (F12)
4. Check Console tab - should be no errors
5. Test these actions:
   - ✅ View members
   - ✅ Add a new member
   - ✅ Edit a member
   - ✅ Delete a member
   - ✅ View all tabs (Analytics, Tasks, Registrations)

---

## ✅ Success Checklist

- [ ] MongoDB cluster created and accessible
- [ ] Backend deployed to Render
- [ ] Backend `/health` endpoint returns "healthy"
- [ ] Frontend deployed to Vercel
- [ ] Frontend loads without errors
- [ ] No CORS errors in browser console
- [ ] Can add/edit/delete members
- [ ] All analytics tabs display data

---

## 🎉 You're Live!

**Your URLs:**
- Frontend: `https://____________.vercel.app`
- Backend: `https://____________.onrender.com`
- Health: `https://____________.onrender.com/health`

---

## 🐛 Quick Troubleshooting

### Frontend shows "Network Error"
- Check `REACT_APP_BACKEND_URL` in Vercel settings
- Verify backend `/health` endpoint works
- Check CORS origins in Render

### Backend shows "database disconnected"
- Verify `MONGO_URL` in Render environment
- Check MongoDB Atlas network access (0.0.0.0/0)
- Confirm database user credentials

### CORS Errors in Browser
- Update `CORS_ORIGINS` in Render to exact Vercel URL
- Include `https://` protocol
- No trailing slash
- Wait for backend to redeploy

### Render backend is slow
- First request after inactivity takes ~30s (cold start)
- This is normal on free tier
- Backend spins down after 15 minutes idle
- Upgrade to paid tier for always-on

---

## 📚 Need More Details?

- **Full Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Environment Variables**: [ENV_VARIABLES.md](./ENV_VARIABLES.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Local Setup**: [LOCAL_SETUP.md](./LOCAL_SETUP.md)

---

## 🔐 Important Security Notes

- ✅ Never commit `.env` files
- ✅ Use strong MongoDB passwords
- ✅ Keep credentials secure
- ✅ Update CORS to your actual domain
- ❌ Don't use wildcard (`*`) for CORS in production

---

## 💡 Pro Tips

1. **Bookmark your health endpoint** - Quick way to check if backend is up
2. **Pin your dashboard URLs** - Save in browser bookmarks
3. **Set up UptimeRobot** - Free monitoring to prevent cold starts
4. **Use custom domains** - More professional (optional)
5. **Enable branch previews** - Test changes before production

---

## 🚀 What's Next?

After successful deployment:

1. Set up monitoring (UptimeRobot, etc.)
2. Configure custom domains (optional)
3. Add team members to platforms
4. Set up automated backups
5. Plan for authentication/authorization

---

**Need help?** Check the full documentation or open an issue!

**Happy deploying! 🎊**
