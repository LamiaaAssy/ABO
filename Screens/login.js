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
import { saveUser } from '../Local-Storage';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


class Background extends Component {

    render() {
        return (
            <ImageBackground source={require('../assets/images/1.png')}
                style={styles.backgroundImage}>
                <View>
                    {this.props.children}
                </View>

            </ImageBackground>
        )
    }
}


export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {

            Email: __DEV__ ? "e7abmostafa@gmail.com" : null, Password: __DEV__ ? "123456" : null, errorMessage: null
        };

    }

    componentDidMount() {

    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    login = async () => {
        const { Email, Password, errorMessage } = this.state
        if (Email != null && Password != null) {
            auth()
                .signInWithEmailAndPassword(Email, Password)
                .then(() => {
                    console.log(' signed in!')
                    console.log("login  ", auth().currentUser.uid)

                    database().ref('users/' + auth().currentUser.uid + '/firebaseTokens').once("value", snapshot => {
                        console.log("firebaseTokens : ", snapshot.val())

                        if (!snapshot.val().includes(global.fcmToken)) {
                            let newTokens = snapshot.val()
                            newTokens.push(global.fcmToken)
                            database().ref('users/' + auth().currentUser.uid + '/firebaseTokens').set(newTokens)
                        }
                    })

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
        else {
            this.setState({ errorMessage: 'Please enter all the required fields' })
        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                    <Background>
                        <View style={{ alignItems: "center", backgroundColor: Colors.theme, height: calcHeight(200), width: "100%" }}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
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
                                <LinearGradient colors={[Colors.theme, Colors.G1, Colors.G2]} style={styles.gradient}>
                                    <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Login</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <View style={styles.textRow}>
                                <Text style={{ color: "#1F2D50", fontSize: calcWidth(16), fontFamily: 'Montserrat-Medium', marginTop: calcHeight(20) }}>
                                    You don’t have account?
            </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                                    <Text style={{ color: '#DD1107', fontFamily: 'Montserrat-Medium', fontSize: calcWidth(16), marginTop: calcHeight(20) }}>{" "} Register</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.social}>
                                <TouchableOpacity style={styles.socialTouchable}>
                                    <Icon3 name="google" color='red' size={calcWidth(35)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialTouchable}>
                                    <Icon name="facebook" color="blue" size={calcWidth(35)} />
                                </TouchableOpacity>

                            </View>
                        </View>

                    </Background>
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
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
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
        // paddingBottom: 10,
        // backgroundColor: Colors.Whitebackground
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
        // justifyContent: "center",
        //  
        // height: calcHeight(700)
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
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        width: "100%",
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
        marginVertical: calcHeight(20),
        height: calcHeight(90),
        width: "100%",
        //backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: calcWidth(10),
    },
    socialButtons: {
        backgroundColor: "red",
        width: "70%",
        height: "100%",
        marginLeft: calcWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    socialTouchable: {
        backgroundColor: "#ffffff",
        borderRadius: 32,
        elevation: 5,
        borderColor: "#000000",
        height: "65%",
        width: "45%",
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
        fontFamily: "Montserrat-Regular"
    }

});

