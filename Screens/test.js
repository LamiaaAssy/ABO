import React, { Component, Fragment } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button, Image, } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import { Input } from 'react-native-elements';

// import { LoginManager, AccessToken } from 'react-native-fbsdk';
// import { log } from "react-native-reanimated";
// import { GoogleSignin } from '@react-native-community/google-signin';

export default class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pushData: [],
            loggedIn: false,
            Address: "",
            phone: "",
            gender: "",
            blood_type: "",
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
            const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            // login with credential
            const firebaseUserCredential = await auth().signInWithCredential(credential);
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
    // onFacebookButtonPress = async () => {
    //     // Attempt login with permissions
    //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    //     if (result.isCancelled) {
    //         throw 'User cancelled the login process';
    //     }

    //     // Once signed in, get the users AccesToken
    //     const data = await AccessToken.getCurrentAccessToken();

    //     if (!data) {
    //         throw 'Something went wrong obtaining access token';
    //     }

    //     // Create a Firebase credential with the AccessToken
    //     const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(facebookCredential);
    // }
    // onGoogleButtonPress = async () => {
    //     // Get the users ID token
    //     console.log("hadeeeeeeeeeeeer");
    //     try {
    //         const userInfo = await GoogleSignin.signIn();

    //         console.log("loooooog" + userInfo)
    //         const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
    //         console.log("googleeeee" + googleCredential)
    //         return auth().signInWithCredential(googleCredential)
    //     }
    //     catch (error) {
    //         console.log(error.code)
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //             console.log("user canceled")
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             console.log("IN_PROGRESS")
    //             // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             console.log("PLAY_SERVICES_NOT_AVAILABLE")
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //             console.log("elseeeeeeeeeeee")
    //         }
    //         // this.setState({ userInfo: userInfo, loggedIn: true });

    //         // Create a Google credential with the token
    //         // const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
    //         // create a new firebase credential with the token
    //         // const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
    //         // login with credential
    //         // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    //         // Sign-in the user with the credential
    //         // console.log("el serveerrrr" + auth().signInWithCredential(googleCredential));

    //     }
    // }
    onGoogleButtonPress = async () => {
        // Get the users ID token
        console.log("hadeeeeeeeeeeeer");
        try {
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });

            console.log("loooooog" + userInfo)
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            console.log("googleeeee" + googleCredential)
            // return auth().signInWithCredential(googleCredential)
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
        // const userInfo = await GoogleSignin.signIn();
        // this.setState({ userInfo: userInfo, loggedIn: true });
        // return auth().signInWithCredential(googleCredential)

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("user info", userInfo)
            this.setState({ userInfo: userInfo, loggedIn: true });
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
            console.log("google", googleCredential)
            const hadeer = await auth().signInWithCredential(googleCredential);
            console.log("hadeer", hadeer)

            // return hadeer;
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("SIGN_IN_CANCELLED ")

                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log("IN_PROGRESS")

                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("PLAY_SERVICES_NOT_AVAILABLE")

                // play services not available or outdated
            } else {
                console.log("elseeeeaaa")

                // some other error happened
            }
        }
    };
    // _signIn = async () => {

    //     // await GoogleSignin.hasPlayServices();
    //     // const userInfo = await GoogleSignin.signIn();
    //     // this.setState({ userInfo: userInfo, loggedIn: true });

    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
    //         this.setState({ userInfo: userInfo, loggedIn: true });
    //         return auth().signInWithCredential(googleCredential)
    //         console.log("ahmed elprince");
    //         console.log("loooooog" + userInfo)
    //         console.log("loooooog" + googleCredential)



    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //         } else {
    //             // some other error happened
    //             console.log("ahmed elseeeeeeeeee");

    //         }
    //     }
    // };

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
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}>
                        <Header />
                        {global.HermesInternal == null ? null : (
                            <View style={styles.engine}>
                                <Text style={styles.footer}>Engine: Hermes</Text>
                            </View>
                        )}
                        <View style={styles.body}>
                            <View style={styles.sectionContainer}>
                                <GoogleSigninButton
                                    style={{ width: 192, height: 48 }}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Dark}
                                    onPress={() => this._signIn()}
                                    disabled={this.state.isSigninInProgress} />
                                <Button
                                    title="Google Sign-In"
                                    onPress={() => this.onGoogleButtonPress()}
                                />
                                {/* <Button
                                    title="Facebook Sign-In"
                                    onPress={() => this.onFacebookButtonPress()}
                                /> */}
                            </View>
                            <View style={styles.buttonContainer}>
                                {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                                {this.state.loggedIn && <Button onPress={this.signOut}
                                    title="Signout"
                                    color="#841584">
                                </Button>}
                            </View>

                            {!this.state.loggedIn && <LearnMoreLinks />}
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
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
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
        backgroundColor: Colors.white,
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
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    inputContainer: {
        width: 360,
        height: 27.5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.theme,
        marginLeft: 20,
        marginTop: 30
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14
    },
});