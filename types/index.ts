export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  statusFilter: string;
  priorityFilter: string;
  dateRange: { start: string; end: string };
  currentPage: number;
  tasksPerPage: number;
  createTask: (
    task: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">
  ) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: string) => void;
  setPriorityFilter: (priority: string) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  setCurrentPage: (page: number) => void;
  setTasksPerPage: (count: number) => void;
  moveTask: (
    taskId: string,
    newStatus: "Todo" | "In Progress" | "Done"
  ) => void;
}

export interface FormValues {
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}
