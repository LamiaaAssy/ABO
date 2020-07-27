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

} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Icon from 'react-native-vector-icons/Octicons';
import Header from '../components/Header';
import ImageBackground from '../components/Background';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

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
            selectedtype: [],
            users_ids: '',
            userData: '',
            userBloodType: '',
            matched_donnors: [],
            address: ''
        };
        this.updateIndex = this.updateIndex.bind(this);
    }

    componentDidMount() {
        //  this.BloodType_matching()
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

    selectedBloodType() {
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
        for (let index = 0; index < type.length; index++) {
            this.state.selectedtype.push(type[index])
        }
    }

    BloodType_matching = async () => {
        this.selectedBloodType();
        database()
            .ref('users')
            .on('value', snapshot => {
                this.setState({ users_ids: Object.keys(snapshot.val()), userData: snapshot.val() },
                    () => {
                        let matcheddonnors = []
                        for (let index = 0; index < this.state.users_ids.length; index++) {
                            database()
                                .ref('users/' + this.state.users_ids[index] + '/informations/bloodType')
                                .on('value', snapshot => {

                                    if (this.state.selectedtype.length != 0) {
                                        this.setState({ userBloodType: snapshot.val() }, () => {
                                            let count = 0
                                            for (let x = 0; x < this.state.selectedtype.length; x++) {
                                                if (this.state.userBloodType == this.state.selectedtype[x]) {
                                                    count++
                                                }
                                            }

                                            if (count != 0) {

                                                if (this.state.users_ids[index] != auth().currentUser.uid) {
                                                    matcheddonnors.push(this.state.userData[this.state.users_ids[index]]['informations'])
                                                    // console.log('matcheddonnors.length', matcheddonnors.length)
                                                    matcheddonnors[matcheddonnors.length - 1]['useId'] = this.state.users_ids[index]
                                                    console.log("Ehab donors : ", matcheddonnors)
                                                    this.setState({ matched_donnors: matcheddonnors })
                                                    //console.log('matched state', this.state.matched_donnors)
                                                    //console.log('matched state len', this.state.matched_donnors.length)   
                                                }
                                            }
                                        })
                                    } else {
                                        if (this.state.users_ids[index] != auth().currentUser.uid) {
                                            console.log("Ehab trace : ", this.state.users_ids[index])
                                            matcheddonnors.push(this.state.userData[this.state.users_ids[index]]['informations'])
                                            // console.log('matcheddonnors.length', matcheddonnors.length)
                                            matcheddonnors[matcheddonnors.length - 1]['useId'] = this.state.users_ids[index]
                                            this.setState({ matched_donnors: matcheddonnors })
                                        }

                                    }
                                })
                        }
                        setTimeout(() => {
                            this.Address_matching();
                            // console.log('select', this.state.selectedtype)
                            //console.log('Blood', this.state.matched_donnors)
                        }, 300);


                    })
                //  this.Address_matching()
            })
    }
    Address_matching() {
        //console.log('matched state', this.state.matched_donnors)
        //console.log('matched state len', this.state.matched_donnors.length)
        if (this.state.matched_donnors != null) {
            if (this.state.address != '') {
                let newMatched = []
                let search_LatLon = { 'lat': this.state.address['lat'], 'lon': this.state.address['lon'] }
                for (let index = 0; index < this.state.matched_donnors.length; index++) {
                    newMatched.push({
                        'useId': this.state.matched_donnors[index]['useId'],
                        'bloodType': this.state.matched_donnors[index]['bloodType'],
                        'name': this.state.matched_donnors[index]['name'],
                        'image': this.state.matched_donnors[index]['image'],
                        'address': this.state.matched_donnors[index]['address']['text'],
                        'lat': this.state.matched_donnors[index]['address']['lat'],
                        'lon': this.state.matched_donnors[index]['address']['lon'],
                        'latDef': Math.abs(search_LatLon['lat'] - this.state.matched_donnors[index]['address']['lat']),
                        'lonDef': Math.abs(search_LatLon['lon'] - this.state.matched_donnors[index]['address']['lon'])
                    })
                }
                let Outcomes = []
                for (let index = 0; index < newMatched.length; index++) {
                    let a = Math.pow(Math.sin(newMatched[index]['latDef'] / 2), 2) + Math.cos(search_LatLon['lat']) * Math.cos(newMatched[index]['lat']) * Math.pow(Math.sin(newMatched[index]['lonDef'] / 2), 2)
                    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
                    Outcomes.push({
                        'useId': newMatched[index]['useId'],
                        'bloodType': newMatched[index]['bloodType'],
                        'name': newMatched[index]['name'],
                        'image': newMatched[index]['image'],
                        'address': newMatched[index]['address'],
                        'Outcome': c
                    })
                }
                Outcomes.sort(function (a, b) {
                    return a.Outcome - b.Outcome;
                })
                this.setState({ matchedRequests2: Outcomes }, () => {
                    if (Outcomes.length == 0) {
                        alert('There is no matched donners')
                    } else {
                        console.log('Outcomes', this.state.matchedRequests2)
                    }
                })
            } else {
                let Outcomes = []
                for (let index = 0; index < this.state.matched_donnors.length; index++) {
                    Outcomes.push({
                        'bloodType': this.state.matched_donnors[index]['bloodType'],
                        'useId': this.state.matched_donnors[index]['useId'],
                        'name': this.state.matched_donnors[index]['name'],
                        'image': this.state.matched_donnors[index]['image'],
                        'address': this.state.matched_donnors[index]['address']['text'],
                    })
                }
                this.setState({ matchedRequests2: Outcomes }, () => {
                    console.log('Outcomes', this.state.matchedRequests2.length)
                })
            }
        }
        this.props.navigation.replace('ExploreDonners', { Users_data: this.state.matchedRequests2 })
    }
    render() {
        return (


            <View style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                <Header title={"Quick search"} navigation={this.props.navigation} />
                <ImageBackground>
                    <View>
                        <View style={styles.safe}>
                            <View style={styles.personalinformations}>
                                <Input
                                    inputStyle={styles.inputStyle}
                                    inputContainerStyle={styles.inputContainer}
                                    placeholder='Search by address...'
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
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: calcHeight(245) }}>
                            <TouchableOpacity style={styles.buttonSignupContainer}
                                onPress={() => { this.BloodType_matching() }} >
                                <View style={styles.signbutton}>
                                    <Text style={styles.buttontext}>Search</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
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
        paddingVertical: calcHeight(15),
        // backgroundColor: "black",
    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: calcHeight(7),
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    textRowArrow: {
        flexDirection: "row",
        marginLeft: calcWidth(20),
        marginBottom: calcHeight(40),
        marginTop: calcHeight(20),
        // justifyContent: "center",
    },
    buttonSignupContainer: {
        height: calcHeight(49),
        width: calcWidth(325),
        borderRadius: 15,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        marginTop: calcHeight(10),
        elevation: 3
    },
    signbutton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: calcHeight(20),
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        color: '#ecf0f1',
        fontSize: calcWidth(20),
    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: calcHeight(7),
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
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(7.5),
        marginLeft: calcWidth(25),
        //marginBottom:15
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: calcHeight(15),
        marginLeft: calcWidth(25),
    },
    BloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.Whitebackground,
        borderWidth: calcWidth(1),
        elevation: 1.5,
        width: calcWidth(41),
        height: calcWidth(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    redBloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.theme,
        borderWidth: calcWidth(1),
        elevation: 1.5,
        width: calcWidth(41),
        height: calcHeight(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    BloodText: {
        fontSize: calcWidth(16),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.theme,
    },
    whiteBloodText: {
        fontSize: calcWidth(16),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.Whitebackground,
    },
    BloodbagsNum: {
        marginLeft: calcWidth(37),
        marginRight: calcWidth(28),
        color: Colors.theme,
        fontSize: calcWidth(18),
    },
    ButtonGroupline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: calcHeight(2.5),
    },
    ButtonGroup: {
        height: calcHeight(32),
        width: calcWidth(82),
        backgroundColor: Colors.theme,
        borderRadius: 10
    },

});