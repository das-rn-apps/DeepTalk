import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from '@/constants/Colors'; // Import your Colors constant
import { IChat } from "@/services/chat";


// Define props for the ChatItem component
interface ChatItemProps {
    chat: IChat;
}

export default function ChatItem({ chat }: ChatItemProps) {
    const handlePress = () => {
        const link = `/chats/${chat._id}` as const;
        router.push(link);
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.container}>
                <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{chat.roomName}</Text>
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
        borderBottomColor: Colors.borderColor, // Use border color from Colors
        alignItems: "center",
        backgroundColor: Colors.surface, // Use surface color for background
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    infoContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
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
        alignItems: "flex-end",
        justifyContent: "center",
    },
    lastMessageTimeStyle: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
