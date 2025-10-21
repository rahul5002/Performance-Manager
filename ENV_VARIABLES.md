# Environment Variables Reference

Complete reference for all environment variables used in the application.

## Backend Environment Variables

Located in: `backend/.env`

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `MONGO_URL` | ✅ Yes | None | MongoDB connection string from MongoDB Atlas or local instance | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `DB_NAME` | ✅ Yes | None | Name of the MongoDB database to use | `performance_manager` |
| `CORS_ORIGINS` | ✅ Yes | `http://localhost:3000` | Comma-separated list of allowed frontend origins for CORS | `http://localhost:3000,https://app.vercel.app` |
| `ENVIRONMENT` | No | `development` | Application environment (development/production) | `production` |
| `API_VERSION` | No | `1.0.0` | API version number for documentation | `1.0.0` |
| `API_TITLE` | No | `Committee Performance Dashboard API` | API title for documentation | `Committee Performance Dashboard API` |
| `LOG_LEVEL` | No | `INFO` | Logging level (DEBUG/INFO/WARNING/ERROR) | `INFO` |
| `PYTHON_VERSION` | No | System default | Python version to use (for deployment platforms) | `3.11.0` |

### Backend .env Example (Development)

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017/
# or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Database
DB_NAME=performance_manager

# CORS (allow local frontend)
CORS_ORIGINS=http://localhost:3000

# Environment
ENVIRONMENT=development

# Logging
LOG_LEVEL=DEBUG
```

### Backend .env Example (Production)

```env
# MongoDB Configuration (MongoDB Atlas)
MONGO_URL=mongodb+srv://prod-user:SecureP@ssw0rd@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# Database
DB_NAME=performance_manager

# CORS (production frontend URLs)
CORS_ORIGINS=https://your-app.vercel.app,https://www.yourdomain.com

# Environment
ENVIRONMENT=production

# API Configuration
API_VERSION=1.0.0
API_TITLE=Committee Performance Dashboard API

# Logging
LOG_LEVEL=INFO

# Python Version (for Render)
PYTHON_VERSION=3.11.0
```

---

## Frontend Environment Variables

Located in: `frontend/.env`

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `REACT_APP_BACKEND_URL` | ✅ Yes | `http://localhost:8001` (dev only) | Full URL to the backend API server (without trailing slash) | `https://backend.onrender.com` |

### Frontend .env Example (Development)

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Frontend .env Example (Production)

```env
# Backend API URL (your Render backend URL)
REACT_APP_BACKEND_URL=https://performance-manager-backend.onrender.com
```

---

## Platform-Specific Configuration

### Render.com (Backend)

Set these in **Render Dashboard → Service → Environment**:

```
MONGO_URL=mongodb+srv://...
DB_NAME=performance_manager
CORS_ORIGINS=https://your-app.vercel.app
ENVIRONMENT=production
API_VERSION=1.0.0
LOG_LEVEL=INFO
PYTHON_VERSION=3.11.0
```

**Important Notes:**
- Click "Save Changes" after adding/updating variables
- Service will automatically redeploy when variables change
- Use "Secret" option for sensitive variables like `MONGO_URL`

### Vercel (Frontend)

Set these in **Vercel Dashboard → Project → Settings → Environment Variables**:

```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

**Important Notes:**
- Add variables for all environments (Production, Preview, Development)
- Must start with `REACT_APP_` prefix to be available in React
- Requires new deployment after adding/changing variables
- No trailing slash in the URL

---

## MongoDB Connection Strings

### Local MongoDB

```env
MONGO_URL=mongodb://localhost:27017/
```

### MongoDB Atlas (Cloud)

**Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

**Example:**
```env
MONGO_URL=mongodb+srv://myuser:MyP@ssw0rd123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

**Getting your connection string:**
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Optionally add `/<database-name>` before the `?` to specify default database

**Security Notes:**
- Never commit connection strings to Git
- Use strong passwords (letters, numbers, special characters)
- Rotate passwords regularly
- URL-encode special characters in passwords

---

## CORS Configuration

