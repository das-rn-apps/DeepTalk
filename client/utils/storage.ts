import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // saving error
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (e) {
        // error reading value
    }
};
