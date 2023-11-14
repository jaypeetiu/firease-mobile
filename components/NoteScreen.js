import AsyncStorage from "@react-native-async-storage/async-storage";
import react, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default NoteScreen = ({ navigation }) => {
    const handleNext = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles.container}>
            {/* <Appbar.Header style={{ backgroundColor: '#F78900' }}>
                <Appbar.Content title={"Welcome"} color="#000"/>
            </Appbar.Header> */}
            {/* <Avatar.Image
                size={150}
                source={require('../assets/logo.png')}
                style={{ backgroundColor: '#000', alignSelf: 'center', marginTop: '10%' }}
            /> */}
            <View style={styles.content}>
                <Text
                    variant="titleLarge"
                    style={{ alignSelf: 'center', color: '#000', textAlign: 'center', fontWeight: 'bold' }}
                >
                    NOTE TO ALL USERS BEFORE CREATING AND USING THE APPLICATION
                </Text>
                <View style={{ borderWidth: 1, borderColor: '#ffffff', marginTop: '10%' }}>
                    <View style={{ borderWidth: 1, padding: 5, marginLeft: '2%', marginTop: '2%', paddingBottom: '2%', borderColor: '#ffffff' }}>
                        <Text
                            variant="titleSmall"
                            style={{ alignSelf: 'center', marginTop: '5%', padding: 20, borderColor: '#000', color: '#fff', backgroundColor: '#9B0103', marginHorizontal: '1%', height: 250 }}
                        >
                            This Programs objective is to help individuals in need by directing the user to the first step. Communication and action accelerate. It should be noted that this application is not for entertainment purposes.
                        </Text>
                    </View>
                </View>
                <Button
                    mode="contained"
                    style={{ width: '50%', backgroundColor: '#F78900', marginTop: 40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                    textColor="#fff"
                    onPress={() => handleNext()}
                >
                    REGISTER
                </Button>
                <Image source={require('../assets/wave.png')} style={styles.footerImage} />
                <Image source={require('../assets/wave2.png')} style={styles.footerImage} />
            </View>
            {/* <View
                style={styles.footer}
            >
                <Image source={require('../assets/wave.png')} style={styles.footerImage} />
                <Image source={require('../assets/wave2.png')} style={styles.footerImage} />
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F78900'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10, // Adjust the padding to control the space between the content and footer
        width: '100%',
        //   backgroundColor: 'lightgray', // Set a background color for the footer if needed
    },
    footerImage: {
        width: '100%', // Set the width of the image
        // height: '100%', // Set the height of the image
        resizeMode: 'cover', // Adjust the resizeMode as needed (cover, contain, stretch, etc.)
        position: 'absolute',
        bottom: 0
    },
});