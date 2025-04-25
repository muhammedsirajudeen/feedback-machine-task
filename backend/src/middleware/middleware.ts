import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../controller/FeedbackController";
import { verifyToken } from "../utils/jwtHelper";
import { IUser } from "../model/User";

export async function userMiddleware(request: CustomRequest, res: Response, next: NextFunction) {
    const token = request.headers.authorization
    if (!token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }
    const decodedsUser = verifyToken(token) as IUser
    request.user = decodedsUser
    next()

}
export async function adminMiddleware(request: CustomRequest, res: Response, next: NextFunction) {
    const token = request.headers.authorization
    if (!token) {
        res.status(401).json({ message: "unauthorized" })
        return
    }
    const decodedsUser = verifyToken(token) as IUser
    if (decodedsUser.role !== "admin") {
        res.status(401).json({ message: "unauthorized" })
        return
    }
    request.user = decodedsUser
    next()

}