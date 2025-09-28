from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path

# Import database and route modules
from database import db, client
from routes import members, analytics, task_categories

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Committee Performance Dashboard API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Committee Performance Dashboard API is running!"}

# Include route modules
api_router.include_router(members.router)
api_router.include_router(analytics.router)
api_router.include_router(task_categories.router)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Startup event to initialize database with sample data
@app.on_event("startup")
async def startup_db_client():
    try:
        # Check if we have any existing members
        existing_count = await db.committee_members.count_documents({})
        
        if existing_count == 0:
            # Initialize with sample data
            sample_members = [
                {
                    "_id": "1",
                    "name": "Sarah Johnson",
                    "role": "Team Lead",
                    "contact": "sarah.johnson@email.com",
                    "phone": "+1 (555) 123-4567",
                    "tasksCompleted": 15,
                    "tasksPending": 3,
                    "totalTasks": 18,
                    "efficiency": 85,
                    "registrationsBrought": 12,
                    "performanceHistory": [
                        {"month": "Jan", "score": 78},
                        {"month": "Feb", "score": 82},
                        {"month": "Mar", "score": 85}
                    ],
                    "createdAt": "2024-01-01T00:00:00Z",
                    "updatedAt": "2024-03-01T00:00:00Z"
                },
                {
                    "_id": "2",
                    "name": "Michael Chen",
                    "role": "Marketing Coordinator",
                    "contact": "michael.chen@email.com",
                    "phone": "+1 (555) 234-5678",
                    "tasksCompleted": 22,
                    "tasksPending": 5,
                    "totalTasks": 27,
                    "efficiency": 92,
                    "registrationsBrought": 18,
                    "performanceHistory": [
                        {"month": "Jan", "score": 88},
                        {"month": "Feb", "score": 90},
                        {"month": "Mar", "score": 92}
                    ],
                    "createdAt": "2024-01-01T00:00:00Z",
                    "updatedAt": "2024-03-01T00:00:00Z"
                },
                {
                    "_id": "3",
                    "name": "Emily Rodriguez",
                    "role": "Event Coordinator",
                    "contact": "emily.rodriguez@email.com",
                    "phone": "+1 (555) 345-6789",
                    "tasksCompleted": 11,
                    "tasksPending": 7,
                    "totalTasks": 18,
                    "efficiency": 72,
                    "registrationsBrought": 8,
                    "performanceHistory": [
                        {"month": "Jan", "score": 75},
                        {"month": "Feb", "score": 70},
                        {"month": "Mar", "score": 72}
                    ],
                    "createdAt": "2024-01-01T00:00:00Z",
                    "updatedAt": "2024-03-01T00:00:00Z"
                },
                {
                    "_id": "4",
                    "name": "David Kim",
                    "role": "Outreach Specialist",
                    "contact": "david.kim@email.com",
                    "phone": "+1 (555) 456-7890",
                    "tasksCompleted": 19,
                    "tasksPending": 2,
                    "totalTasks": 21,
                    "efficiency": 88,
                    "registrationsBrought": 15,
                    "performanceHistory": [
                        {"month": "Jan", "score": 85},
                        {"month": "Feb", "score": 87},
                        {"month": "Mar", "score": 88}
                    ],
                    "createdAt": "2024-01-01T00:00:00Z",
                    "updatedAt": "2024-03-01T00:00:00Z"
                },
                {
                    "_id": "5",
                    "name": "Lisa Thompson",
                    "role": "Communications Manager",
                    "contact": "lisa.thompson@email.com",
                    "phone": "+1 (555) 567-8901",
                    "tasksCompleted": 13,
                    "tasksPending": 4,
                    "totalTasks": 17,
                    "efficiency": 79,
                    "registrationsBrought": 10,
                    "performanceHistory": [
                        {"month": "Jan", "score": 76},
                        {"month": "Feb", "score": 78},
                        {"month": "Mar", "score": 79}
                    ],
                    "createdAt": "2024-01-01T00:00:00Z",
                    "updatedAt": "2024-03-01T00:00:00Z"
                }
            ]
            
            await db.committee_members.insert_many(sample_members)
            logger.info("Initialized database with sample committee members")
        
    except Exception as e:
        logger.error(f"Error during startup: {str(e)}")