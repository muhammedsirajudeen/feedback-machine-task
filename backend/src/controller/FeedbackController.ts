import { inject, injectable } from "tsyringe";
import { FeedbackService } from "../service/FeedbackService";
import { Request, Response } from "express";
import { IUser } from "../model/User";
import { FeedbackRepository } from "../repository/FeedbackRepository";
import { Feedback } from "../model/Feedback";
import { Model } from "mongoose";
export interface CustomRequest extends Request {
    user?: IUser
}
@injectable()
export class FeedbackController {
    feedbackService: FeedbackService
    feedbackModel: Model<Feedback>
    constructor(@inject('FeedbackService') feedbackService: FeedbackService, @inject('FeedbackModel') feedbackModel: Model<Feedback>) {
        this.feedbackService = feedbackService
        this.feedbackModel = feedbackModel
    }

    async addFeedback(req: CustomRequest, res: Response) {
        try {
            const feedbackRequest = req.body
            const feedback = await this.feedbackService.create({ ...feedbackRequest, image: req.file?.filename, user: req.user?._id })
            console.log(feedback)
            res.status(200).json({ messaage: 'success' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }

    async getFeedbacks(req: Request, res: Response) {
        try {
            const feedbacks = await this.feedbackModel.find().populate([{ path: 'user', select: '-password' }])
            console.log(feedbacks)
            res.status(200).json({ message: "success", feedbacks })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }
}