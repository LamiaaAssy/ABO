import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Input, ButtonGroup } from 'react-native-elements';
import Colors from '../assets/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Value } from 'react-native-reanimated';


class BloodRequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
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
            Patient_name: "",
            requested_by: '',
            mobile_number: "",
            adress: "",
            BloodbagsNum: 1,
            selectedType: []
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

    /* selectedBloodType() {
         let type = []
         if (this.state.AP == true) {
             type.push('A+')
         }
         if (this.state.AM == true) {
             type.push('A-')
         }
         if (this.state.BP == true) {
             type.push('B+')
         }
         if (this.state.BM == true) {
             type.push('B-')
         }
         if (this.state.OP == true) {
             type.push('O+')
         }
         if (this.state.OM == true) {
             type.push('O-')
         }
         if (this.state.ABP == true) {
             type.push('AB+')
         }
         if (this.state.ABM == true) {
             type.push('AB-')
         }
     }*/

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    addRequest = async () => {
        //this.selectedBloodType();
        let type = []
        if (this.state.AP == true) {
            type.push('A+')
        }
        if (this.state.AM == true) {
            type.push('A-')
        }
        if (this.state.BP == true) {
            type.push('B+')
        }
        if (this.state.BM == true) {
            type.push('B-')
        }
        if (this.state.OP == true) {
            type.push('O+')
        }
        if (this.state.OM == true) {
            type.push('O-')
        }
        if (this.state.ABP == true) {
            type.push('AB+')
        }
        if (this.state.ABM == true) {
            type.push('AB-')
        }
        console.log('adding requst')
        const { Patient_name, mobile_number, adress, BloodbagsNum } = this.state
        database().ref('BloodRequests/AllRequests/').push({
            user_id: auth().currentUser.uid,
            Patient_name: Patient_name,
            mobile_number: mobile_number,
            adress: adress,
            BloodbagsNum: BloodbagsNum,
            BloodTypes: type
        })
        alert('The request was added successfully');
    }
    getUserName() {
        database().ref('users/' + auth().currentUser.uid + '/informations' + '/name').on('value', snapshot => {
            let name = snapshot.val();
            this.setState({ requested_by: name });
        });

    }

    componentDidMount() {
        this.getUserName();
    }


    render() {
        return (
            <>
                <View style={styles.container}>
                    <Header title={"Request blood"} navigation={this.props.navigation} />

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
                                onChangeText={val => this.onChangeText('Patient_name', val)}
                            />
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 309, borderBottomWidth: 1, marginLeft: 10, marginBottom: 20, marginTop: 10
                            }}>
                                <Text style={{ fontSize: 14, color: Colors.theme, fontFamily: 'Montserrat-Medium', marginBottom: 7.5 }}>{this.state.requested_by}</Text>
                                <Icon
                                    name='user'
                                    size={24}
                                    color={Colors.theme}
                                    style={{ marginBottom: 7.5 }}
                                />
                            </View>
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
                                onChangeText={val => this.onChangeText('mobile_number', val)}
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
                                onChangeText={val => this.onChangeText('adress', val)}
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
                            <ScrollView>
                                <View style={{ alignItems: "center" }}>
                                    <TouchableOpacity style={styles.RequestButton}
                                        onPress={() => this.addRequest()}>
                                        <Text style={{
                                            fontSize: 18, color: Colors.Whitebackground,
                                            fontFamily: 'Montserrat-Medium'
                                        }}>Add Request</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.RequestButton}
                                    onPress={() => this.selectedBloodType()}>
                                    <Text style={{
                                        fontSize: 18, color: Colors.Whitebackground,
                                        fontFamily: 'Montserrat-Medium'
                                    }}>types</Text>
                                </TouchableOpacity>
                            </ScrollView>
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
