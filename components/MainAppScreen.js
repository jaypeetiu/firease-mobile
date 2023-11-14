import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainAppScreen = ({ navigation }) => {
    const [token, setUserToken] = useState();
    async function fetchData() {
        const value = await AsyncStorage.getItem('userToken');
        console.log(value);
        setUserToken(value);
        if (value == null && !value) {
            navigation.navigate('Login');
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        AsyncStorage.removeItem('userToken');
        navigation.navigate('GetStarted');
    };

    return (
        <View>
            <Text>Welcome to the Main App Screen!</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default MainAppScreen;
