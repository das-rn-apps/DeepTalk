import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';

const AuthCheck = () => {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                // You might want to validate the token here or check its expiry
                // router.push('/auth'); // Testing

                router.replace('/(tabs)/chat');
            } else {
                router.replace('/auth');
            }
        };

        checkAuth();
    }, [router]);

    return (
        <Text>Just restart your app...</Text>
    );
};

export default AuthCheck;
