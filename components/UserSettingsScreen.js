import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

export default UserSettingsScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';

    const handleLogout = () => {
        const headers = { 'Authorization': `Bearer ${receivedValue.token}` };
        axios.defaults.baseURL = 'https://firease.tech/api';
        axios.post('/auth/logout', null, {
            headers
        }).then((e) => {
            console.log(e.data);
            AsyncStorage.clear();
            navigation.navigate('GetStarted');
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                AsyncStorage.clear();
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received, check your network connection.");
            } else {
                // Something happened in setting up the request
                console.error("Error message:", error.message);
            }
        });
    };

    const handleAbout = () => {
        navigation.navigate('About', {
            data: {
                'token': receivedValue.token,
                'user': receivedValue.user,
                'phone': receivedValue.phone,
                'badge': receivedValue.badge,
                'avatar': receivedValue.avatar,
            }
        });
    }

    const handleLegal = () => {
        navigation.navigate('Legal', {
            data: {
                'token': receivedValue.token,
                'user': receivedValue.user,
                'phone': receivedValue.phone,
                'badge': receivedValue.badge,
                'avatar': receivedValue.avatar,
            }
        });
    }

    return (

        <View style={{ flex: 1, height: '100%', backgroundColor: '#FFF' }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 120, backgroundColor: '#9B0103' }}>
                    <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
                        <Text variant='titleLarge' style={{ color: 'white' }}>{receivedValue.user}</Text>
                        <Text variant='titleMedium' style={{ color: 'white' }}>{receivedValue.phone}</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} >
                        <Avatar.Image
                            size={60}
                            source={receivedValue.avatar? { uri: receivedValue.avatar }:require('../assets/logo.png')}
                            style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                        />
                        <Text variant='labelSmall' style={{ color: '#B09E40' }}>{receivedValue.badge}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text
                        style={{
                            width: '90%',
                            backgroundColor: '#9B0103',
                            marginTop: 20,
                            alignSelf: 'center',
                            borderWidth: 2,
                            borderColor: '#fff',
                            textAlign: 'center',
                            borderRadius: 50,
                            color: '#FFF',
                            padding: 10,
                        }}
                    >
                        Settings
                    </Text>
                    <TouchableOpacity onPress={() => { handleAbout() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                        <Image
                            source={require('../assets/help-about.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 30, marginBottom: 5 }}
                        />
                        <Text style={{
                            alignSelf: 'center', 
                            fontSize: 18, 
                            marginTop: 5,
                            color: '#FFF',
                            borderWidth: 1,
                            borderRadius: 50,
                            backgroundColor: '#9B0103',
                            paddingHorizontal: 50,
                            paddingVertical: 5,
                            borderColor: '#9B0103'
                        }}>About Firease</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleLegal() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                        <Image
                            source={require('../assets/contract.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 30, marginBottom: 5 }}
                        />
                        <Text style={{
                            alignSelf: 'center', 
                            fontSize: 18, 
                            marginTop: 5,
                            color: '#FFF',
                            borderWidth: 1,
                            borderRadius: 50,
                            backgroundColor: '#9B0103',
                            paddingHorizontal: 50,
                            paddingVertical: 5,
                            borderColor: '#9B0103'
                        }}>Legal & Policies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 30 }}>
                        <Image
                            source={require('../assets/delete.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 30, marginBottom: 5 }}
                        />
                        <Text style={{
                            alignSelf: 'center', 
                            fontSize: 18, 
                            marginTop: 5,
                            color: '#FFF',
                            borderWidth: 1,
                            borderRadius: 50,
                            backgroundColor: '#9B0103',
                            paddingHorizontal: 50,
                            paddingVertical: 5,
                            borderColor: '#9B0103'
                        }}>Delete Account</Text>
                    </TouchableOpacity>
                    <Button
                        mode="contained"
                        style={{ width: 200, backgroundColor: '#9B0103', marginTop: 20, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                        textColor="#fff"
                        onPress={() => {handleLogout()}}
                    >
                        Logout
                    </Button>
                </View>
            </ScrollView>
        </View >

    );
};
