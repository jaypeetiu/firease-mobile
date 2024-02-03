import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import axios from "axios";

export default FirstAidScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [datas, setData] = useState();

    const handleAid = () => {
        const headers = { 'Authorization': `Bearer ${receivedValue.token}` };
        axios.defaults.baseURL = 'https://firease.tech/api';
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.csrf_token,
        }
        axios.get('aids', {
            headers
        }).then((e) => {
            setData(e.data.aids.data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('ERRRORRRR');
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                // AsyncStorage.clear();
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received, check your network connection.");
            } else {
                // Something happened in setting up the request
                console.error("Error message:", error.message);
            }
        });
    }

    useEffect(() => {
        handleAid();
    }, []);

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    const handlePreview = (id, title, image, sdescription, description) => {
        console.log(id);
        navigation.navigate('AidPreview', {
            data: {
                'token': receivedValue.token,
                'id': id,
                'title': title,
                'image': image,
                'shortdescription': sdescription,
                'description': description,
            }
        });
    }

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>FIRST AID TIPS</Text>
                {datas != '' ? datas?.map((value) => (
                    <TouchableOpacity key={value.id} onPress={() => { handlePreview(value.id, value.title, value.image, value.shortdescription, value.description) }}>
                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={{ uri: value.image }} style={{ width: '30%', height: 100, margin: 10 }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>{value.title}</Text>
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>{value.shortdescription}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )) : <Text style={{ fontSize: 16, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'center' }}>No Aid Tips Available</Text>
                }
                {/* <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid11.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>BURNS</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Minor Burns</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid2.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>CUTS AND SCRAPES</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Cuts and Scrapes</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid3.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>NOSEBLEEDS</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Nosebleeds</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid4.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>BITES</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Animal Bites</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid5.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>STINGS</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Insects Stings</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/aid6.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>SPRAINS AND STRAINS</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>First Aid for Sprains ans Strains</Text>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
}