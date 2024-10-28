import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Status = () => {
    const { userName, time, image } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.backgroundImage} />
            <View style={styles.overlay}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    );
};

export default Status;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    backgroundImage: {
        width: width,
        height: height,
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 10,
        borderRadius: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    time: {
        fontSize: 16,
        color: '#fff',
    },
});
