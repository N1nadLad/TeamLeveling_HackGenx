"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, User } from "lucide-react"
import { format } from "date-fns"
import { TaskMap } from "@/components/task-map"

// Mock workers data
const workers = [
  { id: "worker-1", name: "John Doe", status: "available", location: "Manhattan" },
  { id: "worker-2", name: "Jane Smith", status: "available", location: "Brooklyn" },
  { id: "worker-3", name: "Mike Johnson", status: "busy", location: "Queens" },
  { id: "worker-4", name: "Sarah Williams", status: "available", location: "Bronx" },
  { id: "worker-5", name: "David Brown", status: "offline", location: "Staten Island" },
]

type TaskDetailModalProps = {
  task: any
  isOpen: boolean
  onClose: () => void
}

export function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
  const [status, setStatus] = useState(task.status)
  const [assignedWorker, setAssignedWorker] = useState(task.assignedTo || "")

  const handleStatusChange = (value: string) => {
    setStatus(value)
  }

  const handleWorkerAssign = (value: string) => {
    setAssignedWorker(value)
  }

  const handleSave = () => {
    // In a real app, you would save the changes to the backend
    console.log("Saving task with status:", status, "and worker:", assignedWorker)
    onClose()
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge>Low Priority</Badge>
      default:
        return null
    }
  }

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Task {task.id}</span>
            {getPriorityBadge(task.priority)}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{task.location}</span>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Created: {format(task.createdAt, "PPp")}</span>
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  {getStatusBadge(status)}
                </div>
              </div>

              <div className="col-span-4">
                <h3 className="font-medium">Description</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>

              <div className="col-span-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Update Status</Label>
                  <Select value={status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="col-span-4">
                <div className="space-y-2">
                  <Label htmlFor="worker">Assign Worker</Label>
                  <Select value={assignedWorker} onValueChange={handleWorkerAssign}>
                    <SelectTrigger id="worker">
                      <SelectValue placeholder="Select worker" />
                    </SelectTrigger>
                    <SelectContent>
                      {workers
                        .filter((worker) => worker.status !== "offline")
                        .map((worker) => (
                          <SelectItem key={worker.id} value={worker.name}>
                            {worker.name} ({worker.location})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {assignedWorker && (
                <div className="col-span-4">
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Currently assigned to: <strong>{assignedWorker}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="map">
            <div className="h-[300px] w-full rounded-md border">
              <TaskMap task={task} workers={workers} />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
