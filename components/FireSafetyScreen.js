import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import axios from "axios";

export default FireSafetyScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [safety, setSafety] = useState();

    const handleSafety = () => {
        const headers = { 'Authorization': `Bearer ${receivedValue.token}` };
        axios.defaults.baseURL = 'https://firease.tech/api';
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.csrf_token,
        }
        axios.get('safety', {
            headers
        }).then((e) => {
            console.log(e.data.safety.data);
            setSafety(e.data.safety.data);
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
        handleSafety();
    }, []);

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>FIRE SAFETY TIPS</Text>
            {safety != '' ? safety?.map((value) => (
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{ uri: value.image }} style={{ width: '30%', height: 100, margin: 10 }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>{value.title}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>{value.shortdescription}</Text>
                    </View>
                </View>
            )) : <Text style={{ fontSize: 16, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'center' }}>No Safety Tips Available</Text>
            }
            {/* <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/fire.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>BEFORE</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>What to do before the fire?</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/fire2.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>DURING</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>What to do during the fire?</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/fire3.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>AFTER</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>What to do after the fire?</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/fire4.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>FIRE EXTINGUISHER</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>How to use a fre extinguisher?</Text>
                </View>
            </View> */}
        </View>
    );
}