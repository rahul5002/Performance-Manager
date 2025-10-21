# Pre-Deployment Checklist

Use this checklist before deploying to production.

## ✅ Code Preparation

- [ ] All code committed and pushed to GitHub
- [ ] `.env` files are in `.gitignore` (not committed)
- [ ] `.env.example` files created with documentation
- [ ] No hardcoded secrets or API keys in code
- [ ] All console.log statements removed or replaced with proper logging
- [ ] Error handling implemented for all API calls
- [ ] CORS origins configured for production URLs

## ✅ Database Setup

- [ ] MongoDB Atlas account created
- [ ] Free tier M0 cluster created
- [ ] Database user created with secure password
- [ ] Network access configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string obtained and tested
- [ ] Database name decided: `performance_manager`

## ✅ Backend Deployment (Render.com)

- [ ] Render account created
- [ ] Repository connected to Render
- [ ] Web service created with correct settings:
  - [ ] Root directory: `backend`
  - [ ] Build command: `pip install -r requirements.txt`
  - [ ] Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Environment variables configured:
  - [ ] `MONGO_URL` (from MongoDB Atlas)
  - [ ] `DB_NAME` = `performance_manager`
  - [ ] `CORS_ORIGINS` (will update after frontend deployment)
  - [ ] `ENVIRONMENT` = `production`
  - [ ] `API_VERSION` = `1.0.0`
  - [ ] `LOG_LEVEL` = `INFO`
  - [ ] `PYTHON_VERSION` = `3.11.0`
- [ ] Backend deployed successfully
- [ ] Backend URL saved: `https://____________.onrender.com`
- [ ] Health check passes: `/health` endpoint returns healthy status

## ✅ Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Project imported with correct settings:
  - [ ] Framework: Create React App
  - [ ] Root directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `build`
- [ ] Environment variable configured:
  - [ ] `REACT_APP_BACKEND_URL` (from Render backend URL)
- [ ] Frontend deployed successfully
- [ ] Frontend URL saved: `https://____________.vercel.app`
- [ ] Application loads without errors

## ✅ Final Configuration

- [ ] Update `CORS_ORIGINS` in Render with Vercel frontend URL
- [ ] Backend redeployed with new CORS settings
- [ ] Wait for backend redeploy to complete (~2 minutes)

## ✅ Testing

- [ ] Visit frontend URL
- [ ] Dashboard loads successfully
- [ ] Sample data displays
- [ ] Browser console shows no errors
- [ ] API calls succeed (check Network tab)
- [ ] Test CRUD operations:
  - [ ] Add a new member
  - [ ] Edit an existing member
  - [ ] Delete a member
  - [ ] View all analytics tabs
- [ ] Backend health check passes
- [ ] No CORS errors in browser console

## ✅ Post-Deployment

- [ ] Deployment URLs documented
- [ ] Team members notified
- [ ] Monitoring set up (optional):
  - [ ] UptimeRobot or similar for health checks
  - [ ] Error tracking (Sentry, etc.)
- [ ] Backup strategy in place
- [ ] Custom domains configured (if applicable)

## 🔐 Security Verification

- [ ] HTTPS enabled (automatic on Vercel & Render)
- [ ] No `.env` files in Git history
- [ ] Database credentials secure
- [ ] CORS not set to wildcard `*`
- [ ] API keys rotated if exposed
- [ ] MongoDB network access reviewed

## 📝 Documentation

- [ ] DEPLOYMENT.md reviewed
- [ ] README.md updated with deployment URLs
- [ ] Team has access to:
  - [ ] MongoDB Atlas
  - [ ] Render dashboard
  - [ ] Vercel dashboard
  - [ ] GitHub repository

## 🎉 Go Live!

Once all checkboxes are complete, your application is ready for production use!

---

**Important URLs to Save:**

```
Frontend URL: https://_________________________________.vercel.app
Backend URL:  https://_________________________________.onrender.com
Health Check: https://_________________________________.onrender.com/health
MongoDB:      https://cloud.mongodb.com

Admin Access:
- Vercel:  https://vercel.com/dashboard
- Render:  https://dashboard.render.com
- MongoDB: https://cloud.mongodb.com
```

---

**Next Steps After Deployment:**

1. Set up monitoring (UptimeRobot, etc.)
2. Configure custom domains (optional)
3. Enable automated backups
4. Set up CI/CD pipeline
5. Implement authentication (if needed)
6. Add rate limiting
7. Configure error tracking
8. Plan scaling strategy

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions!
