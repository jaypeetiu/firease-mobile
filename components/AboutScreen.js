import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

export default AboutScreen = ({ navigation }) => {
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
                            source={require('../assets/logo.png')}
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
                        About Firease
                    </Text>
                    <Text
                        variant="titleMedium"
                        style={{ alignSelf: 'center', marginTop: '10%', margin: '5%', color: '#000', textAlign: 'justify', fontWeight: '700' }}
                    >
                        The Firease application is a fire emergency hotline. The user(s) can communicate with the fire stations by tapping the logo button without the hassle of calling the admin and specifying their emergency needs, you just need to send picture for proof and evidence. In addition, the application has access to your GPS location.
                    </Text>
                </View>
            </ScrollView>
        </View >

    );
};
