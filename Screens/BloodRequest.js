import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, ButtonGroup } from 'react-native-elements';
import Colors from '../assets/Colors'


class BloodRequestForm extends Component {
    constructor(props) {
        super(props);
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
            <>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon
                            name='left'
                            size={40}
                            color={Colors.theme}
                        />
                        <Text style={styles.title}>Request blood</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.registerform}>
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.InputText}
                                placeholder='Patient name'
                                placeholderTextColor={Colors.theme}
                                returnKeyType="next"
                                rightIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color={Colors.theme}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.InputText}
                                placeholder='Requested by'
                                placeholderTextColor={Colors.theme}
                                returnKeyType="next"
                                rightIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color={Colors.theme}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.InputText}
                                placeholder='Mobile number'
                                placeholderTextColor={Colors.theme}
                                returnKeyType="next"
                                rightIcon={
                                    <Icon
                                        name='phone'
                                        size={24}
                                        color={Colors.theme}
                                    />
                                }
                            />
                            <Input
                                containerStyle={styles.input}
                                inputStyle={styles.InputText}
                                placeholder='Adress'
                                placeholderTextColor={Colors.theme}
                                returnKeyType="none"
                                rightIcon={
                                    <Icon
                                        name='enviromento'
                                        size={24}
                                        color={Colors.theme}
                                    />
                                }
                            />
                            <View>
                                <View style={styles.ButtonGroupline}>
                                    <Text style={styles.Text}>Number of blood bags</Text>
                                    <Text style={styles.BloodbagsNum}>{this.state.BloodbagsNum}</Text>
                                    <ButtonGroup
                                        buttons={['+', '-']}
                                        selectedIndex={this.state.selectedIndex}
                                        containerStyle={styles.ButtonGroup}
                                        onPress={this.updateIndex}
                                        selectedButtonStyle={{ backgroundColor: Colors.theme }}
                                        textStyle={{ color: Colors.Whitebackground }}

                                    />

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
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={styles.RequestButton}>
                                    <Text style={{
                                        fontSize: 18, color: Colors.Whitebackground,
                                        fontFamily: 'Montserrat-Medium'
                                    }}>Add Request</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: Colors.Whitebackground
    },
    registerform: {
        marginTop: 20,
        height: Dimensions.get("screen").height * 0.7
    },
    header: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        height: Dimensions.get("screen").height * 0.1
    },
    title: {
        fontSize: 18,
        color: Colors.theme,
        fontFamily: 'Roboto-Medium',
        fontWeight: 'bold'
    },
    input: {
        width: 325.2,
        height: 26.5,
        marginBottom: 30.5,

    },
    InputText: {
        fontSize: 14,
        color: "black",
        fontFamily: 'Montserrat-Medium'
    },
    Text: {
        fontSize: 14,
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        marginTop: 7.5,

        //marginBottom:15
    },
    ButtonGroupline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 2.5
    },
    BloodbagsNum: {
        marginLeft: 37,
        marginRight: 28,
        color: Colors.theme,
        fontSize: 18
    },
    ButtonGroup: {
        height: 32,
        width: 82,
        backgroundColor: Colors.theme,
        borderRadius: 10
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
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: 15
    },
    RequestButton: {
        backgroundColor: Colors.theme,
        borderRadius: 13,
        width: 325,
        height: 49,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 45,
    }
});

export default BloodRequestForm;
