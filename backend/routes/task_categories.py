from fastapi import APIRouter, HTTPException, status
from typing import List
from models.committee_member import TaskCategory
import logging

router = APIRouter(prefix="/task-categories", tags=["task-categories"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[TaskCategory])
async def get_task_categories():
    """Get task categories with completion data (static for now)"""
    try:
        # Static task categories (can be made dynamic later)
        categories = [
            TaskCategory(category="Event Planning", completed=25, pending=8, total=33),
            TaskCategory(category="Marketing", completed=18, pending=5, total=23),
            TaskCategory(category="Outreach", completed=22, pending=4, total=26),
            TaskCategory(category="Administration", completed=15, pending=7, total=22)
        ]
        
        return categories
        
    except Exception as e:
        logger.error(f"Error fetching task categories: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch task categories"
        )