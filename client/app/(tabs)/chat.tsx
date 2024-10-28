import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ChatItem from "@/components/ChatItem";
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { getAllChats, getAllUsers, IChat, IUser } from "@/services/chat";
import LoadingIndicator from "@/components/LoadingIndicator";
import UserList from "@/components/UserList";
import SearchBox from "@/components/SearchBox";

export default function ChatList() {
    const { userDetails } = useAuth();
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!userDetails?._id) return;

            try {
                setLoading(true);
                setError(null);
                const chatData = await getAllChats(userDetails._id);
                setChats(chatData || []);
            } catch (error) {
                setError('Failed to load chats. Please try again.');
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            if (!userDetails?._id) return;

            try {
                setLoading(true);
                setError(null);
                const userData = await getAllUsers();
                setUsers(userData || []);
            } catch (error) {
                setError('Failed to load users. Please try again.');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
        fetchUsers();
    }, [userDetails]);

    const renderItem = ({ item }: { item: IChat }) => <ChatItem chat={item} />;
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    return (
        <SafeAreaView style={styles.container}>
            <SearchBox users={users} onFilter={setFilteredUsers} />
            {loading ? (
                <LoadingIndicator />
            ) : error ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyMessage}>{error}</Text>
                </View>
            ) : chats.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyMessage}>No chats available.</Text>
                </View>
            ) : (
                <FlatList
                    data={chats}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id || Math.random().toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.text,
        marginVertical: 5,
        textAlign: "center"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 8,
        marginVertical: 20,
        borderColor: Colors.borderColor,
        borderWidth: 1,
    },
    emptyMessage: {
        fontSize: 18,
        color: Colors.textSecondary,
        textAlign: "center",
        fontStyle: "italic",
    }
});
