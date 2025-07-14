# Task Manager Dashboard

A comprehensive, full-featured task management application built with React, Next.js, and TypeScript. This application provides a complete solution for managing tasks with authentication, CRUD operations, advanced filtering, drag-and-drop functionality, and responsive design.

## 🚀 Features

### 🔐 Authentication System
- **User Registration & Login**: Secure signup and login with form validation
- **Session Persistence**: Maintains user sessions across browser reloads
- **Route Protection**: Automatic redirection based on authentication status
- **localStorage Integration**: User data persisted locally

### 📋 Task Management (CRUD)
- **Create Tasks**: Add new tasks with comprehensive details
- **Read Tasks**: View tasks in organized columns and cards
- **Update Tasks**: Edit existing tasks with real-time updates
- **Delete Tasks**: Remove tasks
- **Task Properties**:
  - Title (required)
  - Description (required)
  - Status (Todo, In Progress, Done)
  - Priority (Low, Medium, High)
  - Due Date (with validation)
  - Creation & Update timestamps

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Search tasks by title or description
- **Status Filtering**: Filter by task status (Todo, In Progress, Done)
- **Priority Filtering**: Filter by priority level (Low, Medium, High)
- **Date Range Filtering**: Filter by task creation date
- **Combined Filters**: Use multiple filters simultaneously
- **Clear Filters**: Reset all filters with one click

### 📄 Pagination System
- **Configurable Page Size**: Choose 5, 10, 20, or 50 tasks per page
- **Smart Navigation**: Previous/Next buttons with page numbers
- **Results Counter**: Shows current page range and total tasks
- **Auto-reset**: Pagination resets when filters change

### 🎯 Drag & Drop Interface
- **Column-based Layout**: Kanban-style board with three columns
- **Smooth Drag & Drop**: Move tasks between status columns
- **Visual Feedback**: Hover effects and drag indicators
- **Status Updates**: Automatic status change when tasks are moved
- **Touch Support**: Works on mobile devices

### 📊 Dashboard Analytics
- **Task Statistics**: Overview of total, completed, in-progress, and overdue tasks
- **Visual Indicators**: Color-coded cards and badges
- **Real-time Updates**: Statistics update automatically
- **Overdue Detection**: Automatic identification of overdue tasks

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Comprehensive error messages and validation
- **Empty States**: Helpful messages when no data is available
- **Accessibility**: ARIA labels and keyboard navigation support

### ⚡ Smart Features
- **Auto-status Update**: Overdue tasks automatically marked as "Done"
- **Form Validation**: Real-time validation with helpful error messages
- **Data Persistence**: All data saved to localStorage
- **Route Management**: Proper navigation with Next.js App Router
- **TypeScript**: Full type safety throughout the application

## 🛠 Technology Stack

### Frontend Framework
- **React 19**: Latest React with hooks and concurrent features
- **Next.js 15**: App Router, server components, and optimizations
- **TypeScript**: Full type safety and better developer experience

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **Lucide React**: Beautiful, customizable icons
- **CSS Grid & Flexbox**: Modern layout techniques

### Form Management
- **Formik**: Robust form handling and validation
- **Yup**: Schema-based form validation
- **Real-time Validation**: Instant feedback on form inputs

### State Management
- **React Context API**: Global state management
- **Custom Hooks**: Reusable stateful logic
- **localStorage**: Client-side data persistence

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (configured)
- **TypeScript**: Static type checking
- **Next.js Dev Tools**: Hot reload and debugging


## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (for cloning the repository)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/aftabdivan/task-manager.git
   cd task-manager
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.


## 📖 Usage Guide

### Getting Started
1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Use your credentials to access the dashboard
3. **Create Tasks**: Click "New Task" to add your first task
4. **Manage Tasks**: Use drag-and-drop to move tasks between columns

### Task Management
- **Creating Tasks**: Fill in title, description, status, priority, and due date
- **Editing Tasks**: Click the edit icon on any task card
- **Deleting Tasks**: Click the trash icon to remove tasks
- **Moving Tasks**: Drag tasks between Todo, In Progress, and Done columns

### Filtering & Search
- **Search**: Use the search bar to find tasks by title or description
- **Filter by Status**: Select specific status to view only those tasks
- **Filter by Priority**: Choose priority level to filter tasks
- **Date Range**: Filter tasks by their creation date
- **Pagination**: Navigate through pages using the pagination controls

### Dashboard Features
- **Statistics**: View overview of your task distribution
- **Overdue Tasks**: Automatically highlighted in red
- **Responsive Design**: Works seamlessly on all device sizes

## 🔧 Configuration

### Customization
- **Theme**: Modify `tailwind.config.js` for custom colors and styling
- **Components**: Extend or modify components in the `components/` directory
- **Types**: Add new types in `types/index.ts`
- **Validation**: Update validation schemas in form components

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Task creation, editing, and deletion
- [ ] Drag and drop functionality
- [ ] Search and filtering
- [ ] Pagination
- [ ] Responsive design on different screen sizes
- [ ] Data persistence across browser sessions

### Test User Accounts
For testing purposes, you can create accounts with any email/password combination. Data is stored locally in your browser.

## 🐛 Troubleshooting

### Common Issues

**Issue**: Tasks not persisting after browser refresh
- **Solution**: Check if localStorage is enabled in your browser

**Issue**: Drag and drop not working on mobile
- **Solution**: Ensure you're using touch gestures, not mouse events

**Issue**: Build errors with TypeScript
- **Solution**: Run `npm run type-check` to identify type issues

**Issue**: Styling not loading correctly
- **Solution**: Clear browser cache and restart development server

**Built with ❤️ using React, Next.js, and TypeScript**