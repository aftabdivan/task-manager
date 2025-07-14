"use client"

import type React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTask } from "@/contexts/TaskContext"
import type { Task, FormValues } from "@/types"

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required"),
  dueDate: Yup.date().required("Due date is required").min(new Date(), "Due date cannot be in the past"),
})

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  task?: Task
}

export const TaskForm: React.FC<TaskFormProps> = ({ isOpen, onClose, task }) => {
  const { createTask, updateTask } = useTask()

  const initialValues: FormValues = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Todo",
    priority: task?.priority || "Medium",
    dueDate: task?.dueDate ? task.dueDate.split("T")[0] : "",
  }

  const handleSubmit = (values: FormValues) => {
    const taskData = {
      ...values,
      dueDate: new Date(values.dueDate).toISOString(),
    }

    if (task) {
      updateTask(task.id, taskData)
    } else {
      createTask(taskData)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Field as={Input} id="title" name="title" placeholder="Enter task title" />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Enter task description"
                  rows={3}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={values.status} onValueChange={(value) => setFieldValue("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={values.priority} onValueChange={(value) => setFieldValue("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage name="priority" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Field as={Input} id="dueDate" name="dueDate" type="date" />
                <ErrorMessage name="dueDate" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{task ? "Update" : "Create"} Task</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
