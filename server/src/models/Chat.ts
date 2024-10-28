import mongoose, { Document, Schema, Types } from 'mongoose';


export interface IChat extends Document {
    is_delete: boolean;                 // Use primitive boolean
    lastMessage: string;                // Use primitive string
    lastMessageTime: Date;              // Time of the last message
    participants: Types.ObjectId[];     // Array of user IDs participating in the chat
    roomName?: string;                  // Optional name for the chat room
    isGroup: boolean;                   // Indicates if the chat is a group chat
    createdAt: Date;                    // Timestamp for when the chat was created
    updatedAt?: Date;                   // Optional field for when the chat was last updated
    avatar: string;                     // Use primitive string for avatar URL or ID
}


const chatSchema = new Schema<IChat>(
    {
        is_delete: { type: Boolean, required: true, default: false },
        lastMessage: { type: String, default: "Hey! How's it going?" },
        lastMessageTime: { type: Date, default: Date.now() },
        participants: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
        roomName: { type: String }, // Optional field for naming the chat room
        isGroup: { type: Boolean, default: false }, // Indicates if it's a group chat
        avatar: { type: String, default: "https://picsum.photos/100" },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model<IChat>('Chat', chatSchema);
