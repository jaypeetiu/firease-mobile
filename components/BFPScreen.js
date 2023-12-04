import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default BFPScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 40, justifyContent: 'center' }}>ABOUT BFP</Text>
                <Avatar.Image source={require('../assets/bfp.png')} style={{ margin: 20, }} size={80}/>
            </View>
            <View style={{borderWidth: 2, borderTopColor: '#9B0103', borderBottomColor: '#9B0103', padding: 20}}>
                <Text style={{fontSize: 24, color: '#FFFF', fontWeight: 'bold', alignSelf: 'center'}}>BFP VISION</Text>
            </View>
            <Text style={{color: '#9B0103', padding: 10, paddingVertical: 30, alignSelf: 'center', fontSize: 18, textAlign: 'justify'}}>A modern fire service fully capable of ensuring a fire safe nation by 2034.</Text>
            <View style={{borderWidth: 2, borderTopColor: '#9B0103', borderBottomColor: '#9B0103', padding: 20}}>
                <Text style={{fontSize: 24, color: '#FFFF', fontWeight: 'bold', alignSelf: 'center'}}>BFP MISSION</Text>
            </View>
            <Text style={{color: '#9B0103', padding: 10, paddingVertical: 30, alignSelf: 'center', fontSize: 18, textAlign: 'justify'}}>We commit to prevent and suppress destructive fires, investigate its causes; enforce Fire code and other related laws; respond to man-made and natural disasters and other emergencies.</Text>
        </View>
    );
}