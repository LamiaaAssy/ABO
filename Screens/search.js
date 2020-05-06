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

export default class search extends Component {
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
        if (type == 'A+') {
            if (this.state.APstyle == styles.BloodButton) {
                this.setState({
                    APstyle: styles.redBloodButton,
                    APtext: styles.whiteBloodText,
                    AP: true
                })
            } else {
                this.setState({
                    APstyle: styles.BloodButton,
                    APtext: styles.BloodText,
                    AP: false
                })
            }
        } else if (type == 'A-') {
            if (this.state.AMstyle == styles.BloodButton) {
                this.setState({
                    AMstyle: styles.redBloodButton,
                    AMtext: styles.whiteBloodText,
                    AM: true
                })
            } else {
                this.setState({
                    AMstyle: styles.BloodButton,
                    AMtext: styles.BloodText,
                    AM: false
                })
            }
        } else if (type == 'B+') {
            if (this.state.BPstyle == styles.BloodButton) {
                this.setState({
                    BPstyle: styles.redBloodButton,
                    BPtext: styles.whiteBloodText,
                    BP: true
                })
            } else {
                this.setState({
                    BPstyle: styles.BloodButton,
                    BPtext: styles.BloodText,
                    BP: false
                })
            }
        } else if (type == 'B-') {
            if (this.state.BMstyle == styles.BloodButton) {
                this.setState({
                    BMstyle: styles.redBloodButton,
                    BMtext: styles.whiteBloodText,
                    BM: true
                })
            } else {
                this.setState({
                    BMstyle: styles.BloodButton,
                    BMtext: styles.BloodText,
                    BM: false
                })
            }
        } else if (type == 'O+') {
            if (this.state.OPstyle == styles.BloodButton) {
                this.setState({
                    OPstyle: styles.redBloodButton,
                    OPtext: styles.whiteBloodText,
                    OP: true
                })
            } else {
                this.setState({
                    OPstyle: styles.BloodButton,
                    OPtext: styles.BloodText,
                    OP: false
                })
            }
        } else if (type == 'O-') {
            if (this.state.OMstyle == styles.BloodButton) {
                this.setState({
                    OMstyle: styles.redBloodButton,
                    OMtext: styles.whiteBloodText,
                    OM: true
                })
            } else {
                this.setState({
                    OMstyle: styles.BloodButton,
                    OMtext: styles.BloodText,
                    OM: false
                })
            }
        } else if (type == 'AB+') {
            if (this.state.ABPstyle == styles.BloodButton) {
                this.setState({
                    ABPstyle: styles.redBloodButton,
                    ABPtext: styles.whiteBloodText,
                    ABP: true
                })
            } else {
                this.setState({
                    ABPstyle: styles.BloodButton,
                    ABPtext: styles.BloodText,
                    ABP: false
                })
            }
        } else if (type == 'AB-') {
            if (this.state.ABMstyle == styles.BloodButton) {
                this.setState({
                    ABMstyle: styles.redBloodButton,
                    ABMtext: styles.whiteBloodText,
                    ABM: true
                })
            } else {
                this.setState({
                    ABMstyle: styles.BloodButton,
                    ABMtext: styles.BloodText,
                    ABM: false
                })
            }
        }
    }
    render() {
        return (

            <ImageBackground source={require('../assets/images/redBackground.png')}
                style={styles.redBackground}>
                <View style={styles.header}>

                    {/* back button */}
                    <TouchableOpacity style={styles.backbutton}>
                        <Image source={require('../assets/images/right.png')} style={styles.backicon} />
                    </TouchableOpacity>

                    {/* label */}
                    <Text style={styles.title}>Search</Text>
                    {/* end headr */}
                </View>
                <View>
                    <View style={styles.safe}>
                        <View style={styles.personalinformations}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Search by address...'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                            />
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
                    <View style={{ alignItems: "center", marginTop: 30 }}>
                        <TouchableOpacity style={styles.buttonSignupContainer} >
                            <View style={styles.signbutton}>
                                <Text style={styles.buttontext}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({

    redBackground: {
        flex: 1,
        height: '100%',
        width: "100%",
    },

    personalinformations: {
        paddingVertical: calcHeight(40),
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
    textRowArrow: {
        flexDirection: "row",
        marginLeft: 20,
        marginBottom: 40,
        marginTop: 20,
        // justifyContent: "center",
    },
    buttonSignupContainer: {
        height: 55,
        width: "90%",
        borderRadius: 20,
        backgroundColor: '#FD554F',
        marginLeft: 10,
        justifyContent: 'center',
        marginTop: 10,
    },
    signbutton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: 20,
    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: 7
    },
    header:
    {
        flexDirection: 'row',
        backgroundColor: Colors.Graybackground,
        alignItems: 'center',
        width: calcWidth(375),
        height: calcHeight(35),
        marginTop: calcHeight(47),

    },
    backbutton:
    {
        backgroundColor: Colors.Graybackground,
        width: calcWidth(18),
        height: calcHeight(30),
        marginLeft: calcWidth(25),
        alignItems: 'center',

    },
    title:
    {
        fontFamily: 'Roboto-Medium',
        fontSize: calcWidth(18),
        color: Colors.theme,
        marginLeft: calcWidth(20),

    },
    backicon:
    {

        width: calcWidth(17.61),
        height: calcHeight(30),

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