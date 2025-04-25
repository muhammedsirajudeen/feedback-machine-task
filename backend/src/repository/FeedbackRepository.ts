import { inject, injectable } from "tsyringe";
import { BaseRepository } from "../core/base/BaseRepository";
import { Feedback } from "../model/Feedback";
import { Model } from "mongoose";

@injectable()
export class FeedbackRepository extends BaseRepository<Feedback> {
    constructor(@inject('FeedbackModel') feedbackModel: Model<Feedback>) {
        super(feedbackModel)
    }
}