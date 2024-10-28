// components/LoadingIndicator.tsx
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Colors } from '@/constants/Colors';

const LoadingIndicator: React.FC = () => (
    <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.primary} />
    </View>
);

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingIndicator;
