// AttachFileScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Button, Checkbox, Text, TextInput, Dialog, Portal, PaperProvider } from "react-native-paper";
import { setLocalStorageItem } from '../utils/setLocalStorageItem';
// import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker'
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default AttachFileScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [selfieUri, setSelfieUri] = useState(null);
    const [checked, setChecked] = useState(true);
    const [loading, setLoading] = useState(false);
    const [ids, setIDs] = useState();
    const [selectedValue, setSelectedValue] = useState(null);

    const handleID = async () => {
        axios.defaults.baseURL = 'https://firease.tech/api';
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.csrf_token,
        }
        await axios.get('idlists').then((e) => {
            console.log(e.data.ids.data);
            setIDs(e.data.ids.data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error(receivedValue.token);
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received, check your network connection.");
            } else {
                // Something happened in setting up the request
                console.error("Error message:", error.message);
            }
        });
    }

    useEffect(() => {
        handleID();
    }, []);

    const handleValueChange = (itemValue) => {
        // Do something with the selected value
        setSelectedValue(itemValue);
    };

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
        setLoading(true);
        const formData = new FormData();
        formData.append('name', receivedValue.name);
        formData.append('email', receivedValue.email);
        formData.append('password', receivedValue.password);
        formData.append('password_confirmation', receivedValue.password_confirmation);
        formData.append('phone_number', receivedValue.phone_number);
        formData.append('age', receivedValue.age);
        formData.append('id_type', selectedValue);
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
            axios.defaults.baseURL = 'https://firease.tech/api';
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
                    setLoading(false);
                    showDialog();
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.error("Response data:", error.response.data);
                        console.error("Response status:", error.response.status);
                        console.error("Response headers:", error.response.headers);
                        setMessage(error.response.data.message);
                        setLoading(false);
                        showDialog();
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.error("No response received, check your network connection.");
                        setMessage("No response received, check your network connection.");
                        setLoading(false);
                        showDialog();
                    } else {
                        // Something happened in setting up the request
                        console.error("Error message:", error.message);
                        setMessage("No response received, check your network connection.");
                        setLoading(false);
                        showDialog();
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
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={handleValueChange}
                            style={{ borderWidth: 1, borderRadius: 20, borderColor: '#fff', marginBottom: 5, color: 'white' }}
                        >
                            <Picker.Item label="Choose ID Type" />
                            {ids?.map((value, k) => (
                                <Picker.Item key={k} label={value.title} value={value.title} />
                            ))}
                        </Picker>
                        {selectedValue == null && (
                            <Text style={{color: 'white', marginVertical: 5, fontSize: 12, alignSelf: 'center'}}>Please Select ID Type</Text>
                        )}
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
                    onPress={() => selectedValue == null?false:handleSubmit()}
                >
                    SUBMIT
                </Button>
                <Image source={require('../assets/wave.png')} style={styles.footerImage} />
                <Image source={require('../assets/wave2.png')} style={styles.footerImage} />
            </View>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Message</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
            {loading ? (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" />
                </View>
            ) : ''}
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        height: '100%',
    },
});