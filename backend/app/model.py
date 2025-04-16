from sqlalchemy import Column, Integer, String, Float, DateTime, func
from .database import Base

class DetectionTask(Base):
    __tablename__ = "detection_tasks"

    id = Column(Integer, primary_key=True, index=True)
    detection_id = Column(String, unique=True, index=True)
    type = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    latitude = Column(Float)
    longitude = Column(Float)
    address = Column(String)
    camera_id = Column(String)
