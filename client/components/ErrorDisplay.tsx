// components/ErrorDisplay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorDisplayProps {
    message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
    <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{message}</Text>
    </View>
);

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
    },
});

export default ErrorDisplay;
