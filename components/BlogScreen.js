import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import axios from "axios";

export default BlogScreen = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';
    const [news, setNews] = useState();
    const [newsLists, setNewsLists] = useState();

    const handleNews = async () => {
        axios.defaults.baseURL = 'https://firease.tech/api';
        axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': window.csrf_token,
        }
        await axios.get('news', {
            headers: {
                'Authorization': `Bearer ${receivedValue.token}`
            },
        }).then((e) => {
            console.log(e.data.lists.data)
            setNews(e.data.news);
            setNewsLists(e.data.lists.data);
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error(receivedValue.token);
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
    }

    useEffect(() => {
        handleNews();
    }, []);


    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (

        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>BREAKING NEWS</Text>
                <Image source={news ? { uri: news.image } : require('../assets/logo.png')} style={{ width: '100%', maxHeight: 200, minHeight: 200, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#9B0103', padding: 10 }}>{news ? news.description : 'No Breaking News Available'}</Text>

                {newsLists != '' ? newsLists?.map((value) => (
                    <View key={value.id} style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image source={value ? { uri: value.image } : require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>{value.description}</Text>
                    </View>
                )) :
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#9B0103', padding: 10 }}>{news ? news.description : 'No News Available'}</Text>
                }
                {/* <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={require('../assets/logo.png')} style={{ width: '50%', minHeight: 130, borderWidth: 2, borderColor: '#FFF5', borderRadius: 15 }} />
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '50%' }}>31 Killed In Fire On Philippine Ferry, Several Missing</Text>
                </View> */}
            </ScrollView>
        </View>
    );
}