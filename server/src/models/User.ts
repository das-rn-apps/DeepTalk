import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    is_delete: boolean;
    username: string;
    password: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    is_delete: { type: Boolean, required: true, default: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
