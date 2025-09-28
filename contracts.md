# Committee Performance Dashboard - API Contracts

## Overview
This document defines the API contracts and integration plan for the Committee Performance Dashboard backend.

## Database Models

### CommitteeMember
```javascript
{
  _id: ObjectId,
  name: String (required),
  role: String (required),
  contact: String (required, email),
  phone: String (optional),
  tasksCompleted: Number (default: 0),
  tasksPending: Number (default: 0),
  totalTasks: Number (computed: tasksCompleted + tasksPending),
  efficiency: Number (0-100, default: 0),
  registrationsBrought: Number (default: 0),
  performanceHistory: [
    {
      month: String,
      score: Number
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Member Management
- `GET /api/members` - Get all committee members
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member information
- `DELETE /api/members/:id` - Delete member
- `GET /api/members/:id` - Get specific member

### Performance Analytics
- `GET /api/analytics/overview` - Get dashboard overview metrics
- `GET /api/analytics/tasks` - Get task analytics data
- `GET /api/analytics/registrations` - Get registration metrics

### Task Categories (Static for now)
- `GET /api/task-categories` - Get task categories with completion data

## Mock Data Replacement Plan

### Frontend Files to Update:
1. `src/components/Dashboard.jsx` - Replace mock data with API calls
2. `src/components/PerformanceOverview.jsx` - Fetch analytics data
3. `src/components/MemberManagement.jsx` - Use member CRUD endpoints
4. `src/components/TaskAnalytics.jsx` - Fetch task analytics
5. `src/components/RegistrationMetrics.jsx` - Fetch registration data

### Mock Data Mappings:
- `mockCommitteeMembers` → `GET /api/members`
- `mockTaskCategories` → `GET /api/task-categories`
- `mockRegistrationData` → `GET /api/analytics/registrations`

## Integration Steps:
1. Implement MongoDB models and schemas
2. Create CRUD endpoints for members
3. Implement analytics endpoints
4. Update frontend components to use actual APIs
5. Remove mock data files
6. Test all functionality

## Error Handling:
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
- Proper error messages for frontend display

## Performance Considerations:
- Pagination for member lists (if needed)
- Aggregation pipelines for analytics
- Efficient queries for dashboard metrics