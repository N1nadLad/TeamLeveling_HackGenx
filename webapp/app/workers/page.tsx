"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Search, Plus, MapPin, Phone, Mail, User } from "lucide-react"

// Mock workers data
const mockWorkers = [
  {
    id: "worker-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "Manhattan",
    status: "available",
    tasksCompleted: 24,
    currentTask: null,
  },
  {
    id: "worker-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    location: "Brooklyn",
    status: "available",
    tasksCompleted: 18,
    currentTask: null,
  },
  {
    id: "worker-3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    location: "Queens",
    status: "busy",
    tasksCompleted: 32,
    currentTask: "TASK-1235",
  },
  {
    id: "worker-4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 456-7890",
    location: "Bronx",
    status: "available",
    tasksCompleted: 15,
    currentTask: null,
  },
  {
    id: "worker-5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    location: "Staten Island",
    status: "offline",
    tasksCompleted: 27,
    currentTask: null,
  },
]

export default function WorkersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddWorkerOpen, setIsAddWorkerOpen] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<any | null>(null)
  const [isWorkerDetailOpen, setIsWorkerDetailOpen] = useState(false)

  const handleViewWorker = (worker: any) => {
    setSelectedWorker(worker)
    setIsWorkerDetailOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Available
          </Badge>
        )
      case "busy":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Busy
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Workers Management</h2>
        <Button onClick={() => setIsAddWorkerOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Worker
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Workers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search workers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tasks Completed</TableHead>
                    <TableHead>Current Task</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWorkers.map((worker) => (
                    <TableRow key={worker.id}>
                      <TableCell className="font-medium">{worker.name}</TableCell>
                      <TableCell>{worker.location}</TableCell>
                      <TableCell>{getStatusBadge(worker.status)}</TableCell>
                      <TableCell>{worker.tasksCompleted}</TableCell>
                      <TableCell>
                        {worker.currentTask ? (
                          <Badge variant="outline">{worker.currentTask}</Badge>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewWorker(worker)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Worker Dialog */}
      <Dialog open={isAddWorkerOpen} onOpenChange={setIsAddWorkerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Worker</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" type="tel" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" className="col-span-3" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWorkerOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddWorkerOpen(false)}>Add Worker</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Worker Detail Dialog */}
      {selectedWorker && (
        <Dialog open={isWorkerDetailOpen} onOpenChange={setIsWorkerDetailOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Worker Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold">{selectedWorker.name}</h3>
                <div className="mt-1 flex justify-center">{getStatusBadge(selectedWorker.status)}</div>
              </div>

              <div className="space-y-2 rounded-md border p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedWorker.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedWorker.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedWorker.phone}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Performance</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-md border p-3 text-center">
                    <div className="text-2xl font-bold">{selectedWorker.tasksCompleted}</div>
                    <div className="text-xs text-muted-foreground">Tasks Completed</div>
                  </div>
                  <div className="rounded-md border p-3 text-center">
                    <div className="text-2xl font-bold">{selectedWorker.currentTask ? "1" : "0"}</div>
                    <div className="text-xs text-muted-foreground">Current Tasks</div>
                  </div>
                </div>
              </div>

              {selectedWorker.currentTask && (
                <div className="space-y-2">
                  <h4 className="font-medium">Current Assignment</h4>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{selectedWorker.currentTask}</span>
                      <Button variant="outline" size="sm">
                        View Task
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsWorkerDetailOpen(false)}>
                Close
              </Button>
              <Button>Edit Worker</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
