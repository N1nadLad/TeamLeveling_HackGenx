from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class Coordinates(BaseModel):
    lat: float
    lng: float

class TaskBase(BaseModel):
    location: str
    coordinates: Coordinates
    description: str
    priority: str

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    task_id: str
    created_at: datetime
    status: str
    assigned_to: Optional[str] = None
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class WorkerBase(BaseModel):
    name: str
    email: str
    phone: str
    location: str

class WorkerCreate(WorkerBase):
    pass

class WorkerResponse(WorkerBase):
    id: int
    worker_id: str
    status: str
    tasks_completed: int
    current_task: Optional[str] = None
    
    class Config:
        from_attributes = True

class TaskUpdate(BaseModel):
    status: Optional[str] = None
    assigned_to: Optional[str] = None

class WorkerUpdate(BaseModel):
    status: Optional[str] = None
    current_task: Optional[str] = None

class DashboardStats(BaseModel):
    total_tasks: int
    pending_tasks: int
    in_progress_tasks: int
    completed_tasks: int
    tasks_overview: List[dict]

class TaskOverviewDay(BaseModel):
    name: str
    pending: int
    in_progress: int
    completed: int