import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default FirstAidScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>FIRST AID TIPS</Text>
                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
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
                </View>
            </ScrollView>
        </View>
    );
}