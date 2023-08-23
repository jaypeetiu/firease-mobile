import react from "react";
import { Image, StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { Appbar } from "react-native-paper";

export default GuidelinesScreen = ({ navigation }) => {
    const handleNext = () => {
        navigation.navigate('Login');
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
                    GUIDELINES ON HOW TO USE THE APPLICATION
                </Text>
                <Text
                    variant="titleMedium"
                    style={{ alignSelf: 'center', marginTop: '10%', borderWidth: 1, borderRadius: 20, padding: 10, borderColor: '#000', color: '#fff', backgroundColor: '#9B0103' }}
                >
                    What is Inferno application and how to use?
                </Text>
                <Text
                    variant="titleMedium"
                    style={{ alignSelf: 'center', marginTop: '10%', margin: '5%', color: '#000', textAlign: 'justify', fontWeight: '700' }}
                >
                    The Inferno application is a fire emergency hotline. The user(s) can communicate with the fire stations by tapping the logo button without the hassle of calling the admin and specifying their emergency needs, you just need to send picture/ video for proof and evidence. In addition, the application has access to your GPS location.
                </Text>
                <Button
                    mode="contained"
                    style={{ width: '50%', backgroundColor: '#F78900', marginTop: 40, alignSelf: 'center', borderWidth: 2, borderColor: '#fff' }}
                    textColor="#fff"
                    onPress={() => handleNext()}
                >
                    NEXT
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