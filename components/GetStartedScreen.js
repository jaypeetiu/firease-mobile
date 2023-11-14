import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default GetStartedScreen = ({ navigation }) => {

    const handleNext = () => {
        navigation.navigate('Guidelines');
    };

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <Appbar.Header style={{ backgroundColor: '#F78900' }}>
                <Appbar.Content title={"Welcome"} color="#000" />
            </Appbar.Header>
            <Avatar.Image
                size={150}
                source={require('../assets/logo.png')}
                style={{ padding: '50px', backgroundColor: '#000', alignSelf: 'center', marginTop: '35%' }}
            />
            <Text
                variant="titleLarge"
                style={{ alignSelf: 'center', marginTop: '5%', borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: '#9B0103', color: '#F78900' }}>Relax, You are safe here.
            </Text>
            <Text
                variant="titleMedium"
                style={{ alignSelf: 'center', marginTop: '5%', color: '#F78900' }}>Always here, incase you need help.
            </Text>
            <Button
                mode="contained"
                style={{ width: '50%', backgroundColor: '#9B0103', marginTop: 40, alignSelf: 'center' }}
                textColor="#fff"
                onPress={() => handleNext()}
            >
                Get Started
            </Button>
        </View>
    );
}