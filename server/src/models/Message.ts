import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMessage extends Document {
    is_delete: boolean;                 // Use primitive boolean
    sender: Types.ObjectId;             // User who sent the message
    chat: Types.ObjectId;               // Reference to the chat room
    content: string;                    // The message text
    attachments?: string[];             // Optional array of attachment URLs or IDs
    type: 'text' | 'image' | 'video' | 'file'; // Type of message
    isRead: boolean;                    // Indicates if the message has been read
    createdAt: Date;                    // Timestamp when the message was created
    updatedAt: Date;                    // Timestamp when the message was last updated
}

const messageSchema = new Schema<IMessage>(
    {
        is_delete: { type: Boolean, required: true, default: false },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true }, // Reference to the Chat
        content: { type: String, required: true },
        attachments: { type: [String], default: [] }, // Optional field for attachments
        type: { type: String, enum: ['text', 'image', 'video', 'file'], required: true },
        isRead: { type: Boolean, default: false }, // Default value set to false
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

export default mongoose.model<IMessage>('Message', messageSchema);
