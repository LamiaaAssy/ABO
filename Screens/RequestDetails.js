import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import call from 'react-native-phone-call';
import { CreateRoomChat } from '../CreateRoomChat';
import auth from '@react-native-firebase/auth';
import ImageBackground from '../components/Background';


export default class RequestDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bloodtypes: [],
            bloodunits: 0,
            patientname: '',
            address: '',
            mobile_number: '',
            remaining: 0,
            userId: '',
        }
    }

    componentDidMount() {
        this.getRequestData()
        this.getBloodbagsNum()
    }
    getRequestData() {
        const Request_id = this.props.navigation.getParam('ReqID');
        database().ref('BloodRequests/AllRequests/' + Request_id).on('value', snapshot => {
            this.setState({
                bloodunits: snapshot.val().BloodbagsNum,
                patientname: snapshot.val().Patient_name,
                address: snapshot.val().address.text,
                mobile_number: snapshot.val().mobile_number,
                remaining: snapshot.val().remaining,
                userId: snapshot.val().user_id,
            })
            database().ref('BloodRequests/AllRequests/' + Request_id + '/BloodTypes').on('value', snapshot => {
                for (let index = 0; index < snapshot.val().length; index++) {
                    this.state.bloodtypes.push(snapshot.val()[index])
                }
            });
            database().ref('users/' + snapshot.val().user_id + '/informations').on('value', snapshot => {
                this.setState({ requestedby: snapshot.val().name })
            });
        });
    }

    bloodtypeView() {
        let views = []
        for (let index = 0; index < this.state.bloodtypes.length; index++) {
            views.push(<View style={styles.circle}>
                <Text style={styles.circleText}>{this.state.bloodtypes[index]}</Text>
            </View>)
        }
        return views
    }
    callPatient() {
        const args = {
            number: this.state.mobile_number,
            prompt: false
        }

        call(args).catch(console.error)
    }
    getBloodbagsNum() {
        let Bloodbags = ''
        database().ref('BloodRequests/AllRequests/' + this.props.navigation.getParam('ReqID') + '/remaining').on('value', snapshot => {
            Bloodbags = snapshot.val()
            this.setState({ remaining: Bloodbags - 1 })
            // console.log(this.state.NewBloodBagsNum)
            //console.log(snapshot.val())
        })
    }
    accept = async () => {
        database().ref('users/' + auth().currentUser.uid + '/informations/next_donation').on('value', snapshot => {
            this.setState({
                day: snapshot.val().day,
                month: snapshot.val().month,
                year: snapshot.val().year
            }, () => {
                if (this.state.day == 0 && this.state.month == 0 && this.state.year == 0) {
                    database().ref('BloodRequests/AllRequests/' + this.props.navigation.getParam('ReqID')).update({
                        remaining: this.state.remaining,
                    })
                    database().ref('users/' + auth().currentUser.uid + '/AcceptedReq/' + this.props.navigation.getParam('ReqID')).set({
                        DoneFlage: 'Not done yet',
                        IgnoreFlage: 'allowed to change'
                    }, () => {
                        CreateRoomChat(auth().currentUser.uid,
                            this.state.userId,
                            (key) => {
                                this.props.navigation.navigate('ChatView', { ChatId: key })
                            })
                    })
                } else {
                    alert('You can not donate till your next donation date')
                }
            })
        })
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>

                {/* start headr */}
                <Header title={"Request details"} navigation={this.props.navigation} />
                {/* end headr */}
                <ImageBackground>

                    {/* <View style={{ flex: 1, alignItems: "center" }}> */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get("window").width, alignItems: "center", paddingBottom: calcHeight(50), justifyContent: "center", paddingTop: calcHeight(50) }}>

                        {/* start units needed */}
                        <View style={styles.unitsNeededView}>
                            <View style={styles.bloodbag}>
                                <Image source={require('../assets/images/iv-bag.png')} style={{ height: calcHeight(57.5), width: calcWidth(45.5), marginRight: calcWidth(12.5) }} />
                                <View>
                                    <Text style={{ fontSize: calcWidth(20), color: Colors.theme, fontFamily: 'Montserrat-Bold' }}>{this.state.bloodunits}</Text>
                                    <Text style={{ fontSize: calcWidth(12), color: Colors.theme, fontFamily: 'Montserrat-Regular' }}>units needed</Text>
                                </View>
                            </View>

                            <Text style={styles.remaining}>{this.state.remaining + 1} remaining</Text>
                        </View>
                        {/* start units needed */}

                        {/* start paitent information */}
                        <View style={styles.patientInformationView}>
                            {/* start Top */}
                            <View style={{ height: "50%", width: "100%", flexDirection: "row" }}>
                                <View style={styles.patientInformation}>
                                    <Text style={{ fontSize: calcWidth(16), color: Colors.theme, fontFamily: 'Montserrat-Bold' }} numberOfLines={1}>Paitent</Text>
                                    <Text style={{ fontSize: calcWidth(14), color: Colors.textCard, fontFamily: 'Montserrat-Medium', marginTop: calcHeight(3) }} numberOfLines={1}>{this.state.patientname}</Text>
                                    <Text style={{ fontSize: calcWidth(12), color: '#656565', fontFamily: 'Montserrat-Bold', marginTop: calcHeight(7) }} numberOfLines={1}>Valid Until</Text>
                                </View>
                                <View style={styles.patientViewIcons}>

                                    <View style={{ alignSelf: 'flex-end' }}>
                                        <Icon
                                            name='share-alt'
                                            size={16}
                                            color={Colors.textCard}
                                        />
                                    </View>
                                    <Text style={styles.date} numberOfLines={1}>15 / 2 / 2020</Text>
                                </View>
                            </View>
                            {/* end Top */}
                            <View style={{ height: "1%", backgroundColor: "#E7EAEF", width: "90%", alignSelf: "center", marginTop: calcHeight(20), marginBottom: calcHeight(20.5) }}></View>
                            {/* start End */}
                            <View style={{ height: "49%", width: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: calcWidth(14), color: Colors.textCard, fontFamily: 'Montserrat-SemiBold' }}>By{" "}</Text>
                                    <Text style={{ fontSize: calcWidth(14), color: Colors.textCard, fontFamily: 'Montserrat-Regular' }} numberOfLines={1}>{this.state.requestedby}</Text>

                                </View>

                                <Icon3
                                    name='phone-call'
                                    size={25}
                                    color={'#008F12'}
                                    onPress={() => this.callPatient()}

                                />

                            </View>
                            {/* end End */}
                        </View>
                        {/* end paitent information */}


                        {/* start blood required */}
                        <View style={styles.bloodRequiredView}>
                            <Text style={{ fontSize: calcWidth(14), color: Colors.theme, fontFamily: 'Montserrat-SemiBold' }} >Blood donor type required</Text>

                            <View style={styles.circlesContainer}>
                                {this.bloodtypeView()}

                            </View>
                        </View>
                        {/* end blood required */}

                        {/* start hospital informations */}
                        <View style={styles.hospitalInformationsView}>
                            <Text style={{ fontSize: calcWidth(14), color: Colors.theme, fontFamily: 'Montserrat-SemiBold' }} >Hospital address</Text>
                            <View style={styles.hospitaladdress}>
                                <Icon2 name="location" size={25} color="#7C7C7C" />
                                {/* <View style={{ backgroundColor: "black", height: 17.5, width: 12.5 }}></View> */}
                                <Text style={styles.hospitaladdressText} numberOfLines={1} >{this.state.address}</Text>
                            </View>
                        </View>

                        <View style={styles.hospitaladdressdetails}>
                            <TouchableOpacity style={styles.Touchable} onPress={() => alert('Show on map')} >
                                <Icon2 name="location" size={30} color="#7C7C7C" style={{ marginLeft: calcWidth(10) }} />
                                <Text style={styles.TouchableText}>Show on map</Text>
                            </TouchableOpacity>
                            <View style={{ height: "80%", backgroundColor: "#E7EAEF", width: calcWidth(1), alignSelf: "center" }}></View>
                            <TouchableOpacity style={styles.Touchable} onPress={() => alert('Share')}>
                                <Icon2 name="share-google" size={30} color="#7C7C7C" style={{ marginLeft: calcWidth(10) }} />
                                <Text style={styles.TouchableText}>Share details</Text>
                            </TouchableOpacity>

                        </View>
                        {/* end hospital informations */}

                        <TouchableOpacity style={styles.TouchableDonate} onPress={() => {
                            this.accept()
                        }}>
                            <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Donate</Text>
                        </TouchableOpacity>


                    </ScrollView>

                    {/* </View> */}

                </ImageBackground>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    headr: {
        width: calcWidth(325),
        height: calcHeight(45),
        marginTop: calcHeight(20),
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    headrText: {
        fontSize: 20,
        color: Colors.theme,
        marginLeft: calcWidth(20),
        fontFamily: 'Roboto-Medium',
    },
    unitsNeededView: {
        backgroundColor: Colors.Whitebackground,
        paddingVertical: calcHeight(20),
        paddingHorizontal: calcWidth(20),
        width: calcWidth(325),
        height: calcHeight(92),
        marginTop: calcHeight(15),
        flexDirection: "row",
        borderRadius: 10,
        elevation: 5,

        justifyContent: 'space-between'
    },
    bloodbag: {
        marginVertical: calcHeight(17),
        flexDirection: 'row',
        alignItems: 'center'
    },
    unitsNeededText: {
        height: calcHeight(44),
        width: calcWidth(81),
        marginLeft: calcWidth(12.5),
        marginVertical: calcHeight(26)

    },
    remaining: {
        marginTop: calcHeight(30),
        //marginBottom: calcHeight(27),
        //marginLeft: calcWidth(72),
        color: '#7C7C7C',
        fontSize: calcWidth(12),
        fontFamily: 'Montserrat-Regular',
    },
    patientInformationView: {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(325),
        height: calcHeight(162),
        marginTop: calcHeight(25),
        borderRadius: 10,
        elevation: 5,
        paddingVertical: calcHeight(20),
        paddingHorizontal: calcWidth(20),
        justifyContent: 'space-between'
    },
    patientInformation: {
        height: "100%",
        width: "60%",
    },
    patientViewIcons: {
        height: "100%",
        width: "40%",
        justifyContent: 'space-between',
        // backgroundColor: 'blue'
    },
    date: {
        color: Colors.textCard,
        fontSize: calcWidth(12),
        fontFamily: 'Montserrat-Regular',
        alignSelf: 'flex-end',
        // marginTop: calcHeight(37),
    },
    bloodRequiredView: {
        width: calcWidth(325),
        height: calcHeight(115),
        marginTop: calcHeight(26),
        paddingVertical: calcHeight(20),
        paddingHorizontal: calcWidth(20),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
    },
    circlesContainer: {
        flexDirection: "row",
        width: "100%",
        height: calcHeight(50),
        marginTop: calcHeight(15),
        alignItems: "center",
        justifyContent: 'flex-start',
        //backgroundColor: Colors.theme
    },
    circle: {
        height: calcWidth(42),
        width: calcWidth(42),
        backgroundColor: Colors.theme,
        borderRadius: 50,
        marginRight: calcWidth(21),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        elevation: 5
    },
    circleText: {
        fontSize: calcWidth(16),
        color: "#fff",
        fontFamily: 'Montserrat-SemiBold',
        width: "100%",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center"
    },
    hospitalInformationsView: {
        width: calcWidth(325),
        height: calcHeight(87),
        marginTop: calcHeight(22),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        paddingVertical: calcHeight(21),
        paddingHorizontal: calcWidth(21),
        justifyContent: 'flex-start'
    },
    hospitaladdress: {
        flexDirection: "row",
        marginTop: calcHeight(10),
        justifyContent: 'flex-start'

    },
    hospitaladdressText: {
        marginLeft: calcWidth(11.7),
        fontSize: calcWidth(14),
        color: Colors.textCard,
        fontFamily: 'Roboto-Medium',
        maxWidth: calcWidth(260),
    },
    hospitaladdressdetails: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(26),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center"
    },
    Touchable: {
        height: "100%",
        width: "48%",
        flexDirection: "row",
        alignItems: "center",

    },
    TouchableText: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        marginLeft: calcWidth(8),
        fontFamily: 'Montserrat-SemiBold',
    },
    TouchableDonate: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(45),
        borderRadius: 10,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    }
})

