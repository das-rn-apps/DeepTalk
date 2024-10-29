import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';
import { getMessages, IMessage, sendMessage } from "@/services/chat";
import { useAuth } from "@/context/AuthContext";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorDisplay from "@/components/ErrorDisplay";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
    const { id } = useLocalSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const { userDetails } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const handleSend = async () => {
        if (newMessage.trim()) {
            const message: IMessage = {
                chat: id as any,
                sender: userDetails?._id as any,
                content: newMessage,
                type: 'text',
                is_delete: false,
                isRead: false,
                updatedAt: undefined,
            };

            const messageLocal: IMessage = {
                sender: {
                    _id: userDetails?._id || "",
                    username: userDetails?.username || "",
                    email: userDetails?.email || "",
                    is_delete: userDetails?.is_delete || false,
                    createdAt: userDetails?.createdAt || new Date(),
                    updatedAt: userDetails?.updatedAt || new Date(),
                },
                chat: id as any,
                content: newMessage,
                attachments: [],
                type: "text",
                isRead: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                is_delete: false,
            };

            try {
                await sendMessage(message);
                setMessages((prevMessages) => [...prevMessages, messageLocal]);
                setNewMessage("");
            } catch (error) {
                Alert.alert('Error', 'Failed to send message. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchMsgs = async () => {
            if (!id) return;
            try {
                setLoading(true);
                setError(null);
                const msgData = await getMessages(id);
                setMessages(msgData || []);
            } catch (error) {
                setError('Failed to load chats. Please try again.');
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMsgs();
    }, [id]);

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: Colors.background }}>
            <ChatHeader chatId={id} />
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : (
                <MessageList messages={messages} userId={userDetails?._id} />
            )}
            <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} handleSend={handleSend} />
        </KeyboardAvoidingView>
    );
}
