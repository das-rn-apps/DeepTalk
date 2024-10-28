import { Colors } from '@/constants/Colors';
import { IUser } from '@/services/chat';
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SearchBoxProps {
    users: IUser[];
    onFilter: (filteredUsers: IUser[]) => void; // Callback to pass the filtered users back
}

export default function SearchBox({ users, onFilter }: SearchBoxProps) {
    const [searchText, setSearchText] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>(users);

    // Filter users based on search input
    const handleSearch = (text: string) => {
        setSearchText(text);

        if (text.trim() === '') {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) =>
                user.username.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredUsers(filtered);
        }
    };

    // Clear search input
    const clearSearch = () => {
        setSearchText('');
        setFilteredUsers(users);
    };

    // Notify parent component about the filtered users
    useEffect(() => {
        onFilter(filteredUsers);
    }, [filteredUsers, onFilter]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color={Colors.text} style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    placeholderTextColor={Colors.disabled}
                    value={searchText}
                    onChangeText={handleSearch}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={clearSearch}>
                        <Icon name="close-circle" size={20} color={Colors.text} style={styles.icon} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 7,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 7,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: Colors.accent,
    },
    icon: {
        marginHorizontal: 5,
    }
});
