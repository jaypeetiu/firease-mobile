import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { Avatar, Button, Dialog, Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

export default HistoryScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [histories, setHistory] = useState();
    const [loading, setLoading] = useState(false);

    const stations = () => {
        setLoading(true);
        if (receivedValue.token != '') {
            const headers = { 'Authorization': `Bearer ${receivedValue.token}` };
            axios.defaults.baseURL = 'https://firease.tech/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.get('reports', {
                headers
            }).then((e) => {
                console.log(e.data.histories);
                setHistory(e.data.histories);
                setLoading(false);
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error(receivedValue.token);
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

    useEffect(() => {
        stations();
    }, []);

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
                        Your Reported Fire Incidents
                    </Text>
                    <View style={{ padding: 5, margin: 10 }}>
                        {histories != '' ? histories?.map((value) => (
                            <View key={value.id} style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Image source={value ? { uri: value.image } : require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 10 }} />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', paddingHorizontal: 15, paddingBottom: 5, textAlign: 'left', width: 200 }}>Date: {Date(value.created_at)}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', paddingHorizontal: 15, textAlign: 'left', width: 200 }}>Location: {value.fire.address}</Text>
                                </View>
                            </View>
                        )) :
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#9B0103', padding: 10 }}>No Reports Available</Text>
                        }
                    </View>

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