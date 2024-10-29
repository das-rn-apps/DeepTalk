import { Stack } from 'expo-router';

const ChatLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="addGroup" options={{ title: 'Chat Rooms Addition' }} />
            <Stack.Screen name="[id]" options={{ title: 'Chat Room', headerShown: false }} />
        </Stack>
    );
};

export default ChatLayout;
