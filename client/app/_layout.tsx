import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";

export default function Layout() {
    return (
        <SafeAreaView style={styles.container}>
            <AuthProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </AuthProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
});




// export default function Layout() {
//     return (
//         <AuthProvider>
//             <ChatProvider>
//                 <ThemeProvider>
//                     <Stack
//                         screenOptions={{
//                             headerShown: false,
//                         }}
//                     />
//                 </ThemeProvider>
//             </ChatProvider>
//         </AuthProvider>
//     );
// }
