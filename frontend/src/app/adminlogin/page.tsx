"use client"

import type React from "react"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axiosInstance from "@/lib/axiosInstance"
import GlobalContext from "@/provider/GlobalContext"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const {setUser}=useContext(GlobalContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    try {
      const response=await axiosInstance.post('/user/admin/login',{email,password})
      console.log(response.data)
      console.log("Login successful with:", { email, password })

      window.localStorage.setItem('token',response.data.token)
      setUser(response.data.user)
      // Redirect to feedback page
      router.push("/admin")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the feedback portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account? Contact your administrator.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
