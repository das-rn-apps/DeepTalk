import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';

const Profile = () => {
    const { logout } = useAuth();

    const handlePress = (option: string) => {
        switch (option) {
            case 'Privacy':
                // Handle Privacy navigation or action
                console.log('Privacy selected');
                break;
            case 'Groups':
                router.push('/chats/addGroup')
                break;
            case 'Notifications':
                // Handle Notifications navigation or action
                console.log('Notifications selected');
                break;
            case 'Help':
                // Handle Help navigation or action
                console.log('Help selected');
                break;
            case 'Logout':
                // Handle Logout action
                logout();
                break;
            default:
                console.log('Unknown option selected');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: 'https://picsum.photos/5000' }}
                    style={styles.profileImage}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.profileName}>Your Name</Text>
                    <Text style={styles.profileStatus}>Hey there! I am using WhatsApp</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="pencil" size={24} color="green" style={styles.editIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Phone Number</Text>
                <View style={styles.row}>
                    <MaterialIcons name="phone" size={24} color="green" />
                    <Text style={styles.phoneNumber}>+123 456 7890</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>

                <TouchableOpacity style={styles.row} onPress={() => handlePress('Privacy')}>
                    <Ionicons name="lock-closed" size={24} color="green" />
                    <Text style={styles.optionText}>Privacy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => handlePress('Groups')}>
                    <Ionicons name="chatbubbles" size={24} color="green" />
                    <Text style={styles.optionText}>Groups</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => handlePress('Notifications')}>
                    <Ionicons name="notifications" size={24} color="green" />
                    <Text style={styles.optionText}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => handlePress('Help')}>
                    <Ionicons name="help-circle" size={24} color="green" />
                    <Text style={styles.optionText}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.row} onPress={() => handlePress('Logout')}>
                    <Ionicons name="exit" size={24} color="red" />
                    <Text style={styles.optionText}>Logout</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    profileStatus: {
        fontSize: 14,
        color: '#666',
    },
    editIcon: {
        marginLeft: 10,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    phoneNumber: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
});
