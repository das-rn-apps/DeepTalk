// components/MessageItem.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';
import { IMessage } from "@/services/chat";

interface MessageItemProps {
    item: IMessage;
    isCurrentUser: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ item, isCurrentUser }) => (
    <View style={[styles.messageContainer, isCurrentUser ? styles.yourMessage : styles.otherMessage]}>
        <Text style={styles.sender}>{item.sender.username}</Text>
        <Text style={styles.message}>{item.content}</Text>
        <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
);

const styles = StyleSheet.create({
    messageContainer: {
        marginVertical: 8,
        padding: 10,
        borderRadius: 8,
        maxWidth: '80%',
    },
    yourMessage: {
        backgroundColor: Colors.primary,
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: Colors.surface,
        alignSelf: 'flex-start',
    },
    sender: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.text,
    },
    message: {
        fontSize: 16,
        color: Colors.text,
        marginVertical: 4,
    },
    time: {
        fontSize: 12,
        color: Colors.textSecondary,
        textAlign: "right",
    },
});

export default MessageItem;
