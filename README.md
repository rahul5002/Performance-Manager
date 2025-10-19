# Committee Performance Dashboard

A full-stack web application for tracking committee member performance, task completion, and event registrations.

## 🚀 Features

- **Member Management**: Add, edit, and delete committee members
- **Performance Tracking**: Monitor task completion rates and efficiency scores
- **Analytics Dashboard**: Visualize performance metrics and trends
- **Registration Metrics**: Track event registrations by member
- **Real-time Updates**: Live data synchronization with MongoDB

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Tailwind CSS
- Radix UI Components
- Axios for API calls

**Backend:**
- FastAPI (Python)
- MongoDB with Motor (async driver)
- Pydantic for data validation

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Step-by-step production deployment instructions
- **[Local Setup Guide](./LOCAL_SETUP.md)** - Development environment setup

## 🚀 Quick Start

### For Local Development

See the [Local Setup Guide](./LOCAL_SETUP.md) for detailed instructions.

**Quick version:**

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB connection
uvicorn server:app --reload --port 8001

# Frontend (in a new terminal)
cd frontend
npm install
cp .env.example .env
npm start
```

### For Production Deployment

See the [Deployment Guide](./DEPLOYMENT.md) for complete instructions on deploying to:
- **Frontend**: Vercel
- **Backend**: Render.com
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
Performance-Manager/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── database.py            # MongoDB connection
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   ├── models/               # Pydantic models
│   │   └── committee_member.py
│   └── routes/               # API endpoints
│       ├── members.py        # Member CRUD operations
│       ├── analytics.py      # Analytics endpoints
│       └── task_categories.py
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MemberManagement.jsx
│   │   │   ├── TaskAnalytics.jsx
│   │   │   └── RegistrationMetrics.jsx
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example         # Environment variables template
│   └── vercel.json          # Vercel configuration
├── tests/                    # Test files
├── render.yaml              # Render.com configuration
├── DEPLOYMENT.md            # Deployment guide
├── LOCAL_SETUP.md           # Local setup guide
└── README.md                # This file
```

## 🔌 API Endpoints

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/members/{id}` - Get specific member
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member

### Analytics
- `GET /api/analytics/overview` - Dashboard overview metrics
- `GET /api/analytics/tasks` - Task analytics data
- `GET /api/analytics/registrations` - Registration metrics

### System
- `GET /health` - Health check endpoint
- `GET /docs` - API documentation (development only)

## 🌍 Environment Variables

### Backend (.env)

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=performance_manager
CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app
ENVIRONMENT=development
```

### Frontend (.env)

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

See `.env.example` files in each directory for complete configuration options.

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment Status

Once deployed, you can monitor your application:

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Health Check**: https://your-backend.onrender.com/health
- **API Docs**: https://your-backend.onrender.com/docs (if enabled)

## 📊 Features Overview

### Dashboard
- Overview of total members, tasks, and registrations
- Average efficiency score
- Top performer highlight

### Member Management
- Add new committee members
- Edit member information
- Delete members
- View member performance history

### Task Analytics
- Task completion rates
- Member performance rankings
- Category-wise task breakdown
- Efficiency trends

### Registration Metrics
- Total registrations tracked
- Member-wise registration breakdown
- Performance tiers (Platinum, Gold, Silver, Bronze)
- Monthly registration trends

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: Check [DEPLOYMENT.md](./DEPLOYMENT.md) and [LOCAL_SETUP.md](./LOCAL_SETUP.md)
- **Issues**: Open an issue on GitHub
- **API Docs**: Visit `/docs` endpoint when running locally

## 🔐 Security Notes

- Never commit `.env` files
- Use strong passwords for MongoDB
- Configure CORS origins properly for production
- Keep dependencies updated
- Use HTTPS in production
- Implement rate limiting for production use

## 🗺️ Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement role-based access control
- [ ] Add email notifications
- [ ] Create data export functionality
- [ ] Add real-time websocket updates
- [ ] Implement comprehensive testing suite
- [ ] Add CI/CD pipeline
- [ ] Create admin dashboard
- [ ] Add audit logging
- [ ] Implement data backup automation

---

**Built with ❤️ using React and FastAPI**

