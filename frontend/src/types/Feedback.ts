import { User } from "./User"

export interface Comment {
    _id: string
    text: string
    date: string
    author: string
}

export interface Feedback {
    _id: string
    title: string
    description: string
    rating: number
    date: string
    user: User
    image: string | null
    status: string
    comments: Comment[]
}