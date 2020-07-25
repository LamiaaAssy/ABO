import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage,
    FlatList
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import { ScrollView } from 'react-native-gesture-handler';


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            lastdonateDay: '',
            lastdonateMonth: '',
            nextdonateDay: '',
            nextdonateMonth: '',
            userRequestNum: 0

        }
    }

    componentDidMount() {
        this.getProfiledata()
        this.setNextDonation()
        this.getCountRequests();

    }
    setNextDonation() {
        database().ref('users/' + auth().currentUser.uid + '/informations/next_donation').on('value', snapshot => {
            let d = new Date().getDate() //To get the Current Date
            let m = new Date().getMonth() + 1 //To get the Current Date
            let y = new Date().getFullYear() //To get the Current Date
            let Nd = snapshot.val().day
            let Nm = snapshot.val().month
            let Ny = snapshot.val().year
            if (d == Nd && m == Nm && y == Ny) {
                database().ref('users/' + auth().currentUser.uid + '/informations').update({
                    next_donation: {
                        day: 0,
                        month: 0,
                        year: 0
                    }
                })
            }
        })
    }
    getProfiledata = async () => {

        database()
            .ref('users/' + auth().currentUser.uid + '/informations')
            .on('value', snapshot => {

                this.setState({
                    username: snapshot.val().name,
                    email: auth().currentUser.email,
                    phone: snapshot.val().phone,
                    gender: snapshot.val().gender,
                    bloodType: snapshot.val().bloodType,
                    lastdonateDay: snapshot.val().last_donation.day,
                    lastdonateMonth: snapshot.val().last_donation.month,
                    nextdonateDay: snapshot.val().next_donation.day,
                    nextdonateMonth: snapshot.val().next_donation.month,

                })
                //this.state.lastdonate.push(snapshot.val().last_donation.day)
                //this.state.lastdonate.push(snapshot.val().last_donation.month)
                //this.state.nextdonate.push(snapshot.val().next_donation.day)
                //this.state.nextdonate.push(snapshot.val().next_donation.month)

            });
    }

    getCountRequests = async () => {

        database()
            .ref('users/' + auth().currentUser.uid + '/helpRequest')
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    let notificationID = Object.keys(snapshot.val())

                    // let count = 0;
                    for (let index = 0; index < notificationID.length; index++) {
                        // d.push(snapshot.val()[notificationID[index]]['senderId']);

                        database()
                            .ref('users/' + auth().currentUser.uid + '/helpRequest/' + notificationID[index])
                            .on('value', snapshot => {
                                console.log("aaaaaaaaaaaaaa", snapshot.val().requestSeen);

                                if (snapshot.val().requestSeen == 0) {
                                    this.setState({ userRequestNum: this.state.userRequestNum + 1 })

                                }


                            });

                        // this.setState({ userRequestNum: count })



                    }

                    console.log("test counttttt", this.state.userRequestNum);

                }
            });
    }

    handleNotifications = async () => {
        database()
            .ref('users/' + auth().currentUser.uid + '/helpRequest')
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    let notificationID = Object.keys(snapshot.val())

                    for (let index = 0; index < notificationID.length; index++) {
                        database()
                            .ref('users/' + auth().currentUser.uid + '/helpRequest/' + notificationID[index])
                            .on('value', snapshot => {
                                // console.log("aaaaaaaaaaaaaa", snapshot.val().senderId);

                                let sId = snapshot.val().senderId;
                                database().ref('users/' + auth().currentUser.uid + '/helpRequest/' + notificationID[index]).update({
                                    requestSeen: 1,
                                    senderId: sId,
                                })

                            });



                    }

                }
            });

        setTimeout(() => {
            this.props.navigation.push('HomePage');
            this.props.navigation.push('notification');
        },
            1000
        )
    }
    renderbadge = () => {

        console.log("test render count ", this.state.userRequestNum);
        if (this.state.userRequestNum > 0) {

            return (
                < Badge
                    value={this.state.userRequestNum}
                    status="error"
                    containerStyle={styles.badgeStyle}
                />
            )

        }

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.Header}>
                    <Image
                        style={styles.LightImage}
                        source={require('../assets/images/sound-wave.png')} />
                    <Image
                        style={styles.Image}
                        source={require('../assets/images/sound-wave-above.png')} />

                    <View>
                        <Text style={styles.welcom}>welcome,</Text>
                        <Text style={styles.username}>{this.state.username}</Text>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: calcWidth(85), }}>

                        <TouchableOpacity onPress={() => this.handleNotifications()}>
                            <Icon type="ionicon" name="ios-notifications" size={35} color={Colors.Whitebackground} />
                            {this.renderbadge()}
                        </TouchableOpacity>

                        <Icon2
                            name='search'
                            size={27}
                            style={styles.icons}
                            onPress={() => this.props.navigation.navigate('search')}

                        />

                    </View>
                </View>
                <View style={styles.Page}>
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/images/iv-bag.png')}
                            style={{ height: calcHeight(57.5), width: calcWidth(45.5) }}
                        />
                        <View>
                            <Text style={{ fontSize: calcWidth(20), fontFamily: 'Montserrat-Bold', color: Colors.theme }}>{this.state.lastdonateDay}{" / "}{this.state.lastdonateMonth}</Text>
                            <Text style={{ fontSize: calcWidth(12), fontFamily: 'Montserrat-Regular', color: Colors.theme }}>Last donation</Text>
                            <Text style={{ marginTop: calcHeight(9), fontSize: calcWidth(12), fontFamily: 'Montserrat-Regular', color: Colors.textCard }}>You can’t donate till {this.state.nextdonateDay}{" / "}{this.state.nextdonateMonth}</Text>
                        </View>
                        <View>
                            <Image
                                style={{ marginBottom: calcHeight(8), width: calcWidth(33), height: calcHeight(30.89) }}
                                source={require('../assets/images/exclamation1.png')}
                            />
                            <Icon2
                                name='calendar'
                                size={35}
                                color={'#7C7C7C'}
                                onPress={() => this.props.navigation.navigate('Calendar')}

                            />
                        </View>
                    </View>
                </View>
                <View style={{ paddingVertical: calcHeight(25), paddingHorizontal: calcWidth(25), marginTop: calcHeight(6) }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllRequests')}>
                        <Text style={{ fontSize: calcWidth(16), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>Blood requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAcceptedReq')}>
                        <Text style={{ fontSize: calcWidth(16), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>Accepted requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyRequests')}>
                        <Text style={{ fontSize: calcWidth(16), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>My requests</Text>
                    </TouchableOpacity>
                </View>
                {/*

                 <Card/>

                 */}
                <Navbar navigation={this.props.navigation} />
            </View >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
    },
    Page: {
        alignItems: 'center',
        marginTop: calcHeight(15),
    },
    Image: {
        width: calcWidth(395),
        height: calcHeight(125),
        position: 'absolute',
        top: 0

    },
    LightImage: {
        height: calcHeight(120),
        width: calcWidth(300),
        position: 'absolute',
        top: 0
    },
    Header: {
        paddingVertical: calcHeight(25),
        paddingHorizontal: calcWidth(25),
        height: calcHeight(100),
        width: calcWidth(375),
        marginBottom: calcHeight(30),
        flexDirection: 'row',
        alignItems: 'center',
        width: calcWidth(375),
        // backgroundColor: 'pink',
        zIndex: 6,
        justifyContent: 'space-between'
        //justifyContent: 'space-around'
    },
    welcom: {
        fontFamily: 'Montserrat-Regular',
        fontSize: calcWidth(12),
        color: Colors.Whitebackground
    },
    username: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: calcWidth(14),
        color: Colors.Whitebackground
    },
    icons: {
        color: Colors.Whitebackground,

        //marginRight: calcWidth(35),
    },
    card: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: calcHeight(20),
        paddingHorizontal: calcWidth(20),
        width: calcWidth(325),
        height: calcHeight(103),
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        borderRadius: 10
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
})
export default HomePage;