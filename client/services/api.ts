import axios from "axios";
import { API_URL } from "../constants/Config";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};


const login = async (email: string, password: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, { email, password });

        if (response.status === 200) {
            await AsyncStorage.setItem('token', response.data.token);
            return response.data.token;
        }
    } catch (error) {
        Alert.alert("Login Failed", "Invalid email or password.");
    }

    return null; // Indicate unsuccessful login
};


const register = async (username: string, email: string, password: string | any[]): Promise<boolean> => {
    // Validate email and password length
    if (!validateEmail(email)) {
        Alert.alert("Invalid Email", "Please enter a valid email");
        return false; // Return false for invalid input
    }
    console.log(email, username, password, API_URL);

    try {
        // Send registration request to the server
        const response = await axios.post(`${API_URL}/users/register`, {
            username,
            email,
            password,
        });
        if (response) {
            console.log("Signup successful");
            return true;
        }
    } catch (error) {
        console.error("Signup error:", error); // Log the error message
        Alert.alert("Signup Failed", "An error occurred. Please try again.");
    }
    return false;
};



export { register, login };
