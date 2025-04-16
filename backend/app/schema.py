from pydantic import BaseModel
from datetime import datetime

class DetectionCreate(BaseModel):
    detection_id: str
    type: str
    timestamp: datetime
    latitude: float
    longitude: float
    address: str
    camera_id: str

class DetectionResponse(DetectionCreate):
    id: int

    class Config:
        from_attribute = True
