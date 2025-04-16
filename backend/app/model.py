from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String, unique=True, index=True)  # Formatted as TASK-1234
    location = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default='pending')  # pending, in-progress, completed
    description = Column(String)
    priority = Column(String)  # low, medium, high
    assigned_to = Column(String, nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    worker_id = Column(Integer, ForeignKey('workers.id'), nullable=True)
    worker = relationship("Worker", back_populates="tasks")

class Worker(Base):
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(String, unique=True, index=True)  # Formatted as worker-1
    name = Column(String)
    email = Column(String, unique=True)
    phone = Column(String)
    location = Column(String)
    status = Column(String, default='available')  # available, busy, offline
    tasks_completed = Column(Integer, default=0)
    current_task = Column(String, nullable=True)
    
    # Relationships
    tasks = relationship("Task", back_populates="worker")