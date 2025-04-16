from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import model, schema, crud
from app.database import SessionLocal, engine
from typing import List
from fastapi.middleware.cors import CORSMiddleware

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Tasks endpoints
@app.post("/api/tasks", response_model=schema.TaskResponse)
def create_task(task: schema.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@app.get("/api/tasks", response_model=List[schema.TaskResponse])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_tasks(db, skip=skip, limit=limit)

@app.get("/api/tasks/{task_id}", response_model=schema.TaskResponse)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.patch("/api/tasks/{task_id}", response_model=schema.TaskResponse)
def update_task(
    task_id: int, 
    task_update: schema.TaskUpdate, 
    db: Session = Depends(get_db)
):
    db_task = crud.update_task(db, task_id=task_id, task_update=task_update)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# Workers endpoints
@app.post("/api/workers", response_model=schema.WorkerResponse)
def create_worker(worker: schema.WorkerCreate, db: Session = Depends(get_db)):
    return crud.create_worker(db, worker)

@app.get("/api/workers", response_model=List[schema.WorkerResponse])
def read_workers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_workers(db, skip=skip, limit=limit)

@app.get("/api/workers/{worker_id}", response_model=schema.WorkerResponse)
def read_worker(worker_id: int, db: Session = Depends(get_db)):
    worker = crud.get_worker(db, worker_id=worker_id)
    if worker is None:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker

@app.patch("/api/workers/{worker_id}", response_model=schema.WorkerResponse)
def update_worker(
    worker_id: int, 
    worker_update: schema.WorkerUpdate, 
    db: Session = Depends(get_db)
):
    db_worker = crud.update_worker(db, worker_id=worker_id, worker_update=worker_update)
    if db_worker is None:
        raise HTTPException(status_code=404, detail="Worker not found")
    return db_worker

# Dashboard endpoint
@app.get("/api/dashboard/stats", response_model=schema.DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)