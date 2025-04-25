import { Router } from "express";
import { FeedbackController } from "../controller/FeedbackController";
import container from "../core/ioc/config"
import upload from "../utils/multerHelper";
import { adminMiddleware, userMiddleware } from "../middleware/middleware";
const feedbackController: FeedbackController = container.resolve('FeedbackController')
const FeedbackRoutes = Router()

FeedbackRoutes.post('/', userMiddleware, upload.single('image'), feedbackController.addFeedback.bind(feedbackController))
FeedbackRoutes.get('/', adminMiddleware, feedbackController.getFeedbacks.bind(feedbackController))
export default FeedbackRoutes

