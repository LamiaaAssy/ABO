import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { saveUser } from '../Local-Storage'
export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {

            Email: '', Password: '', errorMessage: null
        };


    }

    componentDidMount() {

    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    login = async () => {
        const { Email, Password, errorMessage } = this.state
        auth()
            .signInWithEmailAndPassword(Email, Password)
            .then(() => {
                console.log(' signed in!')
                console.log("login  ", auth().currentUser.uid)
                database().ref('users/' + auth().currentUser.uid + '/informations').once("value", snapshot => {
                    const object = snapshot.val()
                    console.log("object : ", object)
                    console.log("mail : ", auth().currentUser.email)

                    saveUser(auth().currentUser.uid, auth().currentUser.email, object.name, object.gender, object.bloodType, object.address, object.phone)
                })
                this.props.navigation.navigate('after-login')
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {

                    this.setState({ errorMessage: 'That email address is invalid!' })
                }
                if (error.code === 'auth/wrong-password') {

                    this.setState({ errorMessage: 'That password is incorrect' })
                }

                if (error.code === 'auth/invalid-email') {
                    this.setState({ errorMessage: 'That email address is invalid!' })
                }
                if (error.code === 'auth/email-already-in-use') {
                    this.setState({ errorMessage: 'That email address is already in use!' })
                }


            })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.theme }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>

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
                            <Text style={styles.NewAccText}>Login</Text>
                        </View>

                        <View style={styles.personalinformations}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Email'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('Email', val)}

                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                secureTextEntry={true}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Password'
                                placeholderTextColor={Colors.theme}
                                placeholderText
                                rightIcon={{ type: 'font-awesome', name: 'lock', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('Password', val)}
                            />

                            {this.state.errorMessage &&
                                <Text style={styles.errorMessage}>
                                    {this.state.errorMessage}
                                </Text>}
                        </View>
                        <TouchableOpacity style={styles.textcontain} onPress={() => this.props.navigation.navigate('forgetPassword')}>
                            <Text style={styles.textStyle}>
                                Forgot password?
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.TouchableEdit} onPress={() => this.login()}>
                            <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.textRow}>
                            <Text style={{ color: "#1F2D50", fontSize: calcWidth(16), marginTop: calcHeight(20) }}>
                                You don’t have account?
            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                                <Text style={{ color: '#DD1107', fontSize: calcWidth(16), marginTop: calcHeight(20) }}>{" "} Register</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.social}>
                            <View style={styles.socialButtons}>
                                <TouchableOpacity style={styles.socialTouchable}>
                                    <View style={{ height: "50%", width: "20%", justifyContent: "center", textAlign: "center", backgroundColor: "green" }}>
                                        <Image source={require('../assets/images/facebook.png')} style={{ height: "100%", width: "100%", flex: 1 }} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialTouchable}>
                                    <View style={{ height: "50%", width: "25%", justifyContent: "center", textAlign: "center" }}>
                                        <Image source={require('../assets/images/google.png')} style={{ height: "100%", width: "100%", flex: 1 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        height: calcHeight(220),
        width: '100%',
        backgroundColor: '#FD554F',
        alignItems: "center",
        justifyContent: "center"
    },
    imageView: {
        backgroundColor: Colors.theme,
        height: calcHeight(112),
        width: calcWidth(112),
        borderRadius: 56,

    },
    name: {
        fontSize: calcWidth(16),
        color: '#7C7C7C',
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(7),
        // backgroundColor: "red"
    },

    ScrollView: {
        width: Dimensions.get("window").width,
        justifyContent: "center",
        height: calcHeight(700)
        // backgroundColor: "blue"
    },
    NewAccText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: calcWidth(35),
        color: Colors.theme,
        marginTop: calcHeight(113.48),
        // backgroundColor: "yellow"
    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: calcHeight(7)
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    TouchableEdit: {
        width: calcWidth(195),
        height: calcHeight(49),
        marginTop: calcHeight(25),
        borderRadius: 25,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    Text: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(7.5),
        marginLeft: calcWidth(25)
        //marginBottom:15
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: calcHeight(15),
        marginLeft: calcWidth(25)
    },
    textStyle: {
        fontSize: calcWidth(16),
        color: "#B1B1B1",
        fontFamily: 'Montserrat-Medium',
        textAlign: "right"

    },
    textcontain: {
        // backgroundColor: "blue",
        marginRight: calcHeight(20)
    },
    social: {
        marginTop: calcHeight(10),
        height: calcHeight(90),
        width: "100%",
        // backgroundColor: "green",
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: calcWidth(10),
    },
    socialButtons: {
        //backgroundColor: "red",
        width: "70%",
        height: "100%",
        marginLeft: calcWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialTouchable: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        elevation: 5,
        borderColor: "#000000",
        height: "75%",
        width: "50%",
        marginHorizontal: calcWidth(10),
        justifyContent: "center",
        alignItems: "center",
    },
    errorMessage: {
        color: 'red',
        width: "80%",
        marginVertical: calcHeight(10),
        fontSize: calcWidth(15),
        marginLeft: calcWidth(20),
        fontFamily: "'Montserrat-Regular"
    }

});