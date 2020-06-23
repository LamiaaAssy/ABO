import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
export default class forgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.theme }}>
                <View style={{ paddingHorizontal: calcWidth(125), marginTop: calcHeight(30), alignItems: "center" }}>
                    <Image
                        source={require('../assets/images/BloodLogo.png')}
                        style={{ width: calcWidth(130), height: calcHeight(136) }}
                    />
                </View>
                <ImageBackground
                    source={require('../assets/images/Group1867.png')}
                    style={{ width: calcWidth(375), height: calcHeight(900), flex: 1 }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.NewAccText}>Forgot Password</Text>
                    </View>
                    <View style={styles.personalinformations}>
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Email'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: calcWidth(10) }}

                        />
                    </View>
                    <TouchableOpacity style={styles.TouchableEdit}>
                        <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Send</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    NewAccText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: calcWidth(35),
        color: Colors.theme,
        marginTop: calcHeight(113.48),
        // backgroundColor: "yellow"
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