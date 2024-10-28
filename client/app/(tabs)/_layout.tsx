// Layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '@/components/Logo';

export default function Layout() {
    const renderIcon = (name: string, focusedName: string) => ({ focused }: { focused: boolean }) => (
        <Ionicons
            name={focused ? focusedName : name}
            size={24}
            color={focused ? Colors.primary : Colors.disabled}
        />
    );

    return (
        <View style={styles.container}>
            <Logo />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: { backgroundColor: Colors.background },
                    tabBarItemStyle: { paddingVertical: 5 },
                }}
            >
                <Tabs.Screen
                    name="chat"
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarIcon: renderIcon('people-outline', 'people'),
                    }}
                />
                <Tabs.Screen
                    name="statuses"
                    options={{
                        tabBarLabel: 'Status',
                        tabBarIcon: renderIcon('aperture-outline', 'aperture'),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: renderIcon('settings-outline', 'settings'),
                    }}
                />
            </Tabs>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
