import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from '@react-navigation/native';

export default SafetyPreview = ({ navigation }) => {
    const route = useRoute();
    const receivedValue = route.params?.data || 'Default Value';

    return (
        <View style={{ backgroundColor: '#000', height: '100%' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#9B0103', padding: 15, paddingTop: 30 }}>FIRE SAFETY TIPS</Text>
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{ uri: receivedValue.image }} style={{ width: '40%', height: 150, margin: 10 }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'center', width: '60%' }}>{receivedValue.title}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9B0103', padding: 10, textAlign: 'center', width: '60%' }}>{receivedValue.shortdescription}</Text>
                </View>
            </View>
            <Text style={{color: '#9B0103', padding: 10, paddingVertical: 30, alignSelf: 'center', fontSize: 18, textAlign: 'justify'}}>{receivedValue.description}</Text>
        </View>
    );
}