import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import ChatItem from "@/components/ChatItem";
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { getAllChats, getAllUsers, handleUserSelection, IChat, IUser } from "@/services/chat";
import LoadingIndicator from "@/components/LoadingIndicator";
import SearchBox from "@/components/SearchBox";

export default function ChatList() {
    const { userDetails } = useAuth();
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<IUser[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(filteredUsers.length > 0);
    }, [filteredUsers]);

    const handleUserSelect = async (user: IUser) => {
        setShowModal(false);
        handleUserSelection(user, userDetails);
    };

    const renderFilteredUser = ({ item }: { item: IUser }) => (
        <TouchableOpacity onPress={() => handleUserSelect(item)} style={{
            flexDirection: "row", borderBottomColor: Colors.borderColor,
            alignItems: "center", backgroundColor: Colors.surface, gap: 10
        }}>
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <Text style={styles.filteredUserText}>{item.username}</Text>
        </TouchableOpacity>
    );




    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                if (!userDetails?._id) return;
                setLoading(true);
                setError(null);

                try {
                    const [chatData, userData] = await Promise.all([
                        getAllChats(userDetails._id),
                        getAllUsers(),
                    ]);
                    setChats(chatData || []);
                    setUsers(userData || []);
                } catch (error) {
                    setError('Failed to load data. Please try again.');
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, [userDetails])
    );

    const renderItem = ({ item }: { item: IChat }) => <ChatItem chat={item} />;

    return (
        <SafeAreaView style={styles.container}>
            <SearchBox users={users} onFilter={setFilteredUsers} />
            {showModal && (
                <View style={styles.modalContainer}>
                    <FlatList
                        data={filteredUsers}
                        renderItem={renderFilteredUser}
                        keyExtractor={(item) => item._id || Math.random().toString()}
                        ItemSeparatorComponent={() => <View style={styles.listDivider} />}
                    />
                </View>
            )}
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
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
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
    },
    modalContainer: {
        position: 'absolute',
        alignSelf: "center",
        top: 60,
        width: '90%',
        backgroundColor: Colors.surface,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderColor: Colors.borderColor,
        borderWidth: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight: 200,
        zIndex: 10,
    },
    filteredUserText: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '500'
    },
    listDivider: {
        height: 0.31,
        backgroundColor: Colors.borderColor,
        marginVertical: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});
