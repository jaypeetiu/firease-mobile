import React from 'react';
import { View, Text, Button } from 'react-native';

const MainAppScreen = ({ navigation }) => {
    const handleLogout = () => {
        navigation.navigate('Login');
    };

    return (
        <View>
            <Text>Welcome to the Main App Screen!</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

export default MainAppScreen;
