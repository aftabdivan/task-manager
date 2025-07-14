"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TaskCard } from "./TaskCard"
import type { Task } from "@/types"

interface TaskColumnProps {
  title: string
  status: "Todo" | "In Progress" | "Done"
  tasks: Task[]
  onEdit: (task: Task) => void
  onDrop: (taskId: string, newStatus: "Todo" | "In Progress" | "Done") => void
  draggedTask: string | null
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks, onEdit, onDrop, draggedTask }) => {
  const [isDragOver, setIsDragOver] = React.useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const taskId = e.dataTransfer.getData("text/plain")
    if (taskId && taskId !== draggedTask) {
      onDrop(taskId, status)
    }
  }

  const getColumnColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "border-blue-200 bg-blue-50"
      case "In Progress":
        return "border-orange-200 bg-orange-50"
      case "Done":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card
      className={`h-full transition-all duration-200 ${getColumnColor(status)} ${
        isDragOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {tasks.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 min-h-[400px]">
          {tasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", task.id)
              }}
            >
              <TaskCard task={task} onEdit={onEdit} isDragging={draggedTask === task.id} />
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>No tasks in {title.toLowerCase()}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
