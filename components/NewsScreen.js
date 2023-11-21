import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
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
                    <Text variant='labelSmall' style={{ color: '#B09E40' }}>Responder</Text>
                </View>
            </View>
            <Text variant='titleLarge' style={{ color: '#9B0103', fontWeight: 'bold', marginHorizontal: 10 }}>NEWS UPDATES</Text>
            
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
});


export default NewsScreen;
