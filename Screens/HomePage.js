import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    ImageBackground
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import { ScrollView } from 'react-native-gesture-handler';
import { CreateRoomChat } from '../CreateRoomChat';
import ShadowView from 'react-native-simple-shadow-view'
var PushNotification = require("react-native-push-notification");
import messaging from '@react-native-firebase/messaging';

class Background extends Component {

    render() {
        return (
            <ImageBackground source={require('../assets/images/header.png')}
                style={styles.backgroundImage}>
                <View>
                    {this.props.children}
                </View>

            </ImageBackground>
        )
    }
}


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            lastdonateDay: '',
            lastdonateMonth: '',
            nextdonateDay: '',
            nextdonateMonth: '',
            userRequestNum: 0,
            actionOpen: false

        }
    }

    componentDidMount() {


        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );

            if (remoteMessage && remoteMessage.data) {
                CreateRoomChat(remoteMessage.data.receiver,
                    remoteMessage.data.sender,
                    (key) => {
                        this.props.navigation.navigate('ChatView', { ChatId: key })
                    })
            }
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                    if (remoteMessage && remoteMessage.data) {
                        CreateRoomChat(remoteMessage.data.receiver,
                            remoteMessage.data.sender,
                            (key) => {
                                this.props.navigation.navigate('ChatView', { ChatId: key })
                            })
                    }
                }
            });



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
                <View>
                    <View style={styles.Header}>
                        {/* <Background> */}
                        <View>
                            <Text style={styles.welcom}>welcome,</Text>
                            <Text style={styles.username}>{this.state.username}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: calcWidth(85), alignItems: "center" }}>

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
                        {/* </Background> */}
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

                <View style={{ paddingTop: calcHeight(25), paddingHorizontal: calcWidth(25) }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllRequests')} style={styles.Touchable}>
                        <ShadowView
                            style={{
                                width: "100%", height: "100%",
                                backgroundColor: "#f0f1f5",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >

                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require('../assets/images/blood-req.png')}
                                resizeMode="cover"
                            />
                        </ShadowView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAcceptedReq')} style={styles.Touchable}>
                        <ShadowView
                            style={{
                                width: "100%", height: "100%",
                                backgroundColor: "#f0f1f5",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require('../assets/images/accepted-req.png')}
                                resizeMode="cover"
                            />
                        </ShadowView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyRequests')} style={styles.Touchable}>
                        <ShadowView
                            style={{
                                width: "100%", height: "100%",
                                backgroundColor: "#f0f1f5",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require('../assets/images/my-req.png')}
                                resizeMode="cover"
                            />
                        </ShadowView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Covid')} style={styles.Touchable}>
                        <ShadowView
                            style={{
                                width: "100%", height: "100%",
                                backgroundColor: "#f0f1f5",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                borderRadius: 5,
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                            }}
                        >
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require('../assets/images/covid-19.png')}
                                resizeMode="cover"
                            />
                        </ShadowView>
                    </TouchableOpacity>
                </View>
                <View style={{ position: "absolute", bottom: 0, height: !this.state.actionOpen ? calcHeight(90) : calcHeight(310), width: "100%" }}>
                    <Navbar navigation={this.props.navigation} actionOpen={this.state.actionOpen} changeState={() => {
                        this.setState({
                            actionOpen: !this.state.actionOpen
                        })
                    }} />
                </View>


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
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    Header: {
        paddingVertical: calcHeight(25),
        paddingHorizontal: calcWidth(25),
        height: calcHeight(100),
        width: calcWidth(375),
        marginBottom: calcHeight(20),
        flexDirection: 'row',
        alignItems: 'center',
        width: calcWidth(375),
        backgroundColor: Colors.theme,
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
        marginBottom: calcHeight(8),
        width: calcWidth(325),
        height: calcHeight(103),
        // backgroundColor: "#f0f1f5",
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        borderRadius: 10
    },
    badgeStyle: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    ScrollView: {
        paddingBottom: calcHeight(70),
        // backgroundColor: Colors.Whitebackground,

    },
    Touchable: {
        backgroundColor: "#f0f1f5",
        height: calcHeight(60),
        marginBottom: calcHeight(10),
        borderRadius: 5,
        // elevation: 3,
        width: "100%",
    }
})
export default HomePage;