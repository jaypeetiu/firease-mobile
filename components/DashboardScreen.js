import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native';
import { Avatar, Button, Modal, PaperProvider, Portal, Surface, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';

const DashboardScreen = ({ navigation }) => {
    const [token, setUserToken] = useState('');
    const [userID, setUserID] = useState();
    const [user, setUser] = useState();
    const [phone, setPhone] = useState();
    const [avatar, setAvatar] = useState();
    const [locations, setLocations] = useState([]);
    const phoneNumber = 'tel:911'; // Replace with your actual telephone number
    const cameraRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [cam, setCam] = useState(false);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [badge, setBadge] = useState('Beginner');
    //Confirmation
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    //Modal Notification
    const showModalNotif = () => setVisibleModal(true);
    const hideModalNotif = () => setVisibleModal(false);
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.current.takePictureAsync(options);
            setCapturedImage(data);
        }
    };

    Geolocation.getCurrentPosition(
        position => {
            console.log('Current position:', position);
            setLoading(true);
            axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCYxHTd4H5yAuZ3K6_MT1DuJ9XvDVhNTQs`
            ).then(response => {
                const firstAddress = response.data.results[0];
                // if (firstAddress) {
                setAddress(firstAddress.formatted_address);
                // }
            }).catch(error => console.error('Error fetching address:', error));
            console.log(address);
            setLoading(false);
        },
        error => {
            console.log('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    const uploadImage = async () => {
        hideModal();
        setLoading(true);
        try {
            console.log(capturedImage.uri);
            const formData = new FormData();
            formData.append('image', {
                uri: capturedImage.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append('address', address);
            formData.append('user_id', userID);
            formData.append('vehicle_id', 1);
            formData.append('station_id', 1);//changeable

            axios.defaults.baseURL = 'https://firease.tech/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            const response = await axios.post('post/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            }).then((e) => {
                console.log(e.data);
                setCapturedImage(null);
                setCam(false);
                setLoading(false);
                showModalNotif();
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error(token);
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received, check your network connection.");
                } else {
                    // Something happened in setting up the request
                    console.error("Error message:", error.message);
                }
            });

            console.log('Image uploaded successfully:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };
    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        const ID = await AsyncStorage.getItem('userID');
        const user = await AsyncStorage.getItem('user');
        const phone = await AsyncStorage.getItem('userPhone');
        const avatar = await AsyncStorage.getItem('userAvatar');
        console.log(avatar);
        setUserToken(value);
        setUserID(ID);
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

    const stations = () => {
        if (token != '') {
            const headers = { 'Authorization': `Bearer ${token}` };
            axios.defaults.baseURL = 'https://firease.tech/api';
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': window.csrf_token,
            }
            axios.get('stations', {
                headers
            }).then((e) => {
                console.log(e.data.stations);
                setLocations(e.data.stations);
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error(token);
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
                // e.data.badge > 2 ? setBadge('Good Samaritan') : null;
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

    useEffect(() => {
        stations();
    }, []);

    const handleLogout = () => {
        const headers = { 'Authorization': `Bearer ${token}` };
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

    const handleMarkerPress = (marker) => {
        console.log(`Marker ${marker.id} pressed!`);
        // Add your custom logic for handling marker press
    };

    const handleCall = () => {
        Linking.openURL(phoneNumber);
    };

    // const takePicture = async (camera) => {
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.takePictureAsync(options);
    //     //  eslint-disable-next-line
    //     console.log(data.uri);
    //     setCapturedImage(data);
    // };

    const PendingView = () => (
        <View
            style={{
                flex: 1,
                backgroundColor: 'lightgreen',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Waiting</Text>
        </View>
    );

    const handleCamera = () => {
        setCam(true);
    }

    return (
        <PaperProvider>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', height: 120, backgroundColor: '#9B0103' }}>
                    <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }} >
                        <Text variant='titleLarge' style={{ color: 'white' }}>{user}</Text>
                        <Text variant='titleMedium' style={{ color: 'white' }}>{phone}</Text>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }} >
                        <Avatar.Image
                            size={60}
                            source={avatar ? { uri: avatar } : require('../assets/logo.png')}
                            style={{ backgroundColor: '#000', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40' }}
                        />
                        <Text variant='labelSmall' style={{ color: '#B09E40' }}>{badge}</Text>
                    </View>
                </View>
                {/* <Button title="Logout" onPress={handleLogout} /> */}
                <Text variant='titleLarge' style={{ color: '#9B0103', fontWeight: 'bold', marginHorizontal: 10 }}>FIRE STATION NEARBY</Text>
                <View style={{ flexDirection: 'column' }}>
                    <MapView
                        style={{ flex: 1, minHeight: 300 }}
                        initialRegion={{
                            latitude: 8.4810899,
                            longitude: 124.6498201,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {locations != '' ? locations?.map((marker) => (
                            <Marker
                                key={marker.id}
                                coordinate={{ latitude: JSON.parse(marker.lat), longitude: JSON.parse(marker.lang) }}
                                title={marker.address}
                                description={marker.description}
                                onPress={() => handleMarkerPress(marker)}
                            >
                                <View style={styles.customMarker}>
                                    <Text style={styles.markerText}>{marker.address}</Text>
                                </View>
                            </Marker>
                        )) : stations()}
                    </MapView>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                padding: 10,
                                paddingHorizontal: 15,
                                backgroundColor: '#9B0103',
                                borderRadius: 50,
                                zIndex: 99
                            }}
                            onPress={handleCall}
                        >
                            <Icon name="phone" size={30} color="#fff" />
                        </TouchableOpacity>
                        {capturedImage && (
                            <>
                                <Image source={{ uri: capturedImage.uri }} style={{ width: '100%', height: 300, alignSelf: 'center', borderWidth: 2, borderColor: '#9B0103' }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Button title="Upload Image" onPress={showModal} textColor='white' style={{ backgroundColor: '#9B0103', width: '50%' }}>UPLOAD</Button>
                                    <Button title="Remove Image" onPress={() => setCapturedImage(null)} textColor='white' style={{ backgroundColor: '#9B0103', width: '50%' }}>REMOVE</Button>
                                </View>
                            </>
                        )}
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ padding: 20, backgroundColor: '#F78900', borderRadius: 10, marginHorizontal: 20 }}>
                                <Text style={{ alignSelf: 'center', paddingBottom: 20, fontWeight: 'bold', color: '#FFF' }}>Are you sure?</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Button title="Yes" onPress={uploadImage} textColor='white' style={{ backgroundColor: '#9B0103', width: '45%', marginHorizontal: 5 }}>Yes</Button>
                                    <Button title="No" onPress={hideModal} textColor='white' style={{ backgroundColor: '#9B0103', width: '45%', marginHorizontal: 5 }}>No</Button>
                                </View>
                            </Modal>
                        </Portal>
                        <Portal>
                            <Modal visible={visibleModal} onDismiss={hideModalNotif} contentContainerStyle={{ padding: 20, backgroundColor: '#F78900', borderRadius: 10, marginHorizontal: 20 }}>
                                <Text style={{ alignSelf: 'baseline', paddingBottom: 20, fontWeight: 'bold' }}>
                                    Hello, we received a notification that you need us, they are on their way now.
                                </Text>
                                <Text style={{ alignSelf: 'baseline', paddingBottom: 20, fontWeight: 'bold' }}>Pro tips: </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Stop all activities immediately.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Assess that all persons can evacuate the area.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Follow EXIT signs to the nearest safe exit.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Use the stairs.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Allow others to enter the stairwell.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Steer clear of hazards.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Move away from the building.</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>Do not re-enter the building without an “all clear”.</Text>
                                </View>
                            </Modal>
                        </Portal>
                        {cam == true && capturedImage == null ? (
                            <RNCamera
                                ref={cameraRef}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                                androidRecordAudioPermissionOptions={{
                                    title: 'Permission to use audio recording',
                                    message: 'We need your permission to use your audio',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                            >
                                {({ camera, status, recordAudioPermissionStatus }) => {
                                    if (status !== 'READY') return <PendingView />;
                                    return (
                                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={takePicture} style={styles.capture}>
                                                <Text style={{ fontSize: 14 }}> CAPTURE </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setCam(false)} style={styles.capture}>
                                                <Text style={{ fontSize: 14 }}> CANCEL </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
                            </RNCamera>
                        ) : ''}

                        <TouchableOpacity onPress={() => { handleCamera() }}>
                            <Avatar.Image
                                size={70}
                                source={require('../assets/logo.png')}
                                style={{ backgroundColor: '#fff', alignSelf: 'center', borderWidth: 1, borderColor: '#B09E40', padding: 40, alignItems: 'center', justifyContent: 'center', top: 20 }}
                            />
                        </TouchableOpacity>

                        <Text variant='labelLarge' style={{ alignSelf: 'center', marginTop: 30, color: '#9B0103' }}>CLICK ME FOR EMERGENCY</Text>
                    </View>
                    <Text variant='labelLarge' style={{ alignSelf: 'center', marginTop: 30, backgroundColor: '#9B0103', color: '#fff', borderWidth: 1, borderColor: '#9B0103', borderRadius: 50, padding: 20, marginBottom: 20 }}>
                        If you need help/ assistance choose bottons above, don’t forget to always turn on your location, for us to directly locate you.
                    </Text>
                </View>
            </ScrollView>
            {loading ? (
                <View style={styles.overlay}>
                    <ActivityIndicator size="large" />
                </View>
            ) : ''}
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    customMarker: {
        backgroundColor: '#9B0103',
        padding: 5,
        borderRadius: 5,
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 200,
        zIndex: 100,
        borderWidth: 2,
        borderColor: '#9B0103'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    bulletPoint: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: 'bold'
    },
    instructionText: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default DashboardScreen;
