import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { Avatar, Button, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

export default ProfileScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [selfieUri, setSelfieUri] = useState(null);
    const [loading, setLoading] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleSubmit = () => {
        console.log(true);
    }

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
                setLoading(true);
                setSelfieUri(response.assets[0].uri);
                const formData = new FormData();
                formData.append('selfie', {
                    uri: response.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'selfie.jpg',
                });
                try {
                    axios.defaults.baseURL = 'https://firease.tech/api';
                    axios.defaults.headers.common = {
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': window.csrf_token,
                    }
                    axios.post('profile/upload', formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${receivedValue.token}`
                            },
                        }).then((e) => {
                            console.log(e.data.selfieImage);
                            setLoading(false);
                            Dialog.show({
                                closeOnOverlayTap: true,
                                type: ALERT_TYPE.SUCCESS,
                                title: 'Success',
                                textBody: 'Uploaded Successfully!',
                                button: 'close',
                                autoClose: '5000'
                            });
                        }).catch((error) => {
                            if (error.response) {
                                // The request was made and the server responded with a status code
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
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };


    return (
        <View style={{ flex: 1, height: '100%', backgroundColor: '#FFF' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, height: '100%', backgroundColor: '#9B0103' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }} >
                        <Avatar.Image
                            size={60}
                            source={receivedValue.avatar ? { uri: receivedValue.avatar } : require('../assets/logo.png')}
                            style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                        />
                        <Text variant='labelSmall' style={{ color: '#B09E40' }}>{receivedValue.badge}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text variant='titleLarge' style={{ color: 'white' }}>{receivedValue.user}</Text>
                        <Text variant='titleMedium' style={{ color: 'white' }}>{receivedValue.phone}</Text>
                    </View>
                    <TouchableOpacity onPress={takeSelfie} style={{ flexDirection: 'column', marginVertical: 10, borderWidth: 1, borderRadius: 50, marginHorizontal: 100, padding: 5, borderColor: '#FFF' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 12, color: '#FFF' }}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode='outlined'
                        style={{
                            height: 30,
                            margin: 15,
                            padding: 5,
                            fontSize: 14,
                        }}
                    />
                    <TextInput
                        placeholder="Old Password"
                        value={password}
                        onChangeText={setPassword}
                        mode='outlined'
                        style={{
                            height: 30,
                            margin: 15,
                            padding: 5,
                            fontSize: 14,
                        }}
                    />
                    {password.length > 0 && password.length < 8 && (
                        <Text style={{ color: 'red', marginVertical: 5, fontSize: 12, alignSelf: 'center' }}>Password should have at least 8 characters</Text>
                    )}
                    <TextInput
                        placeholder="New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        mode='outlined'
                        style={{
                            height: 30,
                            margin: 15,
                            padding: 5,
                            fontSize: 14,
                        }}
                    />
                    {confirmPassword.length > 0 && confirmPassword.length < 8 && (
                        <Text style={{ color: 'red', marginVertical: 5, fontSize: 12, alignSelf: 'center' }}>Password should have at least 8 characters</Text>
                    )}
                    <AlertNotificationRoot />
                    <Button
                        mode="contained"
                        style={{ width: 200, backgroundColor: '#9B0103', marginTop: 20, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                        textColor="#fff"
                        onPress={() => confirmPassword.length < 8 && password.length < 8 ? false : handleSubmit()}
                    >
                        SUBMIT
                    </Button>
                </View>
            </ScrollView>
            {loading ? (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" />
                </View>
            ) : ''}
        </View >
    );
};
const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        height: '100%',
    },
});