import { Router } from "express";
import { FeedbackController } from "../controller/FeedbackController";
import container from "../core/ioc/config"
import upload from "../utils/multerHelper";
const feedbackController: FeedbackController = container.resolve('FeedbackController')
const FeedbackRoutes = Router()

FeedbackRoutes.get('/', feedbackController.test)
FeedbackRoutes.post('/', upload.single('image'), feedbackController.addFeedback.bind(feedbackController))
export default FeedbackRoutes

