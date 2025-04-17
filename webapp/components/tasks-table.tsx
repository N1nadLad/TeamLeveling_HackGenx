"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TaskDetailModal } from "@/components/task-detail-modal"
import { formatDistanceToNow } from "date-fns"

// Mock data for tasks
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
  {
    id: "TASK-1239",
    location: "Washington Square Park",
    coordinates: { lat: 40.730823, lng: -73.997332 },
    createdAt: new Date(2023, 3, 15, 14, 15),
    status: "pending",
    description: "Garbage around fountain area",
    priority: "high",
  },
  {
    id: "TASK-1240",
    location: "Union Square",
    coordinates: { lat: 40.735863, lng: -73.991084 },
    createdAt: new Date(2023, 3, 15, 15, 0),
    status: "completed",
    description: "Trash after farmers market",
    priority: "medium",
    assignedTo: "Sarah Williams",
    completedAt: new Date(2023, 3, 15, 17, 30),
  },
]

type TasksTableProps = {
  limit?: number
}

export function TasksTable({ limit }: TasksTableProps) {
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tasks = limit ? mockTasks.slice(0, limit) : mockTasks

  const handleViewTask = (task: any) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.id}</TableCell>
                <TableCell>{task.location}</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell>{formatDistanceToNow(task.createdAt, { addSuffix: true })}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewTask(task)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedTask && (
        <TaskDetailModal task={selectedTask} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
