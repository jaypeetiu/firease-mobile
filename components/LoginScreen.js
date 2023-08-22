// LoginScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Provider as PaperProvider, Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        navigation.navigate('MainApp');
    };

    return (
        <View style={styles.container}>
            <PaperProvider>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image
                        size={150}
                        source={require('../assets/logo.png')}
                        style={{padding: '50px', backgroundColor: '#000'}}
                    />
                    <TextInput
                        label="Email"
                        secureTextEntry
                        onChangeText={text => setEmail(text)}
                        style={{ width: '80%', marginVertical: 10 }}
                    />
                    <TextInput
                        label="Password"
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        style={{ width: '80%', marginVertical: 10 }}
                    />
                    <Button
                        mode="contained"
                        onPress={() => handleLogin()}
                        style={{ width: '50%', backgroundColor: 'red' }}
                    >
                        Login
                    </Button>
                </View>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});

export default LoginScreen;