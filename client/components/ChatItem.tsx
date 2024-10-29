import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from '@/constants/Colors';
import { IChat } from "@/services/chat";
import { useAuth } from "@/context/AuthContext";

interface ChatItemProps {
    chat: IChat;
}

export default function ChatItem({ chat }: ChatItemProps) {
    const { userDetails } = useAuth();
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handlePress = () => {
        const link = `/chats/${chat._id}` as const;
        router.push(link);
    };

    useEffect(() => {
        if (chat?.isGroup) {
            setDisplayName(chat.roomName);
            setAvatarUrl(chat.avatar || null);
        } else {
            const otherParticipant = chat.participants.find(participant => participant._id !== userDetails?._id);
            setDisplayName(otherParticipant?.username || 'Unknown User');
            setAvatarUrl(otherParticipant?.photo || null);
        }
    }, [chat, userDetails]);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.container}>
                {avatarUrl ? (
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                ) : (
                    <Image source={{ uri: 'https://picsum.photos/1' }} style={styles.avatar} />
                )}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{displayName}</Text>
                    <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.lastMessageTimeStyle}>
                        {new Date(chat.updatedAt as Date).toLocaleString()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        alignItems: "center",
        backgroundColor: Colors.surface,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    infoContainer: {
        marginLeft: 10,
        flex: 1,
        justifyContent: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text,
    },
    lastMessage: {
        fontSize: 14,
        color: Colors.textSecondary,
    },
    timeContainer: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    lastMessageTimeStyle: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
