import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';



export default class MyAcceptedReqCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ID: '',
            remaining: 0,
            Done_touchable: styles.touchable,
            Ignore_touchable: styles.touchable,
            Done_text: 'Done',
            IgnoreClick: false,
            removedID: '',
            gender: ''
        }
    }
    componentDidMount() {
        //console.log(this.props.regionData)
        this.setState({ ID: this.props.requestID })
        this.ButtonView()
    }
    navigateToDetalis = async () => {
        this.props.navigation.navigate('RequestDetails', { ReqID: this.state.ID })
    }

    Done = async () => {
        if (this.state.IgnoreClick == false) {
            let d = new Date().getDate() //To get the Current Date
            let m = new Date().getMonth() + 1 //To get the Current Date
            let y = new Date().getFullYear() //To get the Current Date
            database().ref('users/' + auth().currentUser.uid + '/informations/next_donation').on('value', snapshot => {
                this.setState({
                    day: snapshot.val().day,
                    month: snapshot.val().month,
                    year: snapshot.val().year
                }, () => {
                    if (this.state.day == 0 && this.state.month == 0 && this.state.year == 0) {
                        database().ref('users/' + auth().currentUser.uid + '/AcceptedReq/' + this.props.requestID).update({
                            DoneFlage: 'Done',
                            IgnoreFlage: 'do not allowed to change',
                            DoneDate: {
                                Day: d,
                                Month: m,
                                Year: y
                            }
                        }, () => {
                            this.ButtonView()
                            let Nm = m, Ny = y
                            database().ref('users/' + auth().currentUser.uid + '/informations/gender').on('value', snapshot => {
                                //console.log('gender', snapshot.val())
                                this.setState({ gender: snapshot.val() }, () => {
                                    //console.log('stategender', this.state.gender)
                                    if (this.state.gender == 'male') {
                                        for (let index = 0; index < 4; index++) {
                                            if (Nm == 12) {
                                                Nm = 1,
                                                    Ny++
                                            } else {
                                                Nm++
                                            }

                                        }
                                    } else if (this.state.gender == 'female') {
                                        for (let index = 0; index < 6; index++) {
                                            if (Nm == 12) {
                                                Nm = 1,
                                                    Ny++
                                            } else {
                                                Nm++
                                            }
                                        }
                                    }
                                    //console.log('Nm', Nm, '////', 'Ny', Ny)
                                    database().ref('users/' + auth().currentUser.uid + '/informations').update({
                                        last_donation: {
                                            day: d,
                                            month: m,
                                            year: y
                                        },
                                        next_donation: {
                                            day: d,
                                            month: Nm,
                                            year: Ny
                                        }
                                    })
                                })

                            })
                        })
                    } else {
                        alert('You can not donate till your next donation date')
                    }
                })
            })
        } else {
            alert('you had ignoerd this request')
        }

    }
    Ignore = async () => {
        database().ref('users/' + auth().currentUser.uid + '/AcceptedReq/' + this.props.requestID + '/IgnoreFlage').once('value', snapshot => {
            let IgnoreFlage = snapshot.val()
            if (IgnoreFlage == 'allowed to change') {
                this.setState({ removedID: this.props.requestID })
                database().ref('users/' + auth().currentUser.uid + '/AcceptedReq/' + this.props.requestID).remove().then(
                    database().ref('BloodRequests/AllRequests/' + this.state.removedID + '/remaining').once('value', snapshot => {
                        this.setState({ remaining: snapshot.val() }, () => {
                            database().ref('BloodRequests/AllRequests/' + this.props.requestID).update({
                                remaining: this.state.remaining + 1
                            })
                        })
                    })
                )
                this.setState({ IgnoreClick: true })
            } else if (IgnoreFlage == 'do not allowed to change') {
                alert('you had done this donnation request')
            }
        })
    }
    ButtonView = async () => {
        //console.log('!!!!!', this.props.requestID)
        database().ref('users/' + auth().currentUser.uid + '/AcceptedReq/' + this.props.requestID).on('value', snapshot => {
            if (this.props.requestID != this.state.removedID) {
                //console.log('!!', this.state.removedID)
                let DoneFlagee = snapshot && snapshot.val() ? snapshot.val().DoneFlage : null
                this.setState({ DoneFlage: DoneFlagee }, () => {
                    if (this.state.DoneFlage == 'Done') {
                        this.setState({
                            Done_touchable: styles.Donated_touchable,
                            Done_text: 'Donated',
                            Ignore_touchable: styles.Donated_touchable
                        })
                    }
                })
            }
        })
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.navigateToDetalis()}>
                <View style={styles.body} >

                    {/* start Top */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: calcHeight(20) }}>

                        {/* BloodType circle */}
                        <View style={styles.circle} >
                            <Text style={styles.BloodType}>{this.props.type}</Text>
                        </View>

                        {/* paitent information */}
                        <View style={{ marginLeft: calcWidth(12), justifyContent: 'center' }}>
                            <Text style={styles.Patient} >Patient</Text>
                            <Text style={styles.PatientName} numberOfLines={1} >{this.props.name}</Text>
                        </View>

                        {/* share icon */}
                        <View style={{ height: calcWidth(41) }}>
                            <TouchableOpacity style={styles.Smallcircle} >
                                <Image source={require('../../assets/images/share.png')} style={styles.shareicon} />
                            </TouchableOpacity>
                        </View>
                        {/* end top */}
                    </View>

                    {/* units needs */}
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.Needs} >Needs</Text>
                        <Text style={styles.units} >{this.props.needsunits} units</Text>
                        {/* blood icon */}
                        <View >
                            <Image source={require('../../assets/images/iv-bag.png')} style={styles.bloodicon} />
                        </View>
                    </View>

                    {/* start line */}
                    <View style={styles.line}>
                    </View>


                    {/* start End */}
                    {/* accept button */}
                    <View style={{ flexDirection: 'row' }} >
                        {/*this.DoneButtonView()*/}
                        <TouchableOpacity style={this.state.Done_touchable}
                            onPress={() => { this.Done() }}>
                            <Text style={styles.AcceptButton}>{this.state.Done_text}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.Ignore_touchable}
                            onPress={() => { this.Ignore() }}
                        >
                            <Text style={styles.AcceptButton}>Ignore</Text>
                        </TouchableOpacity>
                    </View>

                    {/* end End */}
                </View>
                {/* end body */}
            </TouchableOpacity >
        );
    }
}


