import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Form,
    Item,
    Platform,
    Button

} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Icon from 'react-native-vector-icons/Octicons';

export default class forgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/BloodLogo.png')} style={{ height: "50%", width: "50%", flex: 1 }} />
                </View>
                <View style={styles.container}>
                    <ImageBackground
                        style={styles.LightImage}
                        source={require('../assets/images/sound-wave.png')}
                    >
                        <ImageBackground
                            style={styles.Image}
                            source={require('../assets/images/sound-wave-above.png')}>

                        </ImageBackground>
                    </ImageBackground>
                </View>
                <Text style={styles.Text}>Forgot Password</Text>
                <View style={styles.personalinformations}>
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.inputContainer}
                        placeholder='Email'
                        placeholderTextColor={Colors.theme}
                        rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                        rightIconContainerStyle={{ marginRight: 10 }}

                    />
                </View>
                <TouchableOpacity style={styles.TouchableEdit}>
                    <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Send</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        height: calcHeight(222),
        width: '100%',
        backgroundColor: '#FD554F',
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "blue"
    },
    imageView: {
        backgroundColor: Colors.theme,
        height: 112,
        width: 112,
        borderRadius: 56,

    },
    name: {
        fontSize: 16,
        color: '#7C7C7C',
        fontFamily: 'Montserrat-Medium',
        marginTop: 7,
        // backgroundColor: "red"
    },

    Text: {
        fontSize: 35,
        color: Colors.theme,
        fontFamily: 'Montserrat-SemiBold',
        // marginTop: 7.5,
        marginLeft: 52
        //marginBottom:15
    },
    Image: {
        width: 431.69,
        height: 144.41
    },
    LightImage: {
        height: 159,
        width: 430
    },
    personalinformations: {
        paddingVertical: calcHeight(30),
        // backgroundColor: "black",
    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: 7
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    TouchableEdit: {
        width: calcWidth(225),
        height: calcHeight(60),
        marginTop: calcHeight(25),
        borderRadius: 25,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    },
});