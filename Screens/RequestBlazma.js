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
import { calcWidth, calcHeight } from '../Dimension';
import Header from '../components/Header';
import ImageBackground from '../components/Background';

export default class PlasmaRequest extends Component {
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
            address: "",
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
        if (type == 'A') {
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
        } else if (type == 'B') {
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
        } else if (type == 'O') {
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
        } else if (type == 'AB') {
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
        }

    }

    selectedBloodType() {
        let type = []
        if (this.state.AP == true) {
            type.push('A')
        }
        if (this.state.BP == true) {
            type.push('B')
        }
        if (this.state.OP == true) {
            type.push('O')
        }
        if (this.state.ABP == true) {
            type.push('AB')
        }
        for (let index = 0; index < type.length; index++) {
            this.state.selectedType.push(type[index])
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    addRequest = async () => {
        this.selectedBloodType();
        console.log('adding requst')
        // let dayy = new Date().getDate(),
        //     monthh = new Date().getMonth() + 1,
        //     yearr = new Date().getFullYear()
        // for (let index = 0; index < 7; index++) {
        //     if (dayy < 30) {
        //         dayy++
        //     } else if (dayy == 30) {
        //         dayy = 1
        //         if (monthh == 12) {
        //             monthh = 1
        //             yearr++
        //         } else if (monthh < 12) {
        //             monthh++
        //         }
        //     }
        // }
        const { Patient_name, mobile_number, address, BloodbagsNum, selectedType } = this.state
        let blood = []
        for (let x = 0; x < selectedType.length; x++) {
            blood.push(selectedType[x])
        }

        // database().ref('PlasmaRequests/AllRequests/').push({
        //     user_id: auth().currentUser.uid,
        //     Patient_name: Patient_name,
        //     mobile_number: mobile_number,
        //     address: address,
        //     BloodbagsNum: BloodbagsNum,
        //     BloodTypes: selectedType,
        //     removeFlage: false,
        //     date: {
        //         day: dayy,
        //         month: monthh,
        //         year: yearr
        //     },
        //     remaining: BloodbagsNum
        // }).then(

        this.props.navigation.navigate("PlasmaDonors", { blood: blood, reqlat: address.lat, reqlon: address.lon })
        // )

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
                    <Header title={"Search for Plasma Donors"} navigation={this.props.navigation} />

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView} >
                        <ImageBackground>
                            <View style={styles.registerform}>


                                <Input
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    inputStyle={styles.InputText}
                                    placeholder='Hospital address'
                                    placeholderTextColor={Colors.theme}
                                    value={this.state.address ? this.state.address.text : ""}
                                    rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                                    rightIconContainerStyle={{ marginRight: 10 }}
                                    // onChangeText={val => this.onChangeText('adress', val)}
                                    onFocus={() => {
                                        this.props.navigation.navigate("Maps", {
                                            callBack: (region) => {
                                                this.setState({ address: region }, () => { console.log('address:', this.state.address) })
                                            }
                                        })
                                    }}
                                />
                                <View style={{ alignItems: 'flex-start', paddingLeft: calcWidth(10) }}>

                                    <View style={{ /*width: calcWidth(345),*/ justifyContent: 'flex-start', /*backgroundColor: 'blue'*/ }}>
                                        <Text style={styles.Text}>Blood group type</Text>
                                        <View style={styles.row}>
                                            <TouchableOpacity style={this.state.APstyle}
                                                onPress={() => this.selectType('A')}
                                            >
                                                <Text style={this.state.APtext}>A</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={this.state.BPstyle}
                                                onPress={() => this.selectType('B')}
                                            >
                                                <Text style={this.state.BPtext}>B</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={this.state.OPstyle}
                                                onPress={() => this.selectType('O')}
                                            >
                                                <Text style={this.state.OPtext}>O</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={this.state.ABPstyle}
                                                onPress={() => this.selectType('AB')}
                                            >
                                                <Text style={this.state.ABPtext}>AB</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity style={styles.RequestButton}
                                            onPress={() => this.addRequest()}>
                                            <Text style={{
                                                fontSize: calcWidth(18), color: Colors.Whitebackground,
                                                fontFamily: 'Montserrat-Medium'
                                            }}>Search for Donors</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </ScrollView>
                </View>
            </>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        // padding: 15,
        flex: 1,
        backgroundColor: Colors.Whitebackground
    },
    ScrollView: {
        marginTop: 20,
        paddingBottom: 50,
        backgroundColor: Colors.Whitebackground,
        alignItems: "center"
    },
    registerform: {
        marginTop: calcHeight(20),
        height: Dimensions.get("screen").height * 0.8
    },
    header: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        height: Dimensions.get("screen").height * 0.1
    },
    title: {
        fontSize: calcWidth(18),
        color: Colors.theme,
        fontFamily: 'Roboto-Medium',
        fontWeight: 'bold'
    },
    inputContainer: {
        width: calcWidth(325.2),
        height: calcHeight(26.5),
        marginBottom: calcHeight(30.5),
        borderColor: Colors.theme
    },
    InputText: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium'
    },
    Text: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        // marginTop: calcHeight(7.5),

        //marginBottom:15
    },
    ButtonGroupline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: calcHeight(2.5),
        marginBottom: calcHeight(15),
        //width: calcWidth(345),
        // backgroundColor: 'blue'
    },
    BloodbagsNum: {
        marginLeft: calcWidth(48),
        marginRight: calcWidth(21),
        color: Colors.theme,
        fontSize: calcWidth(18)
    },
    ButtonGroup: {
        height: calcHeight(32),
        width: calcWidth(82),
        backgroundColor: Colors.theme,
        borderRadius: 10
    },
    BloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.Whitebackground,
        borderWidth: 1,
        elevation: 1.5,
        width: calcHeight(41),
        height: calcWidth(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    redBloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.theme,
        borderWidth: 1,
        elevation: 1.5,
        width: calcHeight(41),
        height: calcWidth(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    BloodText: {
        fontSize: calcWidth(15),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.theme,
    },
    whiteBloodText: {
        fontSize: calcWidth(15),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.Whitebackground,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: calcHeight(15),
    },
    RequestButton: {
        backgroundColor: Colors.theme,
        borderRadius: 13,
        width: calcWidth(325),
        height: calcHeight(49),
        alignItems: "center",
        justifyContent: "center",
        marginTop: calcHeight(45),
        elevation: 5
    }
});


