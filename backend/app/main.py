from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import model, schema, crud
from .database import SessionLocal, engine
from typing import List

# Create tables
model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def welcome():
    return {"message": "Welcome to CleanVision"}

@app.post("/api/detections", response_model=schema.DetectionResponse)
def create_detection(detection: schema.DetectionCreate, db: Session = Depends(get_db)):
    return crud.create_detection(db, detection)

@app.get("/api/detections", response_model=List[schema.DetectionResponse])
def read_detections(db: Session = Depends(get_db)):
    return crud.get_all_detections(db)