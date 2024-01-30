import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, PushNotificationIOS, Alert } from 'react-native';
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
// import PushController from './PushController';
import PushNotification, { Importance } from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { setLocalStorageItem } from './utils/setLocalStorageItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  // useEffect(() => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: "default", // (required)
  //       channelName: "firease", // (required)
  //       channelDescription: "Fire Emergency Response", // (optional) default: undefined.
  //       playSound: true, // (optional) default: true
  //       // soundName: "alarm.mp3", // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  //   if (requestUserPermission()) {
  //     PushNotification.configure({
  //       // (optional) Called when Token is generated (iOS and Android)
  //       onRegister: function (token) {
  //         console.log("TOKEN:", token);
  //       },
  //       // (required) Called when a remote or local notification is opened or received
  //       onNotification: function (notification) {
  //         console.log("NOTIFICATION:", notification);
  //         // process the notification here
  //         PushNotification.localNotification({
  //           channelId: 'default',
  //           vibrate: true,
  //           vibration: 300,
  //           playSound: true,
  //           // soundName: "alarm.mp3",
  //           importance: 'high',
  //           invokeApp: true,
  //           allowWhileIdle: true,
  //           priority: 'high',
  //           visibility: 'public',
  //           /* Android Only Properties */
  //           title: 'test', // (optional)
  //           message: 'test', // (required)
  //           invokeApp: true,
  //           // actions: ["Yes", "No"],
  //           color: "red",
  //           bigText: 'test', // (optional) default: "message" prop
  //           // subText: remoteMessage.notification.body, // (optional) default: none
  //         });
  //         // required on iOS only
  //         notification.finish(PushNotificationIOS.FetchResult.NoData);
  //       },
  //       onAction: function (notification) {
  //         console.log("ACTION:", notification.action);
  //         console.log("NOTIFICATION:", notification);

  //         // process the action
  //       },
  //       onRegistrationError: function (err) {
  //         console.log(true);
  //         console.error(err.message, err);
  //       },
  //       // Android only
  //       senderID: "296543121796",
  //       // iOS only
  //       permissions: {
  //         alert: true,
  //         badge: true,
  //         sound: true
  //       },
  //       popInitialNotification: true,
  //       requestPermissions: true
  //     });
  //   }


  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //     PushNotification.localNotification({
  //       channelId: 'default',
  //       vibrate: true,
  //       vibration: 300,
  //       playSound: true,
  //       // soundName: "alarm.mp3",
  //       importance: 'high',
  //       invokeApp: true,
  //       allowWhileIdle: true,
  //       priority: 'high',
  //       visibility: 'public',
  //       /* Android Only Properties */
  //       title: remoteMessage.notification.title, // (optional)
  //       message: remoteMessage.notification.body, // (required)
  //       invokeApp: true,
  //       // actions: ["Yes", "No"],
  //       color: "red",
  //       bigText: remoteMessage.notification.body, // (optional) default: "message" prop
  //       // subText: remoteMessage.notification.body, // (optional) default: none
  //     });
  //   });
  // }, []);

  useEffect(() => {
    if (requestUserPermission()) {
      //return fcm token for device
      messaging().getToken().then((token) => {
        console.log(JSON.stringify(token));
        AsyncStorage.setItem("deviceToken", token);
      })
    } else {
      console.log("failed to get token")
    }

    PushNotification.createChannel(
      {
        channelId: "default", // (required)
        channelName: "firease", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        // soundName: "alarm.mp3", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // console.log(remoteMessage.data.url);
      // Linking.openURL(remoteMessage.data.url);
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      PushNotification.localNotification({
        channelId: 'default',
        vibrate: true,
        vibration: 300,
        playSound: true,
        // soundName: "alarm.mp3",
        importance: 'high',
        invokeApp: true,
        allowWhileIdle: true,
        priority: 'high',
        visibility: 'public',
        /* Android Only Properties */
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
        invokeApp: true,
        // actions: ["Yes", "No"],
        color: "red",
        bigText: remoteMessage.notification.body, // (optional) default: "message" prop
        // subText: remoteMessage.notification.body, // (optional) default: none
      });
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      PushNotification.localNotification({
        channelId: 'default',
        vibrate: true,
        vibration: 300,
        playSound: true,
        // soundName: "alarm.mp3",
        importance: 'high',
        invokeApp: true,
        allowWhileIdle: true,
        priority: 'high',
        visibility: 'public',
        /* Android Only Properties */
        title: remoteMessage.notification.title, // (optional)
        message: remoteMessage.notification.body, // (required)
        invokeApp: true,
        // actions: ["Yes", "No"],
        color: "red",
        bigText: remoteMessage.notification.body, // (optional) default: "message" prop
        // subText: remoteMessage.notification.body, // (optional) default: none
      });
      Alert.alert('Firease', remoteMessage.notification.title + '\n' + remoteMessage.notification.body);
    });

    return unsubscribe;
  }, []);

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

  useEffect(() => {
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
        <Stack.Screen name="Blog" component={BlogScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FireSafety" component={FireSafetyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FirstAid" component={FirstAidScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BFP" component={BFPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Citizen" component={CitizenScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Legal" component={LegalScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
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
