"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StarRating } from "@/components/star-rating"
import { checkUser } from "@/lib/checkUser"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import { ToastStyles } from "@/lib/utils"
import Image from "next/image"

export default function SubmitFeedbackPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    async function wrapper(){
      const user=await checkUser()
      if(!user){
        router.push('/login')
      }
      setIsLoggedIn(true)
    } 
    wrapper()
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validate form
    if (!title || !description || rating === 0) {
      setError("Please fill in all required fields and provide a rating")
      return
    }

    setIsLoading(true)

    try {
      // PLACEHOLDER: API call to submit feedback
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('rating', rating.toString())
      if (image) {
        formData.append('image', image)
      }

      
      const response=await axiosInstance.post('/feedback',formData)
      console.log(response)
      console.log("Feedback submitted:", { title, description, rating, image })
      toast.success(<p className="text-white" >feedback added</p>,ToastStyles.success)
      // Reset form
      setTitle("")
      setDescription("")
      setRating(0)
      setImage(null)
      setImagePreview(null)
      setSuccess(true)
    } catch (err) {
      setError("Failed to submit feedback. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Submit Feedback</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("token")
                router.push("/login")
              }}
            >
              Logout
            </Button>
            <Link href="/">
              <Button variant="secondary">Home</Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
            <CardDescription>We value your feedback. Please fill out the form below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>Thank you for your feedback! It has been submitted successfully.</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your feedback"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed feedback..."
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Rating</Label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Attach Image (Optional)</Label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <Label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                        <Upload className="h-8 w-8 mb-2 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload an image</span>
                      </Label>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 rounded-lg mx-auto"
                        height={100}
                        width={100}
                        />

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </Button>
              </div>
            </form>
              <div className="w-full flex justify-center mt-4">
                <Button variant="outline" onClick={()=>{
                  router.push('/feedback')
                }}  >
                  Your feebacks
                </Button>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
