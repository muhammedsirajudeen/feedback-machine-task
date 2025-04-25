import { Router } from "express";
import UserController from "../controller/UserController";
import container from "../core/ioc/config"
const userRouter = Router()

const userController: UserController = container.resolve('UserController')

userRouter.post('/create', userController.createUser.bind(userController))
userRouter.get('/verify', userController.verifyUser.bind(userController))
userRouter.post('/admin/login', userController.adminLogin.bind(userController))
export default userRouter