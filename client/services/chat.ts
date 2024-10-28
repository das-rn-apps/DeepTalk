import axios from "axios";
import { API_URL } from "@/constants/Config";
import mongoose, { Types } from "mongoose";
import { Alert } from 'react-native';

export interface IUser {
    // _id: mongoose.Types.ObjectId;
    _id?: string;
    username: string;
    email: string;
    is_delete: boolean;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IChat {
    _id?: string;
    is_delete: boolean;
    lastMessage: string;
    participants: IUser[];
    roomName?: string;
    isGroup: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    avatar?: string;
}
export interface IMessage {
    _id?: string;
    is_delete: boolean;
    sender: IUser;
    chat: Types.ObjectId;
    content: string;
    attachments?: string[];
    type: 'text' | 'image' | 'video' | 'file';
    isRead: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}



const getAllChats = async (userId: string): Promise<IChat[] | null> => {
    try {
        const response = await axios.get(`${API_URL}/chats/getChat/${userId}`);

        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    // Display an alert if the error status is 404
                    Alert.alert('Chat Not Found', 'No chats found for the specified user.');
                } else {
                    // Handle other server-side errors
                    console.error('Server error:', error.response.data);
                    console.error('Status code:', error.response.status);
                }
            } else if (error.request) {
                // Handle request errors (no response received)
                console.error('No response received:', error.request);
            } else {
                // Handle other Axios-specific errors
                console.error('Error message:', error.message);
            }
        } else {
            // Handle any other unexpected errors
            console.error('Unexpected error:', error);
        }
        return null;
    }
};

const getAllUsers = async (): Promise<IUser[] | null> => {
    try {
        const response = await axios.get(`${API_URL}/users`);

        // console.log(response.data);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    // Display an alert if the error status is 404
                    Alert.alert('Chat Not Found', 'No chats found for the specified user.');
                } else {
                    // Handle other server-side errors
                    console.error('Server error:', error.response.data);
                    console.error('Status code:', error.response.status);
                }
            } else if (error.request) {
                // Handle request errors (no response received)
                console.error('No response received:', error.request);
            } else {
                // Handle other Axios-specific errors
                console.error('Error message:', error.message);
            }
        } else {
            // Handle any other unexpected errors
            console.error('Unexpected error:', error);
        }
        return null;
    }
};


const getMessages = async (chatId: string): Promise<IMessage[] | null> => {
    try {
        const response = await axios.get(`${API_URL}/chats/getMsg/${chatId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Failed to fetch messages: Status ${response.status}`);
            return null;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    Alert.alert('Messages Not Found', 'No messages found for the specified chat.');
                } else {
                    console.error('Server error:', error.response.data);
                    console.error('Status code:', error.response.status);
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
};


const sendMessage = async (message: IMessage): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/chats/sendMsg`, {
            sender: message.sender,
            chat: message.chat,
            content: message.content,
            attachments: message.attachments || [],
            type: message.type || 'text',
        });

        if (response.status === 200 || response.status === 201) {
            return true;
        } else {
            console.error(`Failed to send message: Status ${response.status}`);
            return false;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    Alert.alert('Chat Not Found', 'Unable to send message to the specified chat.');
                } else {
                    console.error('Server error:', error.response.data);
                    console.error('Status code:', error.response.status);
                }
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        return false;
    }
};


export { getAllChats, getAllUsers, getMessages, sendMessage };
