import React, { Component } from 'react';
import { Header, LearnMoreLinks, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';

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
import auth from '@react-native-firebase/auth'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
            if (result.isCancelled) {
                console.log("==> Login cancelled");
            } else {
                console.log(
                    "==> Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
            }
        },
        function (error) {
            console.log("==> Login fail with error: " + error);
        }
    );
}
export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushData: [],
            loggedIn: false
        }


    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '635428529336-2orjb7il5m178n1lkuhero1k51a3u69e.apps.googleusercontent.com',
            // offlineAccess: true,
            // hostedDomain: '',
            // forceConsentPrompt: true,
        });
    }

    firebaseGoogleLogin = async () => {
        try {
            // add any configuration settings here:
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }
    // onGoogleButtonPress = async () => {
    //     // Get the users ID token
    //     const { idToken } = await GoogleSignin.signIn();

    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    // }
    onGoogleButtonPress = async () => {
        // Get the users ID token
        console.log("hadeeeeeeeeeeeer");

        try {
            // auth().onAuthStateChanged((user) => {
            //     if (user) {
            //         // const { uid, phoneNumber } = auth().currentUser._user
            //         // UserStore.user.setUID(uid)
            //         // UserStore.user.setPhoneNumber(phoneNumber)
            //         // let ref = firebase.database().ref(`/Users/${UserStore.user.uid}`)
            //         // ref.on('value', this.gotUserData)
            //         console.log("logged in")
            //     }
            //     else {
            //         console.log("nooooooot")

            //     }
            //     // this.setListenConnection()

            // })

            // console.log(auth())
            // if (auth().currentUser) {
            //     console.log('user logged')

            // }
            // else {
            //     console.log('user not logged')

            // }
            const userInfo = await GoogleSignin.signIn();
            // auth().onAuthStateChanged(function (userInfo) {
            //     if (userInfo) {
            //         console.log("logged in")
            //     } else {
            //         console.log("nooooooot")
            //     }
            // });
            console.log("loooooog" + userInfo)
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            console.log("googleeeee" + googleCredential)
            this.setState({ userInfo: userInfo, loggedIn: true });
            // this.props.navigation.navigate("HomePage");
            // auth().currentUser;


            return auth().signInWithCredential(googleCredential)
        }
        catch (error) {
            console.log(error.code)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("user canceled")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("IN_PROGRESS")
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("PLAY_SERVICES_NOT_AVAILABLE")
                // play services not available or outdated
            } else {
                // some other error happened
                console.log("elseeeeeeeeeeee")
            }
            // this.setState({ userInfo: userInfo, loggedIn: true });

            // Create a Google credential with the token
            // const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            // create a new firebase credential with the token
            // const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            // Sign-in the user with the credential
            // console.log("el serveerrrr" + auth().signInWithCredential(googleCredential));

        }
    }
    _signIn = async () => {

        // await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        this.setState({ userInfo: userInfo, loggedIn: true });
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.setState({ loggedIn: false });
            } else {
                // some other error
                this.setState({ loggedIn: false });
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
                            <Text style={{ color: '#DD1107', fontSize: 16, marginTop: 20 }}>{" "} Register</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.social}>
                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialTouchable} onPress={() => loginWithFacebook()}>
                                <View style={{ height: "50%", width: "20%", justifyContent: "center", textAlign: "center", backgroundColor: "green" }}>
                                    <Image source={require('../assets/images/facebook.png')} style={{ height: "100%", width: "100%", flex: 1 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialTouchable}
                                onPress={() => this.onGoogleButtonPress()}>
                                <View style={{ height: "50%", width: "25%", justifyContent: "center", textAlign: "center" }}>
                                    <Image source={require('../assets/images/google.png')} style={{ height: "100%", width: "100%", flex: 1 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <LoginButton
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
                            } /> */}

                    </View>
                    {/* <Button
                        title="Google Sign-In"
                        onPress={() => this.onGoogleButtonPress()}
                    /> */}
                    <View style={styles.buttonContainer}>
                        {this.state.loggedIn &&
                            <Text>you are currently logged in</Text>}
                    </View>
                    <View style={styles.buttonContainer}>
                        {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                        {this.state.loggedIn && <Button onPress={this.signOut}
                            title="Signout"
                            color="#FD554F"
                        >
                        </Button>}
                    </View>
                    {!this.state.loggedIn}
                    {this.state.loggedIn && <View>
                        <View style={styles.listHeader}>
                            <Text>User Info</Text>
                        </View>
                        <View style={styles.dp}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.photo }}
                            />
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Name</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.name}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Email</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.email}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>ID</Text>
                            <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Phone Number</Text>
                            <Input
                                onChangeText={(phoneNo) => this.setState({ phone: phoneNo })}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
                            {/* <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text> */}
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>Address</Text>
                            <Input
                                onChangeText={(address) => this.setState({ Address: address })}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Address'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
                            {/* <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text> */}
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>blood type</Text>
                            <Input
                                onChangeText={(bloodType) => this.setState({ blood_type: bloodType })}
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='blood type'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
                            {/* <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text> */}
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.title}>gender</Text>
                            <Input
                                onChangeText={(Gender) => this.setState({ gender: Gender })}

                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='gender'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
                            {/* <Text style={styles.message}>{this.state.userInfo && this.state.userInfo.user && this.state.userInfo.user.id}</Text> */}
                        </View>
                        <Button
                            title="Google Sign-In"
                            onPress={() => console.log(this.state.userInfo, this.state.Address)}
                        />
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