import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import MainAppScreen from './components/MainAppScreen';
import GetStartedScreen from './components/GetStartedScreen';
import GuidelinesScreen from './components/GuidelinesScreen';
import NoteScreen from './components/NoteScreen';
import AttachFileScreen from './components/AttachFileScreen';
import BlogScreen from './components/BlogScreen';
import FireSafetyScreen from './components/FireSafetyScreen';
import FirstAidScreen from './components/FirstAidScreen';
import BFPScreen from './components/BFPScreen';
import CitizenScreen from './components/CitizenScreen';
import SettingScreen from './components/SettingScreen';
import ProfileScreen from './components/ProfileScreen';
import UserSettingsScreen from './components/UserSettingsScreen';
import AboutScreen from './components/AboutScreen';
import LegalScreen from './components/LegalScreen';
import HelpScreen from './components/HelpScreen';
import HistoryScreen from './components/HistoryScreen';

const Stack = createStackNavigator();

export default function App() {

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(()=>{
    requestLocationPermission();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Guidelines" component={GuidelinesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AttachFile" component={AttachFileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainApp" component={MainAppScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Blog" component={BlogScreen} options={{headerShown: false}} />
        <Stack.Screen name="UserProfile" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="FireSafety" component={FireSafetyScreen} options={{headerShown: false}} />
        <Stack.Screen name="FirstAid" component={FirstAidScreen} options={{headerShown: false}} />
        <Stack.Screen name="BFP" component={BFPScreen} options={{headerShown: false}} />
        <Stack.Screen name="Citizen" component={CitizenScreen} options={{headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingScreen} options={{headerShown: false}} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{headerShown: false}} />
        <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}} />
        <Stack.Screen name="Legal" component={LegalScreen} options={{headerShown: false}} />
        <Stack.Screen name="Help" component={HelpScreen} options={{headerShown: false}} />
        <Stack.Screen name="History" component={HistoryScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
