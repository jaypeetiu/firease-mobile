// AttachFileScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Checkbox, Text, TextInput, Dialog, Portal, PaperProvider } from "react-native-paper";
import { setLocalStorageItem } from '../utils/setLocalStorageItem';
// import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker'
import { useRoute } from '@react-navigation/native';

export default AttachFileScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [selfieUri, setSelfieUri] = useState(null);
    const [checked, setChecked] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => {
        setVisible(false);
        navigation.navigate('Login');
    };

    const chooseImage = () => {
        launchImageLibrary({}, (response) => {
            console.log(response);
            if (!response.didCancel && !response.error) {
                setImage(response.assets[0]);
            }
        });
    };

    const takeSelfie = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel || response.error || response.customButton) {
                console.log('Camera action canceled');
            } else {
                setSelfieUri(response.assets[0].uri);
            }
        });
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', receivedValue.name);
        formData.append('email', receivedValue.email);
        formData.append('password', receivedValue.password);
        formData.append('password_confirmation', receivedValue.password_confirmation);
        formData.append('id_image', {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
        });
        formData.append('selfie', {
            uri: selfieUri,
            type: 'image/jpeg',
            name: 'selfie.jpg',
        });
        try {
            axios.defaults.baseURL = 'https://1d89-112-198-99-52.ngrok-free.app/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.post('auth/register', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((e) => {
                    console.log(e.data.message);
                    setMessage(e.data.message);
                    showDialog();
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.error("Response data:", error.response.data);
                        console.error("Response status:", error.response.status);
                        console.error("Response headers:", error.response.headers);
                        setMessage(error.response.data.message);
                        showDialog();
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error("No response received, check your network connection.");
                    } else {
                        // Something happened in setting up the request
                        console.error("Error message:", error.message);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    const handleNext = () => {
        navigation.navigate('Login');
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text
                        variant="titleLarge"
                        style={{ alignSelf: 'center', color: '#000', textAlign: 'center', fontWeight: 'bold' }}
                    >
                        CREATE ACCOUNT
                    </Text>
                    <View
                        style={{ width: 300, marginTop: '10%', borderWidth: 1, borderRadius: 20, padding: 10, borderColor: '#000', color: '#fff', backgroundColor: '#9B0103', marginHorizontal: 15 }}
                    >
                        <Button style={{ borderWidth: 1, borderRadius: 20, borderColor: '#fff', marginBottom: 5 }} title="Choose Image" onPress={chooseImage} ><Text style={{ color: 'white' }} variant="labelMedium">{image ? image.fileName : 'ATTACH 1 VALID ID'}</Text></Button>
                        {/* {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                        {image && <Button title="Upload" onPress={handleSubmit} />} */}
                        {/* {selfieUri && <Image source={{ uri: selfieUri }} style={{ width: 200, height: 200 }} />} */}
                        <Button style={{ borderWidth: 1, borderRadius: 20, borderColor: '#fff', marginBottom: 5 }} title="Choose Image" onPress={takeSelfie} >
                            <Text style={{ color: 'white' }} variant="labelMedium">{selfieUri ? selfieUri : 'ATTACH SELFIE PICTURE WITH YOUR ID'}</Text>
                        </Button>
                        {/* {selfieUri && (
                            <TouchableOpacity onPress={uploadSelfie}>
                                <Text>Upload Selfie</Text>
                            </TouchableOpacity>
                        )} */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color='white'
                            />
                            <Text variant="labelSmall" style={{ color: '#FFFFFF' }}>ALWAYS TURN ON YOUR LOCATION</Text>
                        </View>
                    </View>
                </View>
                <Button
                    mode="contained"
                    style={{ bottom: '20%', width: 200, backgroundColor: '#F78900', marginTop: 20, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                    textColor="#fff"
                    onPress={() => handleSubmit()}
                >
                    SUBMIT
                </Button>
                <Image source={require('../assets/wave.png')} style={styles.footerImage} />
                <Image source={require('../assets/wave2.png')} style={styles.footerImage} />
            </View>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Alert Message</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F78900'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Adjust the padding to control the space between the content and footer
        width: '100%',
        //   backgroundColor: 'lightgray', // Set a background color for the footer if needed
    },
    footerImage: {
        width: '100%', // Set the width of the image
        // height: '100%', // Set the height of the image
        resizeMode: 'cover', // Adjust the resizeMode as needed (cover, contain, stretch, etc.)
        position: 'absolute',
        bottom: 0
    },
    input: {
        height: 25,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        fontSize: 12,
    },
});