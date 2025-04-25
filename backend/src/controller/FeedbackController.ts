import { inject, injectable } from "tsyringe";
import { FeedbackService } from "../service/FeedbackService";
import { Request, Response } from "express";
import { IUser } from "../model/User";
import { FeedbackRepository } from "../repository/FeedbackRepository";
import { Feedback } from "../model/Feedback";
import { isObjectIdOrHexString, Model } from "mongoose";
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
    async ToggleStatus(req: Request, res: Response) {
        try {
            const { status } = req.body
            const { feedbackId } = req.params
            if (!status || !feedbackId || !isObjectIdOrHexString(feedbackId)) {
                res.status(400).json({ message: "status is not found" })
                return
            }
            const feeback = await this.feedbackService.findById(feedbackId)
            if (!feeback) {
                res.status(404).json({ messaage: "feedback not found" })
                return
            }
            await this.feedbackService.updateById(feedbackId, { status: status })
            res.status(200).json({ message: "success" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }
}