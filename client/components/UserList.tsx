import { router } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from '@/constants/Colors';
import { IUser } from "@/services/chat";

// Define props for the ChatItem component
interface ChatItemProps {
    user: IUser;
}

export default function ChatItem({ user }: ChatItemProps) {
    const handlePress = () => {
        const link = `/chats/${user._id}` as const;
        router.push(link);
    };

    const getRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const randomSize = getRandomNumber(600, 700);
    const avatarUrl = `https://picsum.photos/${randomSize}`;


    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <View style={styles.container}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{user.username}</Text>
                    <Text style={styles.lastMessage}>{user.email}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.lastMessageTimeStyle}>
                        {new Date(user.updatedAt as Date).toLocaleString()}
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
