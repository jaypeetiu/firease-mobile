import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

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

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const handleSubmit = () => {
        console.log(true);
    }

    return (

        <View style={{ flex: 1, height: '100%', backgroundColor: '#FFF' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, height: '100%', backgroundColor: '#9B0103' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }} >
                        <Avatar.Image
                            size={60}
                            source={require('../assets/logo.png')}
                            style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                        />
                        <Text variant='labelSmall' style={{ color: '#B09E40' }}>{receivedValue.badge}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text variant='titleLarge' style={{ color: 'white' }}>{receivedValue.user}</Text>
                        <Text variant='titleMedium' style={{ color: 'white' }}>{receivedValue.phone}</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'column', marginVertical: 10, borderWidth: 1, borderRadius: 50, marginHorizontal: 100, padding: 5, borderColor: '#FFF' }}>
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
        </View >

    );
};
