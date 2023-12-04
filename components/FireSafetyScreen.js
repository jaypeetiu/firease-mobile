import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default FireSafetyScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>FIRE SAFETY TIPS</Text>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
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
            </View>
        </View>
    );
}