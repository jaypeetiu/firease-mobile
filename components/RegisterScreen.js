// RegisterScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Button, Checkbox, Text, TextInput, Dialog, Portal, PaperProvider } from "react-native-paper";
import { setLocalStorageItem } from '../utils/setLocalStorageItem';

export default RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleRegister = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        try {
            axios.defaults.baseURL = 'https://1d89-112-198-99-52.ngrok-free.app/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.post('auth/register', {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': confirmPassword,
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
                    setMessage(error.response.data.errors.password);
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
            {/* <PaperProvider>
                <View>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Alert Message</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">{message}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </PaperProvider> */}
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
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Phone number"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                            inputMode="tel"
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            textContentType="password"
                        />
                        <TextInput
                            placeholder="New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.input}
                            textContentType="newPassword"
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color='white'
                            />
                            <Text variant="labelSmall" style={{ color: '#FFFFFF' }}>I agree with privacy and policy</Text>
                        </View>
                    </View>
                    <Text variant="labelSmall" style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20 }}>Already have an account? <Text style={{ color: '#FFFF', fontWeight: 'bold' }} onPress={() => handleNext()}>Login</Text></Text>
                    <Button
                        mode="contained"
                        style={{ width: 200, backgroundColor: '#F78900', marginTop: 20, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                        textColor="#fff"
                        onPress={() => handleRegister()}
                    >
                        NEXT
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
            </View>
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