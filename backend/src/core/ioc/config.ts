import { Model } from "mongoose";
import { container } from "tsyringe";
import UserModel from "../../model/User";
import { UserRepository } from "../../repository/UserRepository";
import { UserService } from "../../service/UserService";
import UserController from "../../controller/UserController";
import FeedbackModel from "../../model/Feedback";
import { FeedbackRepository } from "../../repository/FeedbackRepository";
import { FeedbackService } from "../../service/FeedbackService";
import { FeedbackController } from "../../controller/FeedbackController";


class ModelInjector<T> {
    model: Model<T>
    constructor(model: Model<T>) {
        this.model = model
    }
    getModel() {
        return this.model
    }
}

container.registerInstance('UserModel', new ModelInjector(UserModel).getModel())
container.register('UserRepository', UserRepository)
container.register('UserService', UserService)
container.register('UserController', UserController)

container.registerInstance('FeedbackModel', new ModelInjector(FeedbackModel).getModel())
container.register('FeedbackRepository', FeedbackRepository)
container.register('FeedbackService', FeedbackService)
container.register('FeedbackController', FeedbackController)

export default container