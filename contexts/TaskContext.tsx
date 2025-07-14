"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Task, TaskContextType } from "@/types"
import { useAuth } from "./AuthContext"

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}

interface TaskProviderProps {
  children: ReactNode
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [currentPage, setCurrentPage] = useState(1)
  const [tasksPerPage, setTasksPerPage] = useState(10)

  // Load tasks from localStorage
  useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
      const userTasks = savedTasks.filter((task: Task) => task.userId === user.id)
      setTasks(userTasks)
    }
  }, [user])

  // Auto-update overdue tasks
  useEffect(() => {
    const updateOverdueTasks = () => {
      const now = new Date()
      const updatedTasks = tasks.map((task) => {
        const dueDate = new Date(task.dueDate)
        if (dueDate < now && task.status !== "Done") {
          return { ...task, status: "Done" as const, updatedAt: new Date().toISOString() }
        }
        return task
      })

      if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
        setTasks(updatedTasks)
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
        const otherTasks = allTasks.filter((task: Task) => task.userId !== user?.id)
        localStorage.setItem("tasks", JSON.stringify([...otherTasks, ...updatedTasks]))
      }
    }

    const interval = setInterval(updateOverdueTasks, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [tasks, user])

  // Filter tasks based on search and filters
  useEffect(() => {
    let filtered = [...tasks]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter && priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    // Date range filter - Filter by creation date, not due date
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((task) => {
        const taskCreatedDate = new Date(task.createdAt)
        const startDate = new Date(dateRange.start)
        const endDate = new Date(dateRange.end)
        // Set time to start/end of day for proper comparison
        startDate.setHours(0, 0, 0, 0)
        endDate.setHours(23, 59, 59, 999)
        return taskCreatedDate >= startDate && taskCreatedDate <= endDate
      })
    } else if (dateRange.start) {
      // Filter by start date only
      filtered = filtered.filter((task) => {
        const taskCreatedDate = new Date(task.createdAt)
        const startDate = new Date(dateRange.start)
        startDate.setHours(0, 0, 0, 0)
        return taskCreatedDate >= startDate
      })
    } else if (dateRange.end) {
      // Filter by end date only
      filtered = filtered.filter((task) => {
        const taskCreatedDate = new Date(task.createdAt)
        const endDate = new Date(dateRange.end)
        endDate.setHours(23, 59, 59, 999)
        return taskCreatedDate <= endDate
      })
    }

    setFilteredTasks(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [tasks, searchTerm, statusFilter, priorityFilter, dateRange])

  const createTask = (taskData: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">) => {
    if (!user) return

    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)

    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const otherTasks = allTasks.filter((task: Task) => task.userId !== user.id)
    localStorage.setItem("tasks", JSON.stringify([...otherTasks, ...updatedTasks]))
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task,
    )
    setTasks(updatedTasks)

    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const otherTasks = allTasks.filter((task: Task) => task.userId !== user?.id)
    localStorage.setItem("tasks", JSON.stringify([...otherTasks, ...updatedTasks]))
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)

    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    const otherTasks = allTasks.filter((task: Task) => task.userId !== user?.id)
    localStorage.setItem("tasks", JSON.stringify([...otherTasks, ...updatedTasks]))
  }

  const moveTask = (taskId: string, newStatus: "Todo" | "In Progress" | "Done") => {
    updateTask(taskId, { status: newStatus })
  }

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    loading,
    error,
    searchTerm,
    statusFilter,
    priorityFilter,
    dateRange,
    currentPage,
    tasksPerPage,
    createTask,
    updateTask,
    deleteTask,
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    setDateRange,
    setCurrentPage,
    setTasksPerPage,
    moveTask,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
