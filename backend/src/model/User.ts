import mongoose, { Schema, Document } from "mongoose";

interface User {
    email: string;
    password: string;
    role: string
}

export interface IUser extends User, Document { }

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: false,
            default: "user"
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
