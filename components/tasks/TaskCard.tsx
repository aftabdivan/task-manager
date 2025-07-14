"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Clock } from "lucide-react"
import type { Task } from "@/types"
import { useTask } from "@/contexts/TaskContext"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  isDragging?: boolean
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, isDragging }) => {
  const { deleteTask } = useTask()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "In Progress":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Done":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "Done"

  return (
    <Card
      className={`cursor-move transition-all duration-200 ${isDragging ? "opacity-50 rotate-2" : "hover:shadow-md"} ${isOverdue ? "border-red-300 bg-red-50" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">{task.title}</CardTitle>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(task)} className="h-8 w-8 p-0">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            {isOverdue ? (
              <div className="flex items-center text-red-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="font-medium">Overdue</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-gray-400">Created: {new Date(task.createdAt).toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
