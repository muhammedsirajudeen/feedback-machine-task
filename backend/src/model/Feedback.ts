import mongoose, { Schema, Document, Types, ObjectId } from 'mongoose'

interface Comment {
    text: string
    date: string
    author: string
}

export interface Feedback extends Document {
    title: string
    description: string
    rating: number
    date: string
    user: ObjectId
    image: string | null
    status: string
    comments: Comment[]
}

const CommentSchema: Schema = new Schema<Comment>(
    {
        text: { type: String, required: true },
        date: { type: String, required: true },
        author: { type: String, required: true },
    },
)

const FeedbackSchema: Schema = new Schema<Feedback>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true },
        date: { type: String, required: false, default: Date() },
        user: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
        image: { type: String, default: null },
        status: { type: String, required: false, default: "New" },
        comments: { type: [CommentSchema], default: [] },
    },
    {
        timestamps: true,
    }
)

const FeedbackModel = mongoose.model<Feedback>('Feedback', FeedbackSchema)
export default FeedbackModel
