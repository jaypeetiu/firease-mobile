import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

export default LegalScreen = ({ navigation }) => {
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
                        Legal & Policies
                    </Text>
                    <View style={{ borderWidth: 1, padding: 5, margin: 10, borderColor: '#9B0103' }}>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginTop: '5%', margin: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            Terms of Service:
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            Welcome to Firease, the fire emergency hotline application. By using Firease, you agree to comply with the terms and conditions outlined in this document. Please read these terms carefully before using the application.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            1. Acceptance of Terms: By downloading, installing, or using the Firease application, you acknowledge that you have read, understood, and agree to be bound by these terms.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            2. Emergency Services: Firease is designed to facilitate communication with fire stations during emergencies. Users can initiate contact with the fire station by tapping the logo button in the application. The application allows users to send pictures for proof and evidence of the emergency.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            3. User Responsibilities: Users must use Firease responsibly and only in genuine emergency situations. False alarms or misuse of the application may result in legal consequences. Users are solely responsible for the accuracy and truthfulness of the information provided.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            4. Proof and Evidence: Users can send pictures through the application to provide proof and evidence of the emergency. By doing so, users consent to the use of these images by emergency responders for verification and assessment purposes.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            5. GPS Location: Firease has access to the user's GPS location to provide accurate information to emergency responders. Users consent to the collection and use of their location data for emergency purposes.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            6. Privacy and Data Security: Firease is committed to protecting user privacy and data security. Personal information and data collected by the application will be used solely for emergency response purposes and will not be shared with third parties without explicit user consent.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            7. Liability: Firease and its developers are not liable for any damages, losses, or injuries arising from the use of the application. Users understand that the application is a tool to facilitate communication with emergency services and should not replace traditional emergency reporting methods.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            8. Emergency Response Time: Users acknowledge that the effectiveness of emergency response depends on various factors, including but not limited to, the availability of emergency services, network conditions, and the accuracy of the information provided by the user.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            9. Updates and Changes: Firease may update its application to improve functionality and security. Users are encouraged to keep their application updated to ensure optimal performance.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            10. Contact Information: For any inquiries or concerns regarding the Firease application, please contact contact@firease.com.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'center', marginHorizontal: '5%', marginTop: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            11. By using Firease, you agree to these terms and conditions. Failure to comply with these terms may result in the termination of your access to the application and legal consequences. Firease reserves the right to update these terms at any time without prior notice. It is the user's responsibility to review the terms periodically for changes.
                        </Text>
                        <Text
                            variant="titleMedium"
                            style={{ alignSelf: 'flex-start', marginHorizontal: '5%', marginVertical: '5%', color: '#000', textAlign: 'justify', fontWeight: '500' }}
                        >
                            Effective Date: December 18, 2023 Last Updated: December 18,2023
                        </Text>
                    </View>

                </View>
            </ScrollView>
        </View >

    );
};
