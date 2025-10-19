# Local Development Setup

This document helps you set up the project for local development.

## Prerequisites

- **Node.js** 16+ and npm/yarn
- **Python** 3.11+
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/rahul5002/Performance-Manager.git
cd Performance-Manager
```

### 2. Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Edit .env and add your MongoDB connection string
# MONGO_URL=mongodb://localhost:27017/  # For local MongoDB
# or
# MONGO_URL=mongodb+srv://... # For MongoDB Atlas
```

### 3. Set Up Frontend

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Copy environment template
cp .env.example .env

# Edit .env (default should work for local development)
# REACT_APP_BACKEND_URL=http://localhost:8001
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
# Activate venv if not already activated
uvicorn server:app --reload --port 8001
```

Backend will run on: http://localhost:8001
- API Documentation: http://localhost:8001/docs
- Health Check: http://localhost:8001/health

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# or
yarn start
```

Frontend will run on: http://localhost:3000

### 5. Verify Everything Works

1. Open http://localhost:3000
2. You should see the Committee Performance Dashboard
3. Sample data should be loaded automatically
4. Try adding, editing, and deleting members

## Development Workflow

### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Test locally

4. Commit and push:
```bash
git add .
git commit -m "Description of changes"
git push origin feature/your-feature-name
```

5. Create a Pull Request on GitHub

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

### Code Formatting

**Backend (Python):**
```bash
cd backend
black .
isort .
flake8 .
```

**Frontend (JavaScript/React):**
```bash
cd frontend
npm run lint
npm run format
```

## Troubleshooting

### Backend won't start

- Check Python version: `python --version` (should be 3.11+)
- Verify virtual environment is activated
- Check MongoDB connection in `.env`
- View error logs in terminal

### Frontend won't start

- Check Node version: `node --version` (should be 16+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`
- Check port 3000 is not in use

### Database connection fails

- Verify MongoDB is running (if local)
- Check `MONGO_URL` in `backend/.env`
- For MongoDB Atlas, verify:
  - Network access allows your IP
  - Database user credentials are correct
  - Connection string format is correct

### CORS errors

- Ensure backend is running on port 8001
- Check `CORS_ORIGINS` in `backend/.env` includes `http://localhost:3000`
- Restart backend after changing environment variables

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Deployment Guide](./DEPLOYMENT.md)

## Project Structure

```
Performance-Manager/
├── backend/
│   ├── server.py           # Main FastAPI application
│   ├── database.py         # MongoDB connection
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example        # Environment template
│   ├── models/             # Pydantic models
│   └── routes/             # API endpoints
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── public/
│   ├── package.json        # Node dependencies
│   └── .env.example        # Environment template
├── tests/                  # Test files
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # Project overview
```

## Need Help?

- Check the [Deployment Guide](./DEPLOYMENT.md) for production setup
- Open an issue on GitHub
- Review API documentation at http://localhost:8001/docs
