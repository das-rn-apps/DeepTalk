// Status.tsx
import { StyleSheet, View } from 'react-native';
import React from 'react';
import StatusList from '@/components/status/StatusList';
import { router } from 'expo-router';

// Define types for the status item
interface Status {
    id: string;
    userName: string;
    time: string;
    image: string;
    viewed: boolean;
}

const statuses: Status[] = [
    {
        id: '1',
        userName: 'Alice',
        time: 'Just now',
        image: 'https://via.placeholder.com/100',
        viewed: false,
    },
    {
        id: '2',
        userName: 'Bob',
        time: '5 minutes ago',
        image: 'https://via.placeholder.com/100',
        viewed: true,
    },
    {
        id: '3',
        userName: 'Charlie',
        time: '20 minutes ago',
        image: 'https://via.placeholder.com/100',
        viewed: false,
    },
];

const Status: React.FC = () => {
    const hasStory = false;

    const handleAddStory = () => {
        console.log('Add story');
        router.push('/status/add');
    };

    return (
        <View style={styles.container}>
            <StatusList statuses={statuses} hasStory={hasStory} onAddStory={handleAddStory} />
        </View>
    );
};

export default Status;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
});
