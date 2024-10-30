// app/chats/addGroup.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { getAllUsers, IChat, IUser } from '@/services/chat';
import { API_URL } from '@/constants/Config';
import { router } from 'expo-router';  // Ensure you import router

const AddGroup = () => {
    const { userDetails } = useAuth();
    const [participants, setParticipants] = useState<IUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getAllUsers();
                setParticipants(userData || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error', 'Failed to fetch users. Please try again later.');
            }
        };
        fetchData();
    }, []);

    const toggleUserSelection = (user: IUser) => {
        setSelectedUsers(prev =>
            prev.includes(user) ? prev.filter(u => u._id !== user._id) : [...prev, user]
        );
    };

    const handleCreateGroupChat = async () => {
        if (selectedUsers.length === 0 || groupName.trim() === '') {
            Alert.alert('Error', 'Please select at least one user and enter a group name.');
            return;
        }

        try {
            const response = await axios.post<IChat>(`${API_URL}/chats/addChat`, {
                participants: [...selectedUsers.map(u => u._id), userDetails?._id],
                roomName: groupName,
                isGroup: true,
            });
            router.push(`/chats/${response.data._id}`); // Navigate to the new chat
        } catch (error) {
            console.error('Error creating group chat:', error);
            Alert.alert('Error', 'Failed to create the group chat. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Group Name"
                value={groupName}
                onChangeText={setGroupName}
            />
            <FlatList
                data={participants}
                keyExtractor={(item) => item._id || "hfhf"}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleUserSelection(item)} style={styles.userItem}>
                        <Text style={styles.userName}>{item.username}</Text>
                        {selectedUsers.includes(item) && <Text style={styles.selectedMarker}>✓</Text>}
                    </TouchableOpacity>
                )}
            />
            <Button title="Create Group Chat" onPress={handleCreateGroupChat} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    userName: {
        fontSize: 16,
    },
    selectedMarker: {
        fontSize: 16,
        color: 'green',
    },
});

export default AddGroup;
