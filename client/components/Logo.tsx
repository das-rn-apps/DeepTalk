import { Colors } from '@/constants/Colors';
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const Logo = () => (
    <View style={styles.container}>
        <Image source={require('@/assets/icons/DeepTalk.png')} style={styles.logo} />
        <Image source={require('@/assets/icons/DeepTalkFlower.png')} style={styles.logoText} resizeMode="contain" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: Colors.surface,
        paddingBottom: 5,
    },
    logo: {
        width: 50,
        height: 50,
    },
    logoText: {
        marginLeft: -50,
        flex: 1,
        width: 50,
        height: 50,
    },
});

export default Logo;
