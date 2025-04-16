from sqlalchemy.orm import Session
from app import model, schema
from datetime import datetime
import uuid
from sqlalchemy import func, extract

def generate_task_id(db: Session):
    count = db.query(func.count(model.Task.id)).scalar()
    return f"TASK-{1000 + count}"

def generate_worker_id(db: Session):
    count = db.query(func.count(model.Worker.id)).scalar()
    return f"worker-{count + 1}"

def create_task(db: Session, task: schema.TaskCreate):
    db_task = model.Task(
        task_id=generate_task_id(db),
        location=task.location,
        latitude=task.coordinates.lat,
        longitude=task.coordinates.lng,
        description=task.description,
        priority=task.priority,
        status="pending"
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task(db: Session, task_id: int):
    return db.query(model.Task).filter(model.Task.id == task_id).first()

def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Task).order_by(model.Task.created_at.desc()).offset(skip).limit(limit).all()

def update_task(db: Session, task_id: int, task_update: schema.TaskUpdate):
    db_task = db.query(model.Task).filter(model.Task.id == task_id).first()
    if not db_task:
        return None
    
    if task_update.status:
        db_task.status = task_update.status
        if task_update.status == "completed":
            db_task.completed_at = datetime.now()
    
    if task_update.assigned_to:
        db_task.assigned_to = task_update.assigned_to
    
    db.commit()
    db.refresh(db_task)
    return db_task

def create_worker(db: Session, worker: schema.WorkerCreate):
    db_worker = model.Worker(
        worker_id=generate_worker_id(db),
        name=worker.name,
        email=worker.email,
        phone=worker.phone,
        location=worker.location,
        status="available",
        tasks_completed=0
    )
    db.add(db_worker)
    db.commit()
    db.refresh(db_worker)
    return db_worker

def get_worker(db: Session, worker_id: int):
    return db.query(model.Worker).filter(model.Worker.id == worker_id).first()

def get_workers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Worker).order_by(model.Worker.name).offset(skip).limit(limit).all()

def update_worker(db: Session, worker_id: int, worker_update: schema.WorkerUpdate):
    db_worker = db.query(model.Worker).filter(model.Worker.id == worker_id).first()
    if not db_worker:
        return None
    
    if worker_update.status:
        db_worker.status = worker_update.status
    
    if worker_update.current_task:
        db_worker.current_task = worker_update.current_task
    
    db.commit()
    db.refresh(db_worker)
    return db_worker

def get_dashboard_stats(db: Session):
    # Total counts
    total_tasks = db.query(func.count(model.Task.id)).scalar()
    pending_tasks = db.query(func.count(model.Task.id)).filter(model.Task.status == "pending").scalar()
    in_progress_tasks = db.query(func.count(model.Task.id)).filter(model.Task.status == "in-progress").scalar()
    completed_tasks = db.query(func.count(model.Task.id)).filter(model.Task.status == "completed").scalar()
    
    # Last 7 days overview
    days = []
    for i in range(6, -1, -1):
        day = func.date(func.date_sub(func.now(), i))
        day_name = func.dayname(day)
        
        day_stats = db.query(
            day_name.label("name"),
            func.sum(func.if_(model.Task.status == "pending", 1, 0)).label("pending"),
            func.sum(func.if_(model.Task.status == "in-progress", 1, 0)).label("in_progress"),
            func.sum(func.if_(model.Task.status == "completed", 1, 0)).label("completed")
        ).filter(
            func.date(model.Task.created_at) == func.date(func.date_sub(func.now(), i))
        ).group_by(day_name).first()
        
        if day_stats:
            days.append({
                "name": day_stats.name,
                "pending": day_stats.pending or 0,
                "in_progress": day_stats.in_progress or 0,
                "completed": day_stats.completed or 0
            })
        else:
            days.append({
                "name": day_name,
                "pending": 0,
                "in_progress": 0,
                "completed": 0
            })
    
    return {
        "total_tasks": total_tasks,
        "pending_tasks": pending_tasks,
        "in_progress_tasks": in_progress_tasks,
        "completed_tasks": completed_tasks,
        "tasks_overview": days
    }