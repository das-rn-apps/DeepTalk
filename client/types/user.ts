import mongoose from "mongoose";

export default interface IUserDetails {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    is_delete: false,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}