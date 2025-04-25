import { inject, injectable } from "tsyringe";
import { FeedbackService } from "../service/FeedbackService";
import { Request, Response } from "express";
import { IUser } from "../model/User";
export interface CustomRequest extends Request {
    user?: IUser
}
@injectable()
export class FeedbackController {
    feedbackService: FeedbackService
    constructor(@inject('FeedbackService') feedbackService: FeedbackService) {
        this.feedbackService = feedbackService
    }
    test(req: Request, res: Response) {
        res.json({ message: "success" })
    }
    async addFeedback(req: CustomRequest, res: Response) {
        const feedbackRequest = req.body
        const feedback = await this.feedbackService.create({ ...feedbackRequest, image: req.file?.filename, user: req.user?._id })
        console.log(feedback)
        res.status(200).json({ messaage: 'success' })
    }
}