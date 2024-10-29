import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Colors } from '@/constants/Colors'; // Import your Colors constant
import { register, login } from '@/services/api';
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("@gmail.com");
    const [password, setPassword] = useState("teacher");
    const [username, setUsername] = useState("");

    const { loginAuth } = useAuth();

    const handleLogin = async () => {
        try {
            const token = await login(email, password);
            if (token) {
                loginAuth(token);
                router.replace('/(tabs)/chat');
            } else {
                setIsLogin(false);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setIsLogin(false);
        }
    };


    const handleSignup = async () => {
        try {
            const registered = await register(username, email, password);
            Alert.alert('Registration successfull', 'Okay')
            setIsLogin(registered);
        } catch (error) {
            console.error("Error during signup:", error);
            setIsLogin(false);
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{isLogin ? "Login" : "Signup"}</Text>
                {
                    isLogin ? null : <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        keyboardType='default'
                        autoCapitalize="none"
                    />
                }

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignup}>
                    <Text style={styles.buttonText}>{isLogin ? "Login" : "Signup"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.toggleText}>
                        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.background, // Use your background color
        padding: 20,
    },
    card: {
        width: "100%",
        maxWidth: 400, // Limit the width of the card
        padding: 20,
        backgroundColor: Colors.surface, // Use your surface color
        borderRadius: 15,
        shadowColor: Colors.text, // Shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5, // For Android shadow
        alignItems: "center", // Center content
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: Colors.primary, // Use your primary color
    },
    input: {
        width: "100%",
        padding: 10,
        marginVertical: 10,
        borderWidth: 0.5,
        borderColor: Colors.primary, // Use your primary color for the border
        borderRadius: 5,
        backgroundColor: Colors.background, // Light background for input
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: Colors.primary, // Use your primary color for button
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: Colors.text, // Use your text color
        fontWeight: "bold",
    },
    toggleText: {
        marginTop: 15,
        color: Colors.secondary, // Use your secondary color for toggle text
        textAlign: "center", // Center align text
    },
});

export default Auth;
