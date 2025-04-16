from typing import List
from sqlalchemy.orm import Session
from . import model, schema

def create_detection(db: Session, detection: schema.DetectionCreate):
    db_detection = model.DetectionTask(**detection.dict())
    db.add(db_detection)
    db.commit()
    db.refresh(db_detection)
    return db_detection

def get_all_detections(db: Session) -> List[model.DetectionTask]:
    return db.query(model.DetectionTask).order_by(model.DetectionTask.timestamp.desc()).all()
