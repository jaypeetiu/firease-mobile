import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image } from 'react-native';
import { Avatar, Button, Surface, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingScreen = ({ navigation }) => {
    const [token, setUserToken] = useState('');
    const [user, setUser] = useState();
    const [phone, setPhone] = useState();
    const [avatar, setAvatar] = useState();
    const [badge, setBadge] = useState('Beginner');
    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        const user = await AsyncStorage.getItem('user');
        const phone = await AsyncStorage.getItem('userPhone');
        const avatar = await AsyncStorage.getItem('userAvatar');
        console.log(value);
        setUserToken(value);
        setUser(user);
        setPhone(phone);
        setAvatar(avatar);
        if (value == null && !value) {
            navigation.navigate('Login');
        }
    }
    useEffect(() => {
        fetchData();
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

    const handleProfile = () => {
        navigation.navigate('UserProfile', {
            data: {
                'token': token,
                'user': user,
                'phone': phone,
                'badge': badge,
                'avatar': avatar,
            }
        });
    }

    const handleSettings = () => {
        navigation.navigate('UserSettings', {
            data: {
                'token': token,
                'user': user,
                'phone': phone,
                'badge': badge,
                'avatar': avatar,
            }
        });
    }

    const handleHelp = () => {
        navigation.navigate('Help', {
            data: {
                'token': token,
                'user': user,
                'phone': phone,
                'badge': badge,
                'avatar': avatar,
            }
        });
    }

    const handleHistory = () => {
        navigation.navigate('History', {
            data: {
                'token': token,
                'user': user,
                'phone': phone,
                'badge': badge,
                'avatar': avatar,
            }
        });
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
                        source={avatar? { uri: avatar }:require('../assets/logo.png')}
                        style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                    />
                    <Text variant='labelSmall' style={{ color: '#B09E40' }}>{badge}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity onPress={() => { handleProfile() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                    <View style={{ width: 100 }}>
                        <Image
                            source={require('../assets/profile.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 40, marginBottom: 5 }}
                        />
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18, marginTop: 20 }}>Edit Profile</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingLeft: 100,
                        width: 100
                    }}>
                        <Image
                            source={require('../assets/vector.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 100, marginBottom: 5 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleSettings() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                    <View style={{ width: 100 }}>
                        <Image
                            source={require('../assets/settings.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 40, marginBottom: 5 }}
                        />
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18, marginTop: 20 }}>Settings</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingLeft: 100,
                        width: 100
                    }}>
                        <Image
                            source={require('../assets/vector.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 100, marginBottom: 5 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleHelp() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                    <View style={{ width: 100 }}>
                        <Image
                            source={require('../assets/help.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 40, marginBottom: 5 }}
                        />
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18, marginTop: 20 }}>Help</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingLeft: 100,
                        width: 100
                    }}>
                        <Image
                            source={require('../assets/vector.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 100, marginBottom: 5 }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handleHistory() }} style={{ flexDirection: 'row', marginVertical: 30 }}>
                    <View style={{ width: 100 }}>
                        <Image
                            source={require('../assets/history.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 40, marginBottom: 5 }}
                        />
                    </View>
                    <View style={{ width: 100 }}>
                        <Text style={{ alignSelf: 'flex-start', fontSize: 18, marginTop: 20 }}>History</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingLeft: 100,
                        width: 100
                    }}>
                        <Image
                            source={require('../assets/vector.png')}
                            style={{ backgroundColor: '#fff', alignSelf: 'center', margin: 10, marginHorizontal: 100, marginBottom: 5 }}
                        />
                    </View>
                </TouchableOpacity>
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


export default SettingScreen;
