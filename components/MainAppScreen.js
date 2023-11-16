import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, Surface, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MainAppScreen = ({ navigation }) => {
    const [token, setUserToken] = useState();
    const [user, setUser] = useState([]);
    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('user');
        console.log(value);
        console.log(user);
        setUserToken(value);
        setUser(user);
        if (value == null && !value) {
            navigation.navigate('Login');
        }
    }
    useEffect(() => {
        fetchData();
        // axios.get('locations').then((e)=>{
        //     console.log(e.data);
        // })
    }, []);

    const handleLogout = () => {
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('user');
        navigation.navigate('GetStarted');
    };

    const markers = [
        {
            id: 1,
            title: 'Marker 1',
            description: 'Description for Marker 1',
            coordinate: { latitude: 37.78825, longitude: -122.4324 },
        },
        {
            id: 2,
            title: 'Marker 2',
            description: 'Description for Marker 2',
            coordinate: { latitude: 37.79825, longitude: -122.4424 },
        },
        // Add more markers as needed
    ];

    const handleMarkerPress = (marker) => {
        console.log(`Marker ${marker.id} pressed!`);
        // Add your custom logic for handling marker press
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: 120, backgroundColor: '#9B0103' }}>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
                    <Text variant='titleLarge' style={{ color: 'white' }}>{user}</Text>
                    <Text variant='titleMedium' style={{ color: 'white' }}>0912838837</Text>
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
            <Button title="Logout" onPress={handleLogout} />
            <Text variant='titleLarge' style={{ color: '#9B0103', fontWeight: 'bold', marginHorizontal: 10 }}>FIRE STATION NEARBY</Text>
            <View style={{ flexDirection: 'column' }}>
                <MapView
                    style={{ flex: 1, minHeight: 300 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            onPress={() => handleMarkerPress(marker)}
                        >
                            {/* You can customize the marker's appearance here */}
                            <View style={styles.customMarker}>
                                <Text style={styles.markerText}>{marker.title}</Text>
                            </View>
                        </Marker>
                    ))}
                </MapView>
                <View style={{ flexDirection: 'column' }}>
                    <Avatar.Image
                        size={70}
                        source={require('../assets/logo.png')}
                        style={{ backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40', padding: 40, alignItems: 'center', justifyContent: 'center', top: 20 }}
                    />
                    <Text onPress={() => { console.log(true) }} variant='labelLarge' style={{ alignSelf: 'center', marginTop: 30, color: '#9B0103' }}>CLICK ME FOR EMERGENCY</Text>
                </View>
                <Text variant='labelLarge' style={{ alignSelf: 'center', marginTop: 30, backgroundColor: '#9B0103', color: '#fff', borderWidth: 1, borderColor: '#9B0103', borderRadius: 50, padding: 20, marginBottom: 20 }}>
                    If you need help/ assistance choose bottons above, don’t forget to always turn on your location, for us to directly locate you.
                </Text>
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
});


export default MainAppScreen;
