from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

class PerformanceHistory(BaseModel):
    month: str
    score: int = Field(..., ge=0, le=100)

class CommitteeMemberBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    role: str = Field(..., min_length=1, max_length=50)
    contact: EmailStr
    phone: Optional[str] = None
    tasksCompleted: int = Field(default=0, ge=0)
    tasksPending: int = Field(default=0, ge=0)
    efficiency: int = Field(default=0, ge=0, le=100)
    registrationsBrought: int = Field(default=0, ge=0)
    performanceHistory: List[PerformanceHistory] = Field(default=[])

class CommitteeMemberCreate(CommitteeMemberBase):
    pass

class CommitteeMemberUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    role: Optional[str] = Field(None, min_length=1, max_length=50)
    contact: Optional[EmailStr] = None
    phone: Optional[str] = None
    tasksCompleted: Optional[int] = Field(None, ge=0)
    tasksPending: Optional[int] = Field(None, ge=0)
    efficiency: Optional[int] = Field(None, ge=0, le=100)
    registrationsBrought: Optional[int] = Field(None, ge=0)
    performanceHistory: Optional[List[PerformanceHistory]] = None

class CommitteeMember(CommitteeMemberBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    totalTasks: int = Field(default=0)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    def calculate_total_tasks(self):
        self.totalTasks = self.tasksCompleted + self.tasksPending
        return self.totalTasks

class TaskCategory(BaseModel):
    category: str
    completed: int = Field(default=0, ge=0)
    pending: int = Field(default=0, ge=0)
    total: int = Field(default=0, ge=0)

class OverviewMetrics(BaseModel):
    totalMembers: int
    totalTasksCompleted: int
    totalTasksPending: int
    totalRegistrations: int
    avgEfficiency: int
    topPerformer: Optional[CommitteeMember] = None

class RegistrationData(BaseModel):
    month: str
    registrations: int = Field(..., ge=0)