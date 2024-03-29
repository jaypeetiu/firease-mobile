// LoginScreen.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Dialog, Provider as PaperProvider, Text, Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { setLocalStorageItem } from '../utils/setLocalStorageItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState('');

    const hideDialog = () => {
        setVisible(false);
        navigation.navigate('Login');
    };

    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        const valueToken = await AsyncStorage.getItem('deviceToken');
        if(valueToken!=null){
            setToken(valueToken)
        }
        if (value != null) {
            navigation.navigate('MainApp');
        }
    }

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleLogin = () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('remember_me', remember);
        try {
            axios.defaults.baseURL = 'https://fireasecdo-ffdead396a7d.herokuapp.com/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.post('auth/login', {
                'email': email,
                'password': password,
                'remember_me': remember,
                'device_token': token
            }).then((e) => {
                    setLocalStorageItem("userToken", e.data.token, 9999);
                    setLocalStorageItem("userID", JSON.stringify(e.data.user.id), 9999);
                    setLocalStorageItem("user", e.data.user.name, 9999);
                    setLocalStorageItem("userAvatar", e.data.user.avatar, 9999);
                    setLocalStorageItem("userPhone", e.data.user.phone_number ? e.data.user.phone_number : 'No Phone number', 9999);
                    navigation.navigate('MainApp');
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        console.error("Response data:", error.response.data);
                        console.error("Response status:", error.response.status);
                        console.error("Response headers:", error.response.headers);
                        setMessage(error.response.data.message);
                        setVisible(true);
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

    return (
        <View style={styles.container}>
            <PaperProvider>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image
                        size={150}
                        source={require('../assets/logo.png')}
                        style={{ padding: '50px', backgroundColor: '#000' }}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        mode='outlined'
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        textContentType="password"
                        mode='outlined'
                    />
                    <Button
                        mode="contained"
                        onPress={() => handleLogin()}
                        style={{ width: 200, backgroundColor: 'red', marginTop: 10 }}
                        textColor='white'
                    >
                        Login
                    </Button>
                </View>
            </PaperProvider>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Message</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    input: {
        height: 30,
        margin: 5,
        padding: 5,
        fontSize: 14,
        width: 300,
        top: 5,
    },
});

export default LoginScreen;