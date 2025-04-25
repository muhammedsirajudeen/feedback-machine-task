"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarRating } from "@/components/star-rating"
import { MessageSquare, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Feedback } from "@/types/Feedback"
import Image from "next/image"



interface FeedbackItemProps {
  feedback: Feedback
  onStatusChange: (id: string, status: string) => void
  onAddComment: (id: string, comment: string) => void
}

export function FeedbackItem({ feedback, onStatusChange, onAddComment }: FeedbackItemProps) {
  const [newComment, setNewComment] = useState("")
  const [showComments, setShowComments] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getInitials = (email: string) => {
    return email.split("@")[0].substring(0, 2).toUpperCase()
  }

  const handleSubmitComment = () => {
    onAddComment(feedback._id, newComment)
    setNewComment("")
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(feedback.user.email)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{feedback.user.email}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(feedback.date), { addSuffix: true })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={feedback.rating} readOnly size="sm" />
                <Badge className={getStatusColor(feedback.status)}>
                  {feedback.status === "in-progress"
                    ? "In Progress"
                    : feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                </Badge>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">{feedback.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{feedback.description}</p>

            {feedback.image && (
              <div className="mb-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${feedback.image}`}
                  height={100}
                  width={100}
                  className="max-h-48 rounded-lg"
                  alt="alt"
                  />
              </div>
            )}

            <div className="flex items-center justify-between">
              <Select value={feedback.status} onValueChange={(value) => onStatusChange(feedback._id, value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Collapsible open={showComments} onOpenChange={setShowComments}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments ({feedback.comments.length})
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
        </div>
      </CardContent>

      <Collapsible open={showComments}>
        <CollapsibleContent>
          <CardFooter className="flex flex-col p-6 pt-0 border-t">
            {feedback.comments.length > 0 ? (
              <div className="w-full mb-4">
                <h4 className="font-medium mb-2">Comments</h4>
                <div className="space-y-3">
                  {feedback.comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Admin</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full mb-4 text-center text-gray-500 dark:text-gray-400 py-4">No comments yet</div>
            )}

            <div className="w-full flex gap-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
