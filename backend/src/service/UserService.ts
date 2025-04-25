import { Model } from "mongoose";
import { BaseService } from "../core/base/BaseService";
import { IUser } from "../model/User";
import { inject, injectable } from "tsyringe";
import { UserRepository } from "../repository/UserRepository";

@injectable()
export class UserService extends BaseService<IUser> {
    constructor(@inject('UserRepository') userRepository: UserRepository) {
        super(userRepository)
    }
}