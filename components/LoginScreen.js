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
        navigation.navigate('GetStarted');
    };

    return (
        <View style={styles.container}>
            <PaperProvider>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar.Image
                        size={150}
                        source={require('../assets/logo.png')}
                        style={{ padding: '50px', backgroundColor: '#000' }}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        textContentType="password"
                    />
                    <Button
                        mode="contained"
                        onPress={() => handleLogin()}
                        style={{ width: 200, backgroundColor: 'red', marginTop: 10 }}
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
    input: {
        height: 25,
        margin: 5,
        borderWidth: 1,
        padding: 5,
        fontSize: 12,
        width: 300,
        top: 5,
    },
});

export default LoginScreen;