CORS (Cross-Origin Resource Sharing) controls which domains can access your API.

### Development
```env
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Production
```env
CORS_ORIGINS=https://your-app.vercel.app,https://www.yourdomain.com
```

**Rules:**
- Multiple origins: separate with commas (no spaces)
- Include protocol: `https://` or `http://`
- No trailing slash
- Exact match required (subdomains are different)
- **Never use** `*` (wildcard) in production

**Examples:**
```env
# ✅ Correct
CORS_ORIGINS=https://app.vercel.app,https://www.example.com

# ❌ Wrong
CORS_ORIGINS=app.vercel.app                    # Missing protocol
CORS_ORIGINS=https://app.vercel.app/           # Has trailing slash
CORS_ORIGINS=https://app.vercel.app, https://example.com  # Has space
CORS_ORIGINS=*                                 # Wildcard (insecure)
```

---

## Environment Variable Best Practices

### Security
- ✅ Never commit `.env` files to Git
- ✅ Use `.env.example` as templates without sensitive data
- ✅ Use different credentials for dev/staging/prod
- ✅ Rotate sensitive credentials regularly
- ✅ Use secrets management in production platforms
- ❌ Don't share `.env` files via email/chat
- ❌ Don't log environment variables
- ❌ Don't hardcode secrets in code

### Organization
- Use clear, descriptive variable names
- Group related variables together
- Add comments explaining non-obvious values
- Keep `.env.example` up to date
- Document all variables in this file

### Development
- Create local `.env` from `.env.example`
- Test with production-like values when possible
- Use different database for dev/prod
- Keep development simple (no authentication, etc.)

### Production
- Set variables in platform dashboards, not files
- Use platform's secret/encrypted storage
- Verify variables before first deployment
- Test after changing any variable
- Keep backup of variable values (securely)

---

## Troubleshooting

### Backend can't connect to MongoDB

**Symptoms:** "database": "disconnected" in `/health`

**Check:**
- `MONGO_URL` is correct and properly formatted
- Password doesn't contain unescaped special characters
- MongoDB Atlas network access allows your IP (0.0.0.0/0 for all)
- Database user exists and has correct permissions
- Cluster is active (not paused)

### Frontend can't reach backend

**Symptoms:** Network errors, CORS errors

**Check:**
- `REACT_APP_BACKEND_URL` is correct
- Backend URL includes `https://` protocol
- No trailing slash in backend URL
- Backend is running (check `/health` endpoint)
- `CORS_ORIGINS` in backend includes frontend URL exactly

### Changes not taking effect

**Backend (Render):**
- Changes require service redeployment
- Wait 2-3 minutes after saving variables
- Check deploy logs for errors

**Frontend (Vercel):**
- Variables only apply to new deployments
- Go to Deployments tab and redeploy
- Or push a new commit to trigger build

### Variables not loading

**Backend:**
- Ensure `.env` file exists in `backend/` directory
- Check file name is exactly `.env` (not `.env.txt`)
- Variables must be in format: `KEY=value` (no spaces around `=`)

**Frontend:**
- Variables must start with `REACT_APP_`
- Restart development server after changing `.env`
- Clear cache: `npm cache clean --force`

---

## Quick Reference Card

Print or bookmark this for quick access:

```
┌─────────────────────────────────────────────────────────┐
│ BACKEND (.env)                                          │
├─────────────────────────────────────────────────────────┤
│ MONGO_URL        → mongodb+srv://user:pass@cluster/    │
│ DB_NAME          → performance_manager                  │
│ CORS_ORIGINS     → https://your-app.vercel.app         │
│ ENVIRONMENT      → production                           │
│ LOG_LEVEL        → INFO                                 │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FRONTEND (.env)                                         │
├─────────────────────────────────────────────────────────┤
│ REACT_APP_BACKEND_URL → https://backend.onrender.com   │
└─────────────────────────────────────────────────────────┘
```

---

**Need help?** Check:
- [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- [LOCAL_SETUP.md](./LOCAL_SETUP.md) for development setup
- Platform documentation (Render, Vercel, MongoDB Atlas)
