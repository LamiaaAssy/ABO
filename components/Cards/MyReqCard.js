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


export default class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ID: '',
            remaining: 0
        }
    }
    componentDidMount = async () => {
        //console.log(this.props.regionData)
        this.setState({ ID: this.props.requestID })
    }
    navigateToDetalis = async () => {
        this.props.navigation.navigate('RequestDetails', { ReqID: this.state.ID })
    }
    remove = async () => {
        database().ref('BloodRequests/AllRequests/' + this.props.requestID).update({
            remaining: 0,
            removeFlage: true
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
                    <View style={{ flexDirection: 'row' }}>

                        {/* adress icon */}
                        <View >
                            <Image source={require('../../assets/images/placeholder.png')} style={styles.adressicon} />
                        </View>

                        {/* patient adress */}
                        <View >
                            <Text style={styles.Address} numberOfLines={1} >{this.props.Adress}</Text>
                        </View>

                        {/* accept button */}
                        <View >
                            <TouchableOpacity style={styles.touchable}
                                onPress={() => { this.remove() }}
                            >
                                <Text style={styles.AcceptButton}>Remove</Text>
                            </TouchableOpacity>
                        </View>

                        {/* end End */}
                    </View>


                    {/* end body */}

                </View>
            </TouchableOpacity>
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
    AcceptButton:
    {
        fontFamily: 'MontserratMedium',
        fontSize: calcWidth(13),
        color: Colors.Whitebackground,
    },



});


