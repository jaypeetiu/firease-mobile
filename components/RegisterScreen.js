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
    const [age, setAge] = useState('');

    useEffect(async()=>{
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);
        if(token !== null){
            navigation.navigate('Login');    
        }
    }, []);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleNext = () => {
        navigation.navigate('AttachFile', {
            data: {
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': confirmPassword,
                'phone_number': phone,
                'age': age,
            }
        });
    }

    const handleLogin = () => {
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
                        style={{ width: 300, marginTop: '5%', borderWidth: 1, borderRadius: 20, padding: 10, borderColor: '#000', color: '#fff', backgroundColor: '#9B0103', marginHorizontal: 15 }}
                    >
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                            mode='outlined'
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            mode='outlined'
                        />
                        <TextInput
                            placeholder="Age"
                            value={age}
                            onChangeText={setAge}
                            style={styles.input}
                            mode='outlined'
                        />
                        <TextInput
                            placeholder="Phone number"
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                            inputMode="tel"
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
                        {password.length > 0 && password.length < 8 && (
                            <Text style={{color: 'white', marginVertical: 5, fontSize: 12, alignSelf: 'center'}}>Password should have at least 8 characters</Text>
                        )}
                        <TextInput
                            placeholder="New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.input}
                            textContentType="newPassword"
                            mode='outlined'
                        />
                        {confirmPassword.length > 0 && confirmPassword.length < 8 && (
                            <Text style={{color: 'white', marginVertical: 5, fontSize: 12, alignSelf: 'center'}}>Password should have at least 8 characters</Text>
                        )}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                color='white'
                            />
                            <Text variant="labelSmall" style={{ color: '#FFFFFF', fontSize: 12 }}>I agree with privacy and policy</Text>
                        </View>
                    </View>
                    <Text variant="labelSmall" style={{ color: '#FFFFFF', textAlign: 'center', marginTop: 20, fontSize: 12 }}>Already have an account? <Text style={{ color: '#FFFF', fontWeight: 'bold', fontSize: 12 }} onPress={() => handleLogin()}>Login</Text></Text>
                    <Button
                        mode="contained"
                        style={{ width: 200, backgroundColor: '#F78900', marginTop: 20, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                        textColor="#fff"
                        onPress={() => confirmPassword.length < 8 && password.length < 8 ? false:handleNext()}
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
        height: 30,
        margin: 5,
        // borderWidth: 1,
        padding: 5,
        fontSize: 14,
    },
});