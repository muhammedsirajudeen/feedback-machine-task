import { inject, injectable } from "tsyringe";
import { FeedbackService } from "../service/FeedbackService";
import { Request, Response } from "express";

@injectable()
export class FeedbackController {
    feedbackService: FeedbackService
    constructor(@inject('FeedbackService') feedbackService: FeedbackService) {
        this.feedbackService = feedbackService
    }
    test(req: Request, res: Response) {
        res.json({ message: "success" })
    }
    addFeedback(req: Request, res: Response) {
        console.log(req.file?.filename)
        res.status(200).json({ messaage: 'success' })
    }
}