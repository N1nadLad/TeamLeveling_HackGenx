"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TaskDetailModal } from "@/components/task-detail-modal"
import { Layers, List } from "lucide-react"

// Mock data for tasks - same as in tasks-table.tsx
const mockTasks = [
  {
    id: "TASK-1234",
    location: "Central Park, NY",
    coordinates: { lat: 40.785091, lng: -73.968285 },
    createdAt: new Date(2023, 3, 15, 9, 30),
    status: "pending",
    description: "Large pile of trash near the south entrance",
    priority: "high",
  },
  {
    id: "TASK-1235",
    location: "Battery Park, NY",
    coordinates: { lat: 40.703312, lng: -74.016162 },
    createdAt: new Date(2023, 3, 15, 10, 15),
    status: "in-progress",
    description: "Scattered garbage around benches",
    priority: "medium",
    assignedTo: "John Doe",
  },
  {
    id: "TASK-1236",
    location: "Times Square, NY",
    coordinates: { lat: 40.758896, lng: -73.98513 },
    createdAt: new Date(2023, 3, 15, 11, 0),
    status: "completed",
    description: "Overflowing trash bins",
    priority: "high",
    assignedTo: "Jane Smith",
    completedAt: new Date(2023, 3, 15, 14, 30),
  },
  {
    id: "TASK-1237",
    location: "Brooklyn Bridge Park",
    coordinates: { lat: 40.702068, lng: -73.99657 },
    createdAt: new Date(2023, 3, 15, 12, 45),
    status: "pending",
    description: "Litter along the waterfront",
    priority: "low",
  },
  {
    id: "TASK-1238",
    location: "Hudson River Park",
    coordinates: { lat: 40.728808, lng: -74.010481 },
    createdAt: new Date(2023, 3, 15, 13, 30),
    status: "in-progress",
    description: "Debris near bike path",
    priority: "medium",
    assignedTo: "Mike Johnson",
  },
]

// Mock workers data
const workers = [
  { id: "worker-1", name: "John Doe", status: "available", location: "Manhattan" },
  { id: "worker-2", name: "Jane Smith", status: "available", location: "Brooklyn" },
  { id: "worker-3", name: "Mike Johnson", status: "busy", location: "Queens" },
  { id: "worker-4", name: "Sarah Williams", status: "available", location: "Bronx" },
  { id: "worker-5", name: "David Brown", status: "offline", location: "Staten Island" },
]

export default function MapPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mapView, setMapView] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapView) return

    // Clear previous map
    mapView.innerHTML = ""

    // Create a simple map representation
    const mapElement = document.createElement("div")
    mapElement.className = "relative h-full w-full bg-gray-100 overflow-hidden"

    // Filter tasks based on status filter
    const filteredTasks = statusFilter === "all" ? mockTasks : mockTasks.filter((task) => task.status === statusFilter)

    // Add task markers
    filteredTasks.forEach((task, index) => {
      // Position tasks in a grid pattern for this demo
      const row = Math.floor(index / 3)
      const col = index % 3
      const x = 25 + col * 25
      const y = 25 + row * 25

      const taskMarker = document.createElement("div")
      taskMarker.className = "absolute flex items-center justify-center cursor-pointer"
      taskMarker.style.left = `${x}%`
      taskMarker.style.top = `${y}%`
      taskMarker.style.transform = "translate(-50%, -50%)"

      // Different colors for different statuses
      let bgColor = "bg-orange-500"
      if (task.status === "in-progress") bgColor = "bg-blue-500"
      if (task.status === "completed") bgColor = "bg-green-500"

      const taskMarkerIcon = document.createElement("div")
      taskMarkerIcon.className = `flex h-8 w-8 items-center justify-center rounded-full ${bgColor} text-white`
      taskMarkerIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

      const taskLabel = document.createElement("div")
      taskLabel.className =
        "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs shadow"
      taskLabel.textContent = task.id

      taskMarker.appendChild(taskMarkerIcon)
      taskMarker.appendChild(taskLabel)

      // Add click event to open task details
      taskMarker.addEventListener("click", () => {
        setSelectedTask(task)
        setIsModalOpen(true)
      })

      mapElement.appendChild(taskMarker)
    })

    // Add worker markers
    workers
      .filter((worker) => worker.status !== "offline")
      .forEach((worker, index) => {
        // Position workers on the right side of the map
        const y = 20 + index * 15

        const workerMarker = document.createElement("div")
        workerMarker.className = "absolute flex items-center justify-center"
        workerMarker.style.left = "85%"
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

    mapView.appendChild(mapElement)
  }, [mapView, statusFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Map View</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <List className="mr-2 h-4 w-4" />
            List View
          </Button>
          <Button variant="outline">
            <Layers className="mr-2 h-4 w-4" />
            Layers
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Task Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={setMapView} className="h-[600px] w-full rounded-md border bg-gray-50">
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm text-muted-foreground">Loading map...</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending</span>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    {mockTasks.filter((t) => t.status === "pending").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">In Progress</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {mockTasks.filter((t) => t.status === "in-progress").length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completed</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {mockTasks.filter((t) => t.status === "completed").length}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {workers
                  .filter((worker) => worker.status === "available")
                  .map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between rounded-md border p-2">
                      <span className="text-sm">{worker.name}</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {worker.location}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedTask && (
        <TaskDetailModal task={selectedTask} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
