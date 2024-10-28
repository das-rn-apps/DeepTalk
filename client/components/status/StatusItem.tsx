// StatusItem.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

// Define the structure of the item prop
interface StatusItemProps {
    item: {
        id: string;
        userName: string;
        time: string;
        image: string;
        viewed: boolean;
    };
}

const StatusItem: React.FC<StatusItemProps> = ({ item }) => {
    const handlePress = () => {
        router.push({
            pathname: '/status',
            params: { id: item.id, userName: item.userName, image: item.image, time: item.time },
        });
    };

    return (
        <TouchableOpacity style={styles.statusContainer} onPress={handlePress}>
            <View
                style={[styles.profileImageWrapper, item.viewed ? styles.viewed : styles.unviewed]}
            >
                <Image source={{ uri: item.image }} style={styles.profileImage} />
            </View>
            <View style={styles.statusInfo}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    profileImageWrapper: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    profileImage: {
        width: 54,
        height: 54,
        borderRadius: 27,
    },
    viewed: {
        borderColor: '#ddd',
    },
    unviewed: {
        borderColor: '#25D366',
    },
    statusInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 14,
        color: '#888',
    },
});

export default StatusItem;
