import cv2
import uuid
import requests
from ultralytics import YOLO
from datetime import datetime

# Load YOLOv8 model (use your trained model if available)
model = YOLO("yolov8n.pt")  # or "best.pt" if you trained for bottles

# API endpoint
POST_API_URL = "http://localhost:8000/api/detections"

# Hardcoded location (replace with real GPS if available)
LOCATION = {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "address": "Badnera Amravati, India"
}

# Start webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)[0]

    for box in results.boxes:
        class_id = int(box.cls[0])
        label = model.names[class_id]

        if label.lower() == "bottle":  # Detect only bottles
            print("[INFO] Bottle detected!")

            detection_data = {
                "detection_id": str(uuid.uuid4()),
                "type": "bottle",
                "timestamp": datetime.utcnow().isoformat(),
                "latitude": LOCATION["latitude"],
                "longitude": LOCATION["longitude"],
                "address": LOCATION["address"],
                "camera_id": "cam_001"
            }

            try:
                response = requests.post(POST_API_URL, json=detection_data)
                print(f"[SENT] Status: {response.status_code}")
            except Exception as e:
                print(f"[ERROR] Could not send to backend: {e}")

            # Avoid spamming the API
            cv2.waitKey(2000)
            break

    # Show webcam
    cv2.imshow("Bottle Detection", frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
