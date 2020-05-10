import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image


} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Icon from 'react-native-vector-icons/Octicons';
import { set } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            selectedtype: []
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

    // test = async () => {
    //     auth()
    //         .createUserWithEmailAndPassword('sarah.lane@gmail.com', 'SuperSecretPassword!')
    //         .then(() => {
    //             console.log('User account created & signed in!');
    //         })
    //         .catch(error => {
    //             if (error.code === 'auth/email-already-in-use') {
    //                 console.log('That email address is already in use!');
    //             }

    //             if (error.code === 'auth/invalid-email') {
    //                 console.log('That email address is invalid!');
    //             }

    //             console.error(error);
    //         });
    // }


    render() {
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
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.NewAccText}>new account</Text>
                        </View>
                        <View style={styles.personalinformations}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='User Name'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'user', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}

                            />

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
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Adress'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
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
                        <Text style={styles.genderText}>Gender</Text>

                        <View style={styles.gender}>
                            <View style={styles.genderButtons}>
                                <TouchableOpacity style={styles.generTouchable}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.generTouchable}>
                                    <Text style={{ fontSize: 18, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Male</Text>
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
                        <TouchableOpacity style={styles.TouchableEdit} onPress={() => this.test()} >
                            <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Sign up</Text>
                        </TouchableOpacity>
                        <View style={styles.textRow}>
                            <Text style={{ color: "#1F2D50", fontSize: 16, marginTop: 20 }}>
                                Already have an account?
            </Text>
                            <TouchableOpacity >
                                <Text style={{ color: '#DD1107', fontSize: 16, marginTop: 20 }}>{" "} Login</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                </ImageBackground>
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
        // alignItems: "center",
        // justifyContent: "center",
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
        marginLeft: 25,
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
        backgroundColor: Colors.theme,
        borderRadius: 10,
        elevation: 5,
        height: 43,
        width: 121,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
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

});