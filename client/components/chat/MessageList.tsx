import React, { useRef, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { IMessage } from "@/services/chat";
import { Colors } from '@/constants/Colors';

interface MessagePageProps {
    messages: IMessage[];
    userId: string | undefined;
}

const MessagePage: React.FC<MessagePageProps> = ({ messages, userId }) => {
    const flatListRef = useRef<FlatList<IMessage>>(null);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const renderMessage = ({ item }: { item: IMessage }) => {
        const timestamp = item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Unknown time";

        return (
            <View style={[styles.messageContainer, item.sender._id === userId ? styles.yourMessage : styles.otherMessage]}>
                <Text style={styles.sender}>{item.sender.username}</Text>
                <Text style={styles.message}>{item.content}</Text>
                <Text style={styles.time}>{timestamp}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {messages.length === 0 ? (
                <Text style={styles.noMessages}>No messages yet.</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    messageList: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
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
    noMessages: {
        textAlign: "center",
        fontSize: 18,
        color: Colors.textSecondary,
        marginTop: 20,
    },
});

export default MessagePage;
