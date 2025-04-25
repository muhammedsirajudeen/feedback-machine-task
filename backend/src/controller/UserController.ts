import { inject, injectable } from "tsyringe";
import { UserService } from "../service/UserService";
import { Request, Response } from "express";
import { IUser } from "../model/User";
import { RouteError } from "../utils/Error";
import { comparePassword, hashPassword } from "../utils/bcryptHelper";
import { signToken, verifyToken } from "../utils/jwtHelper";

@injectable()
export default class UserController {
    userService: UserService
    constructor(@inject('UserService') userService: UserService) {
        this.userService = userService
    }
    test(req: Request, res: Response) {
        res.json({ message: "success" })
    }
    async createUser(req: Request, res: Response) {
        try {
            const userRequest = req.body as IUser
            const existUser = await this.userService.findOne({ email: userRequest.email })
            if (existUser) {
                if (!(await comparePassword(userRequest.password, existUser.password))) {
                    res.status(401).json({ message: "user credentials invalid" })
                    return
                }
                const token = signToken({ ...existUser.toObject(), password: undefined })
                res.status(200).json({ user: { ...existUser.toObject(), password: undefined }, token })
                return
            }
            const password = await hashPassword(userRequest.password)
            const user = await this.userService.create({ ...userRequest, password: password })
            const token = signToken({ ...user.toObject(), password: undefined })
            res.status(201).json({ user: { ...user.toObject(), password: undefined }, token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }
    async verifyUser(req: Request, res: Response) {
        try {
            const token = req.headers.authorization
            if (!token) {
                res.status(401).json({ message: "token not there" })
                return
            }
            const user = verifyToken(token) as IUser
            if (!user) {
                res.status(401).json({ message: "invalid token" })
                return
            }
            const findUser = await this.userService.findById(user._id as string)
            if (!findUser) {
                res.status(404).json({ message: "user not found" })
                return
            }
            res.status(200).json({ user: { ...findUser?.toObject(), password: undefined } })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }
    async verifyAdmin(req: Request, res: Response) {
        try {
            const token = req.headers.authorization
            if (!token) {
                res.status(401).json({ message: "token not there" })
                return
            }
            const user = verifyToken(token) as IUser
            if (!user) {
                res.status(401).json({ message: "invalid token" })
                return
            }
            const findUser = await this.userService.findById(user._id as string)
            if (!findUser) {
                res.status(404).json({ message: "user not found" })
                return
            }
            if (findUser.role !== "admin") {
                res.status(403).json({ message: "you dont have access buddy" })
            }
            res.status(200).json({ user: { ...findUser?.toObject(), password: undefined } })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }
    }
    async adminLogin(req: Request, res: Response) {
        try {
            const userRequest = req.body as IUser
            const findUser = await this.userService.findOne({ email: userRequest.email })
            if (!findUser) {
                res.status(404).json({ message: "admin user not found" })
                return
            }
            if (findUser.role === "user") {
                res.status(403).json({ message: "you dont have access here buddy" })
                return
            }
            if (!await comparePassword(userRequest.password, findUser.password)) {
                res.status(401).json({ message: 'invalid credentials buddy' })
                return
            }
            const token = await signToken({ ...findUser.toObject(), password: undefined })
            res.status(200).json({ message: 'success', user: { ...findUser.toObject(), password: undefined }, token })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "internal server error" })
        }

    }
}