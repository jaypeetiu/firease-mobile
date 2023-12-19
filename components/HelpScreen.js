import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

export default HelpScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';

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
                        How can we help?
                    </Text>
                    <View style={{ borderWidth: 1, padding: 5, margin: 10, borderColor: '#9B0103', backgroundColor: '#9B0103', borderRadius: 20 }}>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginTop: '5%', margin: '5%', color: '#FFF', textAlign: 'justify', fontWeight: '500' }}
                        >
                            How to use the app?
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginTop: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} In the map you can see the nearest station in your current location.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginTop: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} Click the Firease logo.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginTop: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} Take a picture to the fire incident.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginTop: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} Upload the picture.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginTop: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} Select Yes and you will receive a notification. Make sure to follow the safety tips.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginVertical: '5%', color: '#FFF', textAlign: 'left', fontWeight: '500' }}
                        >
                            {'\u2022'} There is call icon beside of the firease logo, just click that so you can call derictly the 911.
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View >

    );
};
