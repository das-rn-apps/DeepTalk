// screens/ChatScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from '@/constants/Colors';
import { getMessages, IMessage, sendMessage } from "@/services/chat";
import { useAuth } from "@/context/AuthContext";
import MessageItem from "@/components/MessageItem";
import MessageInput from "@/components/MessageInput";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorDisplay from "@/components/ErrorDisplay";

export default function ChatPage() {
    const { id } = useLocalSearchParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const flatListRef = useRef<FlatList<IMessage>>(null);
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
                updatedAt: undefined
            };


            const messageLoacal: IMessage = {
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
                is_delete: false
            };


            try {
                await sendMessage(message);
                setMessages((prevMessages) => [...prevMessages, messageLoacal]);
                setNewMessage("");
            } catch (error) {
                Alert.alert('Error', 'Failed to send message. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchMsgs = async () => {
            if (!id) { return; }
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

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const renderMessage = ({ item }: { item: IMessage }) => (
        <MessageItem item={item} isCurrentUser={item.sender._id === userDetails?._id} />
    );

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{id}</Text>
            </View>

            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <ErrorDisplay message={error} />
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={(item, index) => item._id || index.toString()}
                    contentContainerStyle={styles.messageList}
                    inverted={false}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} handleSend={handleSend} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        padding: 15,
        backgroundColor: Colors.surface,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.text,
    },
    messageList: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
});
