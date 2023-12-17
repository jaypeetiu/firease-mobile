import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Surface, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewsScreen = ({ navigation }) => {
    const [token, setUserToken] = useState('');
    const [user, setUser] = useState();
    const [phone, setPhone] = useState();
    const phoneNumber = 'tel:+123456789'; // Replace with your actual telephone number
    const [badge, setBadge] = useState('Beginner');
    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('user');
        const phone = await AsyncStorage.getItem('userPhone');
        console.log(value);
        setUserToken(value);
        setUser(user);
        setPhone(phone);
        if (value == null && !value) {
            navigation.navigate('Login');
        }
    }
    useEffect(() => {
        fetchData();
        Geolocation.getCurrentPosition(
            position => {
                console.log('Current position:', position);
                // Handle the location data
            },
            error => {
                console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }, []);

    const userbadge = () => {
        if (token != '') {
            const headers = { 'Authorization': `Bearer ${token}` };
            axios.defaults.baseURL = 'https://firease.tech/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.get('post/user/badge', {
                headers
            }).then((e) => {
                setBadge(e.data.badge);
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('ERRRORRRR');
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
        }
    }
    userbadge();

    const handleNews = () => {
        navigation.navigate('Blog', {
            data: {
                'token': token,
            }
        });
    }

    const handleAid = () => {
        navigation.navigate('FirstAid');
    }

    const handleSafety = () => {
        navigation.navigate('FireSafety');
    }

    const handleAbout = () => {
        navigation.navigate('BFP');
    }

    const handleCitizen = () => {
        navigation.navigate('Citizen');
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 120, backgroundColor: '#9B0103' }}>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
                    <Text variant='titleLarge' style={{ color: 'white' }}>{user}</Text>
                    <Text variant='titleMedium' style={{ color: 'white' }}>{phone}</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} >
                    <Avatar.Image
                        size={60}
                        source={require('../assets/logo.png')}
                        style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                    />
                    <Text variant='labelSmall' style={{ color: '#B09E40' }}>{badge}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => { handleNews() }} style={styles.column}>
                        <Image
                            source={require('../assets/news.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>NEWS</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleAid() }} style={styles.column}>
                        <Image
                            source={require('../assets/aid.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>FIRST AID TIPS</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => { handleSafety() }} style={styles.column}>
                        <Image
                            source={require('../assets/tips.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>FIRE SAFETY TIPS</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleAbout() }} style={styles.column}>
                        <Image
                            source={require('../assets/info.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>ABOUT BFP</Text></TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => { handleCitizen() }} style={{
                        flex: 1,
                        borderColor: '#9B0103',
                        borderWidth: 3,
                        borderRadius: 100,
                        alignItems: 'center',
                        paddingVertical: 40,
                        padding: 20,
                        margin: 8,
                        backgroundColor: '#fff',
                        marginHorizontal: 100
                    }}>
                        <Image
                            source={require('../assets/citizen.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', padding: 0, alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}
                        />
                        <Text style={{ fontWeight: 'bold' }}>CITIZEN'S CHARTER</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    customMarker: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 5,
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1,
        borderColor: '#9B0103',
        borderWidth: 3,
        borderRadius: 100,
        alignItems: 'center',
        paddingVertical: 40,
        padding: 20,
        margin: 8,
        backgroundColor: '#fff',
    },
});


export default NewsScreen;
