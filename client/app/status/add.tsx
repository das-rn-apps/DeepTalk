import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddStory = () => {
    const [image, setImage] = useState(null);
    const [storyText, setStoryText] = useState('');

    const pickImage = async () => {
        // Request permission to access media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (image && storyText) {
            // Handle story submission
            console.log('Story submitted!', { image, storyText });
            // Reset the form after submission
            setImage(null);
            setStoryText('');
        } else {
            alert("Please select an image and enter text for your story.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add Your Story</Text>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imagePicker}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.selectedImage} />
                    ) : (
                        <Text style={styles.imagePickerText}>Tap to select an image</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                placeholder="Enter your story text..."
                value={storyText}
                onChangeText={setStoryText}
                multiline
                numberOfLines={3}
            />
            <Button title="Submit Story" onPress={handleSubmit} />
        </View>
    );
};

export default AddStory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePicker: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imagePickerText: {
        color: '#888',
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});
