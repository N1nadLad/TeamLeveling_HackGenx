# TeamLeveling_HackGenx

![cleanvision banner](assets/images/CleanVisionimg.png)

## CleanVision

CleanVision is an AI-powered system designed to detect and report waste in real time. Built for cities, campuses, and public spaces, it helps tackle littering by combining smart detection with instant task creation — making cleanliness more efficient, proactive, and data-driven.

## Problem

Maintaining cleanliness in public facilities, campuses, and urban areas is a persistent issue. Traditional monitoring relies heavily on manual inspections or citizen reports, which often leads to delays in identifying and resolving waste-related problems. Spills and litter can go unnoticed for hours, affecting hygiene, public perception, and operational efficiency.

The key challenges include:

 - Real-time detection of garbage or spills in large and busy areas.

 - Manual task assignment that delays cleaning crew response.

 - Lack of integration between monitoring and facility management systems.


These gaps result in inefficient maintenance workflows and poor cleanliness standards in high-footfall areas.

## Solution


CleanVision offers an end-to-end, AI-powered solution to automate waste detection and task assignment. By leveraging CCTV cameras and object detection models, it can:

 - Continuously monitor for garbage and spills in real time.

 - Instantly generate detailed reports with images, location, and timestamps.

 - Automatically assign tasks to cleaning staff through a mobile app.

 - Provide facility managers with a web-based dashboard to track and manage tasks efficiently.

## How CleanVision Works

CleanVision is built as a modular system combining AI, backend services, and user-facing apps to ensure seamless detection and response. Here's how the system operates:

**Real-Time Detection with AI Cameras**
CCTV feeds are continuously analyzed using a custom-trained YOLOv8 model to detect garbage, spills, and similar anomalies in real time.


**Detection Trigger and Reporting**

When garbage is detected, CleanVision:
 - Captures a frame from the video.
 - Collects metadata like timestamp, location (via IP-based geolocation), and device info.
 - Sends this data to the backend through a REST API.



**Task Generation & Management**

The backend receives the detection and:
 - Creates a cleaning task.
 - Stores all details (image, location, detection type) in a PostgreSQL database.
 - Sets the task status as "Unassigned."



**Worker Mobile App**

 - Cleaning staff use the CleanVision mobile app to view nearby unassigned tasks.
 - Workers can self-assign a task with one tap.
 - Once completed, they upload a photo and mark the task as "Done".



**Admin Dashboard**

 - Admins can monitor all tasks on a web dashboard.
 - They can filter by status (Pending , In Progress , Completed), time, or location.
 - Optional live feed preview and deletion of false positives are supported.

## Diagrams

![flow-diagram](assets/images/Blank diagram (2).png)

## Team
 - Arman Shaikh
 - Shrutika Jaware
 - Ninad Lad
 - Mohammad Mudassir Qureshi

