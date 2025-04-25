import { inject, injectable } from "tsyringe";
import { BaseService } from "../core/base/BaseService";
import { Feedback } from "../model/Feedback";
import { FeedbackRepository } from "../repository/FeedbackRepository";

@injectable()
export class FeedbackService extends BaseService<Feedback> {
    constructor(@inject('FeedbackRepository') feedbackRepository: FeedbackRepository) {
        super(feedbackRepository)
    }
}