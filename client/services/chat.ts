import axios from "axios";
import { API_URL } from "@/constants/Config";
import mongoose from "mongoose";
import { Alert } from 'react-native';
import { UserInfo } from "@/context/AuthContext";
import { router } from "expo-router";

export interface IUser {
    // _id: mongoose.Types.ObjectId;
    _id?: string;
    username: string;
    email: string;
    photo?: string;
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
    roomName: string;
    isGroup: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    avatar?: string;
}
export interface IMessage {
    _id?: string;
    is_delete: boolean;
    sender: IUser;
    chat: mongoose.Types.ObjectId;
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


const getMessages = async (chatId: string | string[]): Promise<IMessage[] | null> => {
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

const handleUserSelection = async (user: IUser, userDetails: UserInfo | null): Promise<void> => {
    try {
        const { data: existingChat } = await axios.get<IChat>(`${API_URL}/chats/getRoom`, {
            params: {
                selected: user._id,
                local: userDetails?._id,
            },
        });

        if (existingChat) {
            router.push(`/chats/${existingChat._id}`);
        } else {
            console.error('Unexpected scenario: Chat room should exist.');
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            try {
                const newChat = await axios.post<IChat>(`${API_URL}/chats/addChat`, {
                    participants: [user._id, userDetails?._id],
                    roomName: `${userDetails?.username}-${user.username}`,
                    isGroup: false,
                });

                console.log('Chat room created:', newChat.data);
                router.push(`/chats/${newChat.data._id}`);
            } catch (creationError) {
                console.error('Error creating chat room:', creationError);
                Alert.alert('Creation Error', 'Failed to create the chat room. Please try again.');
            }
        } else {
            // Handle other errors
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Server error:', error.response.data);
                    Alert.alert('Server Error', 'An unexpected error occurred. Please try again later.');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                    Alert.alert('Network Error', 'Failed to communicate with the server. Check your internet connection.');
                } else {
                    console.error('Error message:', error.message);
                    Alert.alert('Error', 'An unexpected error occurred. Please try again.');
                }
            } else {
                console.error('Unexpected error:', error);
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        }
    }
};

//for showing details of sender and reciever

const getChat = async (chatId: string): Promise<IChat | null> => {
    try {
        const response = await axios.get(`${API_URL}/chats/getChatByChatId/${chatId}`);
        // console.log(response.data)
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 404) {
                    Alert.alert('Chat Not Found', 'No chats found for the specified user.');
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

export { getAllChats, getAllUsers, getMessages, sendMessage, handleUserSelection, getChat };
