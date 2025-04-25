import { Router } from "express";
import { FeedbackController } from "../controller/FeedbackController";
import container from "../core/ioc/config"
import upload from "../utils/multerHelper";
import { adminMiddleware, userMiddleware } from "../middleware/middleware";
const feedbackController: FeedbackController = container.resolve('FeedbackController')
const FeedbackRoutes = Router()

FeedbackRoutes.post('/', userMiddleware, upload.single('image'), feedbackController.addFeedback.bind(feedbackController))
FeedbackRoutes.get('/', adminMiddleware, feedbackController.getFeedbacks.bind(feedbackController))
FeedbackRoutes.get('/user', userMiddleware, feedbackController.getFeedbacksUser.bind(feedbackController))
FeedbackRoutes.patch('/status/:feedbackId', adminMiddleware, feedbackController.ToggleStatus.bind(feedbackController))
FeedbackRoutes.put('/comment/:feedbackId', adminMiddleware, feedbackController.addComment.bind(feedbackController))
export default FeedbackRoutes

