from fastapi import APIRouter, HTTPException, status
from typing import List
from models.committee_member import OverviewMetrics, TaskCategory, RegistrationData, CommitteeMember
from server import db
import logging
from datetime import datetime

router = APIRouter(prefix="/analytics", tags=["analytics"])
logger = logging.getLogger(__name__)

@router.get("/overview", response_model=OverviewMetrics)
async def get_overview_metrics():
    """Get dashboard overview metrics"""
    try:
        # Fetch all members
        members_cursor = db.committee_members.find()
        members_data = await members_cursor.to_list(1000)
        
        if not members_data:
            return OverviewMetrics(
                totalMembers=0,
                totalTasksCompleted=0,
                totalTasksPending=0,
                totalRegistrations=0,
                avgEfficiency=0,
                topPerformer=None
            )
        
        # Convert to CommitteeMember objects
        members = []
        for member_data in members_data:
            member_data["id"] = str(member_data["_id"])
            del member_data["_id"]
            member = CommitteeMember(**member_data)
            member.calculate_total_tasks()
            members.append(member)
        
        # Calculate metrics
        total_members = len(members)
        total_tasks_completed = sum(member.tasksCompleted for member in members)
        total_tasks_pending = sum(member.tasksPending for member in members)
        total_registrations = sum(member.registrationsBrought for member in members)
        avg_efficiency = round(sum(member.efficiency for member in members) / total_members) if total_members > 0 else 0
        
        # Find top performer
        top_performer = max(members, key=lambda m: m.efficiency) if members else None
        
        return OverviewMetrics(
            totalMembers=total_members,
            totalTasksCompleted=total_tasks_completed,
            totalTasksPending=total_tasks_pending,
            totalRegistrations=total_registrations,
            avgEfficiency=avg_efficiency,
            topPerformer=top_performer
        )
        
    except Exception as e:
        logger.error(f"Error fetching overview metrics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch overview metrics"
        )

@router.get("/tasks", response_model=dict)
async def get_task_analytics():
    """Get task analytics data"""
    try:
        # Fetch all members
        members_cursor = db.committee_members.find()
        members_data = await members_cursor.to_list(1000)
        
        # Convert to CommitteeMember objects
        members = []
        for member_data in members_data:
            member_data["id"] = str(member_data["_id"])
            del member_data["_id"]
            member = CommitteeMember(**member_data)
            member.calculate_total_tasks()
            members.append(member)
        
        # Calculate task metrics
        total_tasks = sum(member.totalTasks for member in members)
        completed_tasks = sum(member.tasksCompleted for member in members)
        pending_tasks = sum(member.tasksPending for member in members)
        completion_rate = round((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0
        avg_efficiency = round(sum(member.efficiency for member in members) / len(members)) if members else 0
        
        # Rank members by efficiency
        ranked_members = sorted(members, key=lambda m: m.efficiency, reverse=True)
        
        return {
            "totalTasks": total_tasks,
            "completedTasks": completed_tasks,
            "pendingTasks": pending_tasks,
            "completionRate": completion_rate,
            "avgEfficiency": avg_efficiency,
            "rankedMembers": [
                {
                    "id": member.id,
                    "name": member.name,
                    "role": member.role,
                    "efficiency": member.efficiency,
                    "tasksCompleted": member.tasksCompleted,
                    "totalTasks": member.totalTasks,
                    "registrationsBrought": member.registrationsBrought,
                    "rank": idx + 1
                }
                for idx, member in enumerate(ranked_members)
            ]
        }
        
    except Exception as e:
        logger.error(f"Error fetching task analytics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch task analytics"
        )

@router.get("/registrations", response_model=dict)
async def get_registration_metrics():
    """Get registration metrics data"""
    try:
        # Fetch all members
        members_cursor = db.committee_members.find()
        members_data = await members_cursor.to_list(1000)
        
        # Convert to CommitteeMember objects
        members = []
        for member_data in members_data:
            member_data["id"] = str(member_data["_id"])
            del member_data["_id"]
            member = CommitteeMember(**member_data)
            members.append(member)
        
        if not members:
            return {
                "totalRegistrations": 0,
                "avgRegistrationsPerMember": 0,
                "topPerformer": None,
                "registrationTiers": [],
                "monthlyData": [
                    {"month": "Jan", "registrations": 0},
                    {"month": "Feb", "registrations": 0},
                    {"month": "Mar", "registrations": 0}
                ]
            }
        
        # Calculate registration metrics
        total_registrations = sum(member.registrationsBrought for member in members)
        avg_registrations = round(total_registrations / len(members))
        top_performer = max(members, key=lambda m: m.registrationsBrought)
        
        # Create registration tiers
        registration_tiers = []
        sorted_members = sorted(members, key=lambda m: m.registrationsBrought, reverse=True)
        
        for idx, member in enumerate(sorted_members):
            tier = "Bronze"
            tier_color = "bg-orange-100 text-orange-800"
            
            if member.registrationsBrought >= 15:
                tier = "Platinum"
                tier_color = "bg-purple-100 text-purple-800"
            elif member.registrationsBrought >= 12:
                tier = "Gold"
                tier_color = "bg-yellow-100 text-yellow-800"
            elif member.registrationsBrought >= 8:
                tier = "Silver"
                tier_color = "bg-gray-100 text-gray-800"
            
            registration_tiers.append({
                "id": member.id,
                "name": member.name,
                "role": member.role,
                "registrationsBrought": member.registrationsBrought,
                "tier": tier,
                "tierColor": tier_color,
                "percentage": round((member.registrationsBrought / total_registrations) * 100, 1) if total_registrations > 0 else 0
            })
        
        # Mock monthly data (can be replaced with actual historical data later)
        monthly_data = [
            {"month": "Jan", "registrations": 35},
            {"month": "Feb", "registrations": 42},
            {"month": "Mar", "registrations": total_registrations}
        ]
        
        return {
            "totalRegistrations": total_registrations,
            "avgRegistrationsPerMember": avg_registrations,
            "topPerformer": {
                "name": top_performer.name,
                "registrationsBrought": top_performer.registrationsBrought
            },
            "registrationTiers": registration_tiers,
            "monthlyData": monthly_data
        }
        
    except Exception as e:
        logger.error(f"Error fetching registration metrics: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch registration metrics"
        )