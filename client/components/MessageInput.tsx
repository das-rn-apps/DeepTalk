// components/MessageInput.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';

interface MessageInputProps {
    newMessage: string;
    setNewMessage: (text: string) => void;
    handleSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, setNewMessage, handleSend }) => (
    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={handleSend}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.borderColor,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        backgroundColor: Colors.surface,
    },
    sendButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 10,
    },
    sendButtonText: {
        color: Colors.background,
        fontWeight: "bold",
    },
});

export default MessageInput;
