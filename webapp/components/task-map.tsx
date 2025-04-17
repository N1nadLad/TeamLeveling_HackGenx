"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

type TaskMapProps = {
  task: any
  workers?: any[]
}

export function TaskMap({ task, workers = [] }: TaskMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // In a real application, you would use a proper map library like Leaflet, Google Maps, or Mapbox
    // This is a simplified placeholder visualization

    const mapContainer = mapRef.current
    mapContainer.innerHTML = ""

    // Create a simple map representation
    const mapElement = document.createElement("div")
    mapElement.className = "relative h-full w-full bg-gray-100 overflow-hidden"

    // Add task marker
    const taskMarker = document.createElement("div")
    taskMarker.className = "absolute flex items-center justify-center"
    taskMarker.style.left = "50%"
    taskMarker.style.top = "50%"
    taskMarker.style.transform = "translate(-50%, -50%)"

    const taskMarkerIcon = document.createElement("div")
    taskMarkerIcon.className = "flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
    taskMarkerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

    const taskLabel = document.createElement("div")
    taskLabel.className =
      "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs shadow"
    taskLabel.textContent = task.location

    taskMarker.appendChild(taskMarkerIcon)
    taskMarker.appendChild(taskLabel)
    mapElement.appendChild(taskMarker)

    // Add nearby workers (randomly positioned for this demo)
    const availableWorkers = workers.filter((w) => w.status === "available")
    availableWorkers.forEach((worker, index) => {
      // Position workers in a circle around the task
      const angle = (index / availableWorkers.length) * Math.PI * 2
      const distance = 80 // pixels from center
      const x = 50 + (Math.cos(angle) * distance) / 3
      const y = 50 + (Math.sin(angle) * distance) / 3

      const workerMarker = document.createElement("div")
      workerMarker.className = "absolute flex items-center justify-center"
      workerMarker.style.left = `${x}%`
      workerMarker.style.top = `${y}%`
      workerMarker.style.transform = "translate(-50%, -50%)"

      const workerMarkerIcon = document.createElement("div")
      workerMarkerIcon.className = "flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white"
      workerMarkerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>`

      const workerLabel = document.createElement("div")
      workerLabel.className =
        "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-1 py-0.5 text-xs shadow"
      workerLabel.textContent = worker.name

      workerMarker.appendChild(workerMarkerIcon)
      workerMarker.appendChild(workerLabel)
      mapElement.appendChild(workerMarker)
    })

    // Add map controls placeholder
    const mapControls = document.createElement("div")
    mapControls.className = "absolute bottom-2 right-2 flex gap-1"

    const zoomInButton = document.createElement("button")
    zoomInButton.className = "flex h-6 w-6 items-center justify-center rounded bg-white shadow"
    zoomInButton.innerHTML = "+"

    const zoomOutButton = document.createElement("button")
    zoomOutButton.className = "flex h-6 w-6 items-center justify-center rounded bg-white shadow"
    zoomOutButton.innerHTML = "-"

    mapControls.appendChild(zoomInButton)
    mapControls.appendChild(zoomOutButton)
    mapElement.appendChild(mapControls)

    // Add map attribution
    const attribution = document.createElement("div")
    attribution.className = "absolute bottom-1 left-1 text-[10px] text-gray-500"
    attribution.textContent = "Map data © CleanVision"
    mapElement.appendChild(attribution)

    mapContainer.appendChild(mapElement)
  }, [task, workers])

  return (
    <div ref={mapRef} className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    </div>
  )
}
