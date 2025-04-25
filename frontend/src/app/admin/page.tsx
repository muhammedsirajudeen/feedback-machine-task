"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeedbackItem } from "@/components/feedback-item"
import { AlertCircle, Search } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Feedback } from "@/types/Feedback"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import { ToastStyles } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { AxiosError } from "axios"



export default function AdminPage() {
  const router = useRouter()
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("newest")
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function adminChecker(){
      try {
        await axiosInstance.get('/user/verify/admin')
        feedbackFetcher()

      } catch (error) {
        const axiosError=error as AxiosError
        if(axiosError.status===404){
          router.push('/login')
        }else if (axiosError.status===403){
          router.push('/login')
        }else{
          router.push('/')
        }
        console.log(error)
      }
    }
    adminChecker()
    async function feedbackFetcher() {
      try {
        const response = await axiosInstance.get('/feedback')
        console.log(response.data)
        setFeedback(response.data.feedbacks ?? [])
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setError('please try again')
      }
    }

  }, [router])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...feedback]
    // Filter by tab/status
    if (activeTab !== "all") {
      result = result.filter((item) => item.status === activeTab)
    }

    // Filter by rating
    if (ratingFilter !== "all") {
      result = result.filter((item) => item.rating === Number.parseInt(ratingFilter))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.user.email.toLowerCase().includes(query),
      )
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()

      if (sortOrder === "newest") {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })

    setFilteredFeedback(result)
  }, [feedback, searchQuery, ratingFilter, sortOrder, activeTab])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axiosInstance.patch(`/feedback/status/${id}`, { status: newStatus })
      toast.success(<p className="text-white" >status changed</p>, ToastStyles.success)
    } catch (error) {
      console.log(error)
      toast.error(<p className="text-white" >error in changing status</p>, ToastStyles.error)
    }
    const updatedFeedback = feedback.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
    setFeedback(updatedFeedback)
  }

  const handleAddComment = async (id: string, comment: string) => {
    if (!comment.trim()) return

    try {
      const response = await axiosInstance.put(`/feedback/comment/${id}`, { comment: comment })
      console.log(response.data)
      const updatedFeedback = feedback.map((item) =>
        item._id === id && response.data.feedback,
      )
      setFeedback(updatedFeedback)
    } catch (error) {
      console.log(error)
      toast.error(<p className="text-white" >error in commenting</p>, ToastStyles.error)
    }



  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Button onClick={()=>{
              localStorage.removeItem("token")
              router.push('/adminlogin')

            }} >
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Feedback Management</CardTitle>
            <CardDescription>View and respond to client feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search feedback..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">
                  All
                  <span className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {feedback.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="new">
                  New
                  <span className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {feedback.filter((item) => item.status === "new").length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress
                  <span className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {feedback.filter((item) => item.status === "in-progress").length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved
                  <span className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                    {feedback.filter((item) => item.status === "resolved").length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
                    <p>Loading feedback...</p>
                  </div>
                ) : filteredFeedback.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p>No feedback found matching your filters.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredFeedback.map((item) => (
                      <FeedbackItem
                        admin={true}
                        key={item._id}
                        feedback={item}
                        onStatusChange={handleStatusChange}
                        onAddComment={handleAddComment}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
