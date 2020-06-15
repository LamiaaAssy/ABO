import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    TextInput,
    Animated,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image


} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TypingAnimation } from 'react-native-typing-animation';
import * as Animatable from 'react-native-animatable';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Icon from 'react-native-vector-icons/Octicons';
import { set } from 'react-native-reanimated';

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typing_email: false,
            typing_password: false,
            user_name: false,
            phone: false,
            address: false,
            animation_login: new Animated.Value(width - 40),
            enable: true,

            selectedIndex: null,
            BloodbagsNum: 1,
            APstyle: styles.BloodButton,
            AMstyle: styles.BloodButton,
            BPstyle: styles.BloodButton,
            BMstyle: styles.BloodButton,
            OPstyle: styles.BloodButton,
            OMstyle: styles.BloodButton,
            ABPstyle: styles.BloodButton,
            ABMstyle: styles.BloodButton,
            APtext: styles.BloodText,
            AMtext: styles.BloodText,
            BPtext: styles.BloodText,
            BMtext: styles.BloodText,
            OPtext: styles.BloodText,
            OMtext: styles.BloodText,
            ABPtext: styles.BloodText,
            ABMtext: styles.BloodText,
            AP: false,
            AM: false,
            BP: false,
            BM: false,
            OP: false,
            OM: false,
            ABP: false,
            ABM: false,
            selectedtype: [],
            female: false,
            male: false,
            femaleButton: styles.generTouchable,
            femaleText: styles.genderText,
            maleButton: styles.generTouchable,
            maleText: styles.genderText,

        };
        this.updateIndex = this.updateIndex.bind(this);
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex });
        console.log("selected index", selectedIndex);
        if (selectedIndex == '0') {
            this.setState({ BloodbagsNum: this.state.BloodbagsNum + 1 });
        } else if (this.state.BloodbagsNum > 1) {
            if (selectedIndex == '1') {
                this.setState({ BloodbagsNum: this.state.BloodbagsNum - 1 });
            }
        }
    }
    selectGender(type) {
        if (type == "female") {
            this.setState({
                femaleButton: styles.selectedgenerTouchable,
                femaleText: styles.selectedgenderText,
                maleButton: styles.generTouchable,
                maleText: styles.genderText,
            })
        }
        else if (type == "male") {
            this.setState({
                femaleButton: styles.generTouchable,
                femaleText: styles.genderText,
                maleButton: styles.selectedgenerTouchable,
                maleText: styles.selectedgenderText,
            })
        }
    }
    selectType(type) {
        if (type == "A+") {
            this.setState({
                APstyle: styles.redBloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.whiteBloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "A-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.redBloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.whiteBloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "B+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.redBloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.whiteBloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "B-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.redBloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.whiteBloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "O+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.redBloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.whiteBloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "O-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.redBloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.whiteBloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "AB+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.redBloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.whiteBloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "AB-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.redBloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.whiteBloodText,
            })

        }
    }


    _foucus(value) {
        if (value == "user_name") {
            this.setState({
                typing_email: false,
                typing_password: false,
                user_name: true,
                phone: false,
                address: false,
            })
        }
        else if (value == "email") {
            this.setState({
                typing_email: true,
                typing_password: false,
                user_name: false,
                phone: false,
                address: false,
            })
        }

        else if (value == "phone") {
            this.setState({
                typing_email: false,
                typing_password: false,
                user_name: false,
                phone: true,
                address: false,
            })
        }
        else if (value == "address") {
            this.setState({
                typing_email: false,
                typing_password: false,
                user_name: false,
                phone: false,
                address: true,
            })
        }
        else if (value == "password") {
            this.setState({
                typing_email: false,
                typing_password: true,
                user_name: false,
                phone: false,
                address: false,
            })
        }
    }

    _typing() {
        return (
            <TypingAnimation
                dotColor="#FD554F"
                style={{ marginRight: 25 }}
                //default
                dotMargin={3}
                dotAmplitude={3}
                dotSpeed={0.15}
                dotRadius={2.5}
                dotX={12}
                dotY={6}
            />
        )
    }

    _animation() {
        Animated.timing(
            this.state.animation_login,
            {
                toValue: 40,
                duration: 250
            }

        ).start();
        setTimeout(() => {
            this.setState({
                enable: false,
                typing_email: false,
                typing_password: false,
            })
        }, 150);
        this.props.navigation.navigate("HomePage")
        // .delay(() => this.props.navigator.replace({ component: 'login' }), 1000);
    }


    render() {
        const width = this.state.animation_login;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.theme }}>
                <View style={{ paddingHorizontal: 125, marginTop: 30, alignItems: "center" }}>
                    <Image
                        source={require('../assets/images/BloodLogo.png')}
                        style={{ width: 135, height: 146 }}
                    />
                </View>
                <ImageBackground
                    source={require('../assets/images/Group1867.png')}
                    style={{ width: 478, height: 997.48, flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                        <View style={{ alignItems: 'center',justifyContent:"center" }}>
                            <Text style={styles.NewAccText}>new account</Text>
                        </View>
                        <View style={styles.personalinformations}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='User Name'
                                placeholderTextColor={Colors.theme}
                                leftIcon={{ type: 'font-awesome', name: 'user', color: Colors.theme }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                rightIconContainerStyle={{ marginBottom: 30}}
                                onFocus={() => this._foucus("user_name")}
                                rightIcon={this.state.user_name ?
                                    this._typing()
                                    : null}

                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Email'
                                placeholderTextColor={Colors.theme}
                                leftIcon={{ type: 'font-awesome', name: 'envelope', color: Colors.theme }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                rightIconContainerStyle={{ marginBottom: 30 }}
                                onFocus={() => this._foucus("email")}
                                rightIcon={this.state.typing_email ?
                                    this._typing()
                                    : null}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.theme}
                                leftIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                rightIconContainerStyle={{ marginBottom: 30 }}
                                onFocus={() => this._foucus("phone")}
                                rightIcon={this.state.phone ?
                                    this._typing()
                                    : null}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Adress'
                                placeholderTextColor={Colors.theme}
                                leftIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                rightIconContainerStyle={{ marginBottom: 30 }}
                                rightIconContainerStyle={{ marginBottom: 30 }}
                                onFocus={() => this._foucus("address")}
                                rightIcon={this.state.address ?
                                    this._typing()
                                    : null}
                            />

                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Password'
                                placeholderTextColor={Colors.theme}
                                leftIcon={{ type: 'font-awesome', name: 'lock', color: Colors.theme }}
                                leftIconContainerStyle={{ marginRight: 5 }}
                                secureTextEntry={true}
                                // errorMessage='this field is required'
                                onFocus={() => this._foucus("password")}
                                rightIconContainerStyle={{ marginBottom: 30 }}
                                rightIcon={this.state.typing_password ?
                                    this._typing()
                                    : null}
                            />


                            {/* <Text style={[styles.title, {
                                marginTop: 50
                            }]}>E-mail</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="Your email.."
                                    style={styles.textInput}
                                    onFocus={() => this._foucus("email")}
                                />
                                {this.state.typing_email ?
                                    this._typing()
                                    : null}
                            </View> */}

                        </View>
                        <Text style={styles.genderText}>Gender</Text>

                        <View style={styles.gender}>
                            <View style={styles.genderButtons}>
                                <TouchableOpacity onPress={() => this.selectGender('female')}
                                    style={this.state.femaleButton}>
                                    <Text style={this.state.femaleText}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.selectGender('male')}
                                    style={this.state.maleButton}>
                                    <Text style={this.state.maleText}>Male</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.Text}>Blood group type</Text>
                        <View style={styles.row}>
                            <TouchableOpacity style={this.state.APstyle}
                                onPress={() => this.selectType('A+')}
                            >
                                <Text style={this.state.APtext}>A+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.AMstyle}
                                onPress={() => this.selectType('A-')}
                            >
                                <Text style={this.state.AMtext}>A-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.BPstyle}
                                onPress={() => this.selectType('B+')}
                            >
                                <Text style={this.state.BPtext}>B+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.BMstyle}
                                onPress={() => this.selectType('B-')}
                            >
                                <Text style={this.state.BMtext}>B-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.OPstyle}
                                onPress={() => this.selectType('O+')}
                            >
                                <Text style={this.state.OPtext}>O+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity style={this.state.OMstyle}
                                onPress={() => this.selectType('O-')}
                            >
                                <Text style={this.state.OMtext}>O-</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.ABPstyle}
                                onPress={() => this.selectType('AB+')}
                            >
                                <Text style={this.state.ABPtext}>AB+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.ABMstyle}
                                onPress={() => this.selectType('AB-')}
                            >
                                <Text style={this.state.ABMtext}>AB-</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.TouchableEdit}>
                            <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this._animation()}>
                            <View style={styles.button_container}>
                                <Animated.View style={[styles.animation, {
                                    width
                                }]}>
                                    {this.state.enable ?
                                        <Text style={styles.textLogin}>Login</Text>
                                        :
                                        <Animatable.View
                                            animation="bounceIn"
                                            delay={50}>
                                            <FontAwesome
                                                name="check"
                                                color="white"
                                                size={20}
                                            />
                                        </Animatable.View>
                                    }
                                </Animated.View >
                            </View>
                        </TouchableOpacity>
                        <View style={styles.textRow}>
                            <Text style={{ color: "#1F2D50", fontSize: 16, marginTop: 20 }}>
                                Already have an account?
            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("login")}>
                                <Text style={{ color: '#DD1107', fontSize: 16, marginTop: 20 }}>{" "} Login</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const width = Dimensions.get("screen").width;

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
        paddingBottom: 300,
        justifyContent: "center",
        // backgroundColor: "blue"
    },
    personalinformations: {
        alignItems: "center",
        marginRight:30,
        // marginLeft:30,
        justifyContent: "center",
        paddingVertical: calcHeight(30),
        // backgroundColor: "black",
    },
    NewAccText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 35,
        color: Colors.theme,
        marginTop: 113.48,
        // backgroundColor: "yellow"
    },
    inputContainer: {
        width: 320,
        height: 27.5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.theme,
        marginLeft: 10,
        // marginRight:100,
        marginTop: 30
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    gender: {
        marginTop: 10,
        height: calcHeight(80),
        width: "100%",
        // backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center"
        paddingHorizontal: calcWidth(20),
    },
    genderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: Colors.theme,
        marginLeft: 30,
        // marginLeft: calcWidth(30),
        //backgroundColor: "yellow"
    },

    genderButtons: {
        //backgroundColor: "red",
        width: "80%",
        height: "100%",
        marginLeft: calcWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    generTouchable: {
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        height: 43,
        width: 121,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedgenerTouchable: {
        backgroundColor: Colors.theme,
        borderRadius: 10,
        elevation: 5,
        height: 43,
        width: 121,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    selectedgenderText: {
        fontSize: 18,
        color: "white",
        fontFamily: 'Montserrat-Medium',
    },
    genderText: {
        fontSize: 18,
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    TouchableEdit: {
        width: calcWidth(195),
        height: calcHeight(49),
        marginTop: calcHeight(25),
        borderRadius: 30,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
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
    BloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.Whitebackground,
        borderWidth: 1,
        elevation: 1.5,
        width: 41,
        height: 41,
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 15,
    },
    redBloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.theme,
        borderWidth: 1,
        elevation: 1.5,
        width: 41,
        height: 41,
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 15,
    },
    BloodText: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.theme,
    },
    whiteBloodText: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.Whitebackground,
    },
    BloodbagsNum: {
        marginLeft: 37,
        marginRight: 28,
        color: Colors.theme,
        fontSize: 18
    },
    ButtonGroupline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 2.5
    },
    ButtonGroup: {
        height: 32,
        width: 82,
        backgroundColor: Colors.theme,
        borderRadius: 10
    },
    title: {
        color: 'black',
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        flex: 1,

        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    textInput: {
        flex: 1,
        marginTop: 5,
        paddingBottom: 5,
        color: '#f2f2f2'
    },
    button_container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    animation: {
        backgroundColor: '#93278f',
        paddingVertical: 10,
        marginTop: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLogin: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
});