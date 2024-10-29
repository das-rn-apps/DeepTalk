import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export interface UserInfo {
    _id: string;
    username: string;
    email: string;
    is_delete: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface DecodedToken {
    exp: number;
    iat: number;
    userInfo: UserInfo;
}


interface AuthContextType {
    auth: string | null;
    userDetails: UserInfo | null;
    loginAuth: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<string | null>(null);
    const [userDetails, setUserDetails] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAuth = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setAuth(token);
                try {
                    const decodedToken = jwtDecode<DecodedToken>(token);
                    const { userInfo } = decodedToken;
                    setUserDetails(userInfo);

                } catch (error) {
                    console.error('Failed to decode token:', error);
                }
            }
            setLoading(false);
        };

        fetchAuth();
    }, []);

    const loginAuth = async (token: string) => {
        try {
            await AsyncStorage.setItem('token', token);
            setAuth(token);
            const decodedToken = jwtDecode<DecodedToken>(token);
            setUserDetails(decodedToken.userInfo);
        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    };

    const logout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('token');
                            setAuth(null);
                            setUserDetails(null);
                            router.replace('/auth');
                        } catch (error) {
                            console.error('Failed to remove token:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    return (
        <AuthContext.Provider value={{ auth, userDetails, loginAuth, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };
