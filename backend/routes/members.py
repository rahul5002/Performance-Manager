from fastapi import APIRouter, HTTPException, status
from typing import List
from models.committee_member import CommitteeMember, CommitteeMemberCreate, CommitteeMemberUpdate
from motor.motor_asyncio import AsyncIOMotorDatabase
from server import db
import logging
from datetime import datetime

router = APIRouter(prefix="/members", tags=["members"])
logger = logging.getLogger(__name__)

@router.get("/", response_model=List[CommitteeMember])
async def get_all_members():
    """Get all committee members"""
    try:
        members_cursor = db.committee_members.find()
        members_data = await members_cursor.to_list(1000)
        
        members = []
        for member_data in members_data:
            # Convert MongoDB _id to id
            if "_id" in member_data:
                member_data["id"] = str(member_data["_id"])
                del member_data["_id"]
            
            member = CommitteeMember(**member_data)
            member.calculate_total_tasks()
            members.append(member)
        
        return members
    except Exception as e:
        logger.error(f"Error fetching members: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch committee members"
        )

@router.post("/", response_model=CommitteeMember, status_code=status.HTTP_201_CREATED)
async def create_member(member_data: CommitteeMemberCreate):
    """Create a new committee member"""
    try:
        # Create member instance
        member = CommitteeMember(**member_data.dict())
        member.calculate_total_tasks()
        
        # Convert to dict for MongoDB
        member_dict = member.dict()
        member_dict["_id"] = member_dict.pop("id")  # Use id as _id for MongoDB
        
        # Insert into database
        result = await db.committee_members.insert_one(member_dict)
        
        # Return created member
        member.id = str(result.inserted_id)
        return member
        
    except Exception as e:
        logger.error(f"Error creating member: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create committee member"
        )

@router.get("/{member_id}", response_model=CommitteeMember)
async def get_member(member_id: str):
    """Get a specific committee member by ID"""
    try:
        member_data = await db.committee_members.find_one({"_id": member_id})
        
        if not member_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Committee member not found"
            )
        
        # Convert MongoDB _id to id
        member_data["id"] = str(member_data["_id"])
        del member_data["_id"]
        
        member = CommitteeMember(**member_data)
        member.calculate_total_tasks()
        return member
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching member {member_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch committee member"
        )

@router.put("/{member_id}", response_model=CommitteeMember)
async def update_member(member_id: str, member_update: CommitteeMemberUpdate):
    """Update a committee member"""
    try:
        # Check if member exists
        existing_member = await db.committee_members.find_one({"_id": member_id})
        if not existing_member:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Committee member not found"
            )
        
        # Prepare update data
        update_data = {k: v for k, v in member_update.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        
        # Calculate total tasks if task data is updated
        if "tasksCompleted" in update_data or "tasksPending" in update_data:
            tasks_completed = update_data.get("tasksCompleted", existing_member.get("tasksCompleted", 0))
            tasks_pending = update_data.get("tasksPending", existing_member.get("tasksPending", 0))
            update_data["totalTasks"] = tasks_completed + tasks_pending
        
        # Update in database
        result = await db.committee_members.update_one(
            {"_id": member_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No changes were made"
            )
        
        # Return updated member
        updated_member_data = await db.committee_members.find_one({"_id": member_id})
        updated_member_data["id"] = str(updated_member_data["_id"])
        del updated_member_data["_id"]
        
        updated_member = CommitteeMember(**updated_member_data)
        updated_member.calculate_total_tasks()
        return updated_member
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating member {member_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update committee member"
        )

@router.delete("/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_member(member_id: str):
    """Delete a committee member"""
    try:
        result = await db.committee_members.delete_one({"_id": member_id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Committee member not found"
            )
        
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting member {member_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete committee member"
        )