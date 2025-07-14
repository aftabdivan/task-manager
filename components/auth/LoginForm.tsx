"use client"

import type React from "react"
import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

type LoginFormProps = {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const { login, loading } = useAuth()
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("")
    const success = await login(values.email, values.password)
    if (!success) {
      setError("Invalid email or password")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Field as={Input} id="email" name="email" type="email" placeholder="Enter your email" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Field as={Input} id="password" name="password" type="password" placeholder="Enter your password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting || loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>

              <div className="text-center">
                <Button type="button" variant="link" onClick={() => router.push("/signup")} className="text-sm">
                  {"Don't have an account? Sign up"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}
