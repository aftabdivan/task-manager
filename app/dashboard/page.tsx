"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { TaskDashboard } from "@/components/tasks/TaskDashboard";
import { Loader2 } from "lucide-react";

const DashboardPageContent = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <TaskProvider>
      <TaskDashboard />
    </TaskProvider>
  );
};

export default function DashboardPage() {
  return (
    <AuthProvider>
      <DashboardPageContent />
    </AuthProvider>
  );
}
