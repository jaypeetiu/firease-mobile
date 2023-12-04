import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, ScrollView, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default CitizenScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <ScrollView style={{ flex: 1 }}>
            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 40, justifyContent: 'center' }}>CITIZEN'S CHARTER</Text>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', borderTopColor: '#9B0103', borderTopWidth: 2, paddingTop: 30 }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Inspection Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>New Business Permit WITH Valid FSIC during Occupancy Permit Stage</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Inspection Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>New Business Permit WITHOUT Valid FSIC during Occupancy Permit Stage</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Inspection Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>Renewal of FSIC for Business Permit WITHOUT Valid FSIC or Expired FSIC/ Existing Violations of the Fire Code/ Included in the Negative List</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Inspection Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>FSIC for Renewal of Business Permit</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Inspection Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>FSIC for Occupancy Permit</Text>
                </View>
            </View>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={require('../assets/charter.png')} style={{ width: '30%', height: 100, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFF', padding: 10, textAlign: 'left', width: '70%' }}>Fire Safety Evaluation Certificate</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'left', width: '70%' }}>FSEC for Building Permit</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    );
}