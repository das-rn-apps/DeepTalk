// MyStory.tsx
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

// Define the props for the MyStory component
interface MyStoryProps {
    onPress: () => void; // Function to handle press
}

// Sample user story
const myStory = {
    userName: 'You',
    time: '20 minutes ago',
    image: 'https://via.placeholder.com/100',
};

const MyStory: React.FC<MyStoryProps> = ({ onPress }) => {
    return (
        <View style={[styles.statusContainer, { borderBottomWidth: 0.5, paddingBottom: 10, marginBottom: 10 }]}>
            <TouchableOpacity style={styles.profileImageWrapper} onPress={onPress}>
                <Image source={{ uri: myStory.image }} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.statusInfo}>
                <Text style={styles.userName}>My story</Text>
                <Text style={styles.time}>{myStory.time}</Text>
            </View>
        </View>
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
        borderColor: '#25D366', // Border color for my story
    },
    profileImage: {
        width: 54,
        height: 54,
        borderRadius: 27,
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

export default MyStory;
