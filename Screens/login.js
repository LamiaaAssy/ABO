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
import { set } from 'react-native-reanimated';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';


LoginManager.logInWithPermissions(["public_profile"]).then(
    function (result) {
        if (result.isCancelled) {
            console.log("Login cancelled");
        } else {
            console.log(
                "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
        }
    },
    function (error) {
        console.log("Login fail with error: " + error);
    }
);

export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushData: [],
            loggedIn: false
        }


    }

    componentDidMount() {

    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>

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

                    <Text style={styles.NewAccText}>Login</Text>

                    <View style={styles.personalinformations}>
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Email'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}

                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Password'
                            placeholderTextColor={Colors.theme}
                            placeholderText
                            rightIcon={{ type: 'font-awesome', name: 'lock', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.textcontain}>
                        <Text style={styles.textStyle}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.TouchableEdit}>
                        <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Sign up</Text>
                    </TouchableOpacity>
                    <View style={styles.textRow}>
                        <Text style={{ color: "#1F2D50", fontSize: 16, marginTop: 20 }}>
                            You don’t have account?
            </Text>
                        <TouchableOpacity >
                            <Text style={{ color: '#DD1107', fontSize: 16, marginTop: 20 }}>{" "} Register</Text>
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
                        <LoginButton
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {

                                        console.log(result);
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                this.setState({
                                                    loggedIn: true,
                                                    userID: data.userID
                                                })
                                                console.log(data, data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() =>
                                this.setState({
                                    loggedIn: false,
                                    userID: ''
                                })
                            } />
                    </View>
                    <View style={styles.buttonContainer}>
                        {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                    </View>
                    {this.state.loggedIn && <View>
                        <View style={styles.listHeader}>
                            <Text>User Info</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>ID</Text>
                            <Text style={styles.message}>{this.state.userID}</Text>
                        </View>
                    </View>}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },
    listHeader: {
        backgroundColor: '#eee',
        color: "#222",
        height: 44,
        padding: 12
    },
    detailContainer: {
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10
    },
    message: {
        fontSize: 14,
        paddingBottom: 15,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1
    },
    dp: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: 'white',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: 'black',
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },

    imageContainer: {
        height: calcHeight(220),
        width: '100%',
        backgroundColor: '#FD554F',
        alignItems: "center",
        justifyContent: "center"
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
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
    },
    Image: {
        width: 431.69,
        height: 144.41
    },
    LightImage: {
        height: 159,
        width: 430
    },
    ScrollView: {
        width: Dimensions.get("window").width,
        paddingBottom: 50,
        justifyContent: "center",
        // backgroundColor: "blue"
    },
    personalinformations: {
        // paddingVertical: calcHeight(20),
        // backgroundColor: "black",
    },
    NewAccText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 35,
        color: Colors.theme,
        textAlign: "center",

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
    textRow: {
        flexDirection: "row",
        justifyContent: "center",
    },
    Text: {
        fontSize: 14,
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        marginTop: 7.5,
        marginLeft: 25
        //marginBottom:15
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 15,
        marginLeft: 25
    },
    textStyle: {
        fontSize: 16,
        color: "#B1B1B1",
        fontFamily: 'Montserrat-Medium',
        textAlign: "right"

    },
    textcontain: {
        // backgroundColor: "blue",
        marginRight: 20
    },
    social: {
        marginTop: 10,
        height: calcHeight(90),
        width: "100%",
        // backgroundColor: "green",
        flexDirection: "row",
        // alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: calcWidth(10),
    },
    socialText: {

        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        color: Colors.Whitebackground,
        marginLeft: 25
        // marginLeft: calcWidth(30),
        //backgroundColor: "yellow"
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
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },

});