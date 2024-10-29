import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from '@/constants/Colors';
import { getChat } from '@/services/chat';
import { useAuth } from "@/context/AuthContext";

interface ChatHeaderProps {
    chatId: string | string[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatId }) => {
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const { userDetails } = useAuth();

    useEffect(() => {
        const fetchChatDetails = async () => {
            if (typeof chatId === "string") {
                try {
                    const chatDetails = await getChat(chatId);

                    if (chatDetails?.isGroup) {
                        setDisplayName(chatDetails.roomName);
                        setAvatarUrl(chatDetails.avatar || null);
                    } else {
                        const otherParticipant = chatDetails?.participants.find(participant => participant._id !== userDetails?._id);
                        setDisplayName(otherParticipant?.username || 'Unknown User');
                        setAvatarUrl(otherParticipant?.photo || null);
                    }
                } catch (error) {
                    console.error('Failed to fetch chat details:', error);
                }
            }
        };

        fetchChatDetails();
    }, [chatId, userDetails]);

    return (
        <View style={styles.header}>
            {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
            ) : (
                <Image source={{ uri: 'https://picsum.photos/1' }} style={styles.avatar} />
            )}
            <View>
                <Text style={styles.headerText}>{displayName || 'Loading...'}</Text>
                <Text style={styles.statusText}>status</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: Colors.surface,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.accent,
        marginRight: 10,
    },
    headerText: {
        fontSize: 17,
        fontWeight: "bold",
        color: Colors.text,
    },
    statusText: {
        fontSize: 11,
        color: Colors.success,
    },
});

export default ChatHeader;
