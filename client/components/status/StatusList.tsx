// StatusList.tsx
import React from 'react';
import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import StatusItem from './StatusItem';
import MyStory from './MyStory';

// Define types for the status item
interface Status {
    id: string;
    userName: string;
    time: string;
    image: string;
    viewed: boolean;
}

// Define props for StatusList component
interface StatusListProps {
    statuses: Status[];
    hasStory: boolean;
    onAddStory: () => void; // function to add a story
}

const StatusList: React.FC<StatusListProps> = ({ statuses, hasStory, onAddStory }) => {
    return (
        <View style={{ flex: 1 }}>
            {hasStory ? (
                <MyStory onPress={onAddStory} />
            ) : (
                <TouchableOpacity style={styles.addStoryContainer} onPress={onAddStory}>
                    <Text style={styles.addStoryText}>Tap to add your story</Text>
                </TouchableOpacity>
            )}
            <FlatList
                data={statuses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <StatusItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    addStoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
    },
    addStoryText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#25D366',
    },
});

export default StatusList;
