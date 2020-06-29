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
import Card from '../components/Cards/RequestCard';
import Icon from 'react-native-vector-icons/Octicons';
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

        }
    }

    componentDidMount() {
        this.getProfiledata()
        this.setNextDonation()
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

                        <Icon
                            name='bell'
                            size={24}
                            style={styles.icons}
                            onPress={() => this.props.navigation.navigate('notification')}

                        />
                        <Icon
                            name='search'
                            size={24}
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
                            <Icon
                                name='calendar'
                                size={35}
                                color={'#7C7C7C'}
                                onPress={() => this.props.navigation.navigate('Calendar')}

                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: calcHeight(25), paddingHorizontal: calcWidth(25), marginTop: calcHeight(6) }}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: calcWidth(16), color: Colors.theme }}>Blood requests</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllRequests')}>
                        <Text style={{ fontSize: calcWidth(14), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>See all</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: calcWidth(25), marginTop: calcHeight(6) }}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: calcWidth(16), color: Colors.theme }}>Accepted requests</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAcceptedReq')}>
                        <Text style={{ fontSize: calcWidth(14), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>See all</Text>
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
    }


})
export default HomePage;