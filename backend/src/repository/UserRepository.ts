import { inject, injectable } from "tsyringe";
import { BaseRepository } from "../core/base/BaseRepository";
import { IUser } from "../model/User";
import { Model } from "mongoose";

@injectable()
export class UserRepository extends BaseRepository<IUser> {
    constructor(@inject('UserModel') userModel: Model<IUser>) {
        super(userModel)
    }
}