const styles = StyleSheet.create({
    body:
    {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(325),
        height: calcHeight(163),
        marginTop: calcHeight(15),
        alignSelf: 'center',
        borderWidth: calcWidth(1),
        borderColor: Colors.Border,
        borderRadius: 15,
        elevation: 1.5,

    },
    circle:
    {
        height: calcWidth(42),
        width: calcWidth(42),
        marginLeft: calcWidth(20),
        backgroundColor: Colors.Whitebackground,
        borderRadius: calcWidth(21),
        borderWidth: calcWidth(1),
        borderColor: Colors.InnerBorder,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BloodType:
    {
        fontSize: calcWidth(16),
        fontFamily: 'Montserrat-semiBold',
        color: Colors.Types,
    },
    Patient:
    {
        fontSize: calcWidth(12),
        color: Colors.theme,
        fontFamily: 'Montserrat-Bold',
    },
    PatientName:
    {
        fontSize: calcWidth(12),
        color: '#7C7C7C',
        width: calcWidth(150),
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(4),

    },
    Smallcircle:
    {
        height: calcWidth(29),
        width: calcWidth(29),
        backgroundColor: Colors.Whitebackground,
        borderRadius: 50,
        borderWidth: calcWidth(1),
        borderColor: Colors.InnerBorder,
        elevation: 3,
        marginLeft: calcWidth(53),
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareicon:
    {
        height: calcHeight(14.82),
        width: calcWidth(12.41),
    },
    Needs:
    {
        fontSize: calcWidth(12),
        fontFamily: 'Montserrat-Bold',
        color: '#7C7C7C',
        marginLeft: calcWidth(27),
        marginTop: calcHeight(11),
    },
    units:
    {
        fontSize: calcWidth(12),
        fontFamily: 'Montserrat-Regular',
        color: '#7C7C7C',
        marginLeft: calcWidth(6),
        marginTop: calcHeight(11),
    },
    bloodicon:
    {
        height: calcHeight(25.24),
        width: calcWidth(19.97),
        marginTop: calcHeight(8),
        marginLeft: calcWidth(8),
    },
    line:
    {
        height: calcHeight(1),
        width: calcWidth(282),
        backgroundColor: Colors.line,
        alignSelf: 'center',
        marginTop: calcHeight(7.26),
    },
    adressicon:
    {
        height: calcHeight(18),
        width: calcWidth(12.3),
        marginLeft: calcWidth(27),
        marginTop: calcHeight(20.5),
    },
    Address:
    {
        fontSize: calcWidth(12),
        color: '#7C7C7C',
        width: calcWidth(120),
        fontFamily: 'Montserrat-Medium',
        marginLeft: calcWidth(11.7),
        marginTop: calcHeight(21.5),

    },
    touchable: {
        marginTop: calcHeight(15.5),
        marginLeft: calcWidth(62.3),
        height: calcHeight(27.41),
        width: calcWidth(71.7),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.theme,
        elevation: 3,

    },
    Donated_touchable: {
        marginTop: calcHeight(15.5),
        marginLeft: calcWidth(62.3),
        height: calcHeight(27.41),
        width: calcWidth(71.7),
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.DarkGray,
        elevation: 3,

    },
    AcceptButton:
    {
        fontFamily: 'MontserratMedium',
        fontSize: calcWidth(13),
        color: Colors.Whitebackground,
    },



});


