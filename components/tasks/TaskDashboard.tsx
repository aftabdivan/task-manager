"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, LogOut, User, BarChart3 } from "lucide-react";
import { TaskForm } from "./TaskForm";
import { TaskColumn } from "./TaskColumn";
import { TaskFilters } from "./TaskFilters";
import { TaskPagination } from "./TaskPagination";
import { useAuth } from "@/contexts/AuthContext";
import { useTask } from "@/contexts/TaskContext";
import type { Task } from "@/types";

export const TaskDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { filteredTasks, currentPage, tasksPerPage, moveTask } = useTask();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  // Paginate tasks
  const startIndex = (currentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage
  );

  // Group tasks by status
  const todoTasks = paginatedTasks.filter((task) => task.status === "Todo");
  const inProgressTasks = paginatedTasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = paginatedTasks.filter((task) => task.status === "Done");

  // Statistics
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Done"
  ).length;
  const overdueTasks = filteredTasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "Done"
  ).length;

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleDrop = (
    taskId: string,
    newStatus: "Todo" | "In Progress" | "Done"
  ) => {
    moveTask(taskId, newStatus);
    setDraggedTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                {user?.name}
              </div>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTasks}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedTasks}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {inProgressTasks.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {overdueTasks}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <TaskFilters />

        {/* Task Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TaskColumn
            title="Todo"
            status="Todo"
            tasks={todoTasks}
            onEdit={handleEditTask}
            onDrop={handleDrop}
            draggedTask={draggedTask}
          />
          <TaskColumn
            title="In Progress"
            status="In Progress"
            tasks={inProgressTasks}
            onEdit={handleEditTask}
            onDrop={handleDrop}
            draggedTask={draggedTask}
          />
          <TaskColumn
            title="Done"
            status="Done"
            tasks={doneTasks}
            onEdit={handleEditTask}
            onDrop={handleDrop}
            draggedTask={draggedTask}
          />
        </div>

        {/* Pagination */}
        <TaskPagination />

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          task={editingTask}
        />
      </main>
    </div>
  );
};
