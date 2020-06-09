import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Card from '../components/Cards/RequestCard';


class HomePage extends Component {

    componentDidMount() {
        this.getProfiledata()
    }
    getProfiledata = async () => {

        database()
            .ref('users/' + auth().currentUser.uid + '/informations')
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());

                this.setState({
                    username: snapshot.val().name,
                    email: auth().currentUser.email,
                    phone: snapshot.val().phone,
                    gender: snapshot.val().gender,
                    bloodType: snapshot.val().bloodType
                })
            });
    }

    state = {
        username: '',
        lastdonate: {
            day: '06',
            month: 'June',
        },
        nextdonate: {
            day: '07',
            month: 'sep.'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.LightImage}
                    source={require('../assets/images/sound-wave.png')}
                >
                    <ImageBackground
                        style={styles.Image}
                        source={require('../assets/images/sound-wave-above.png')}>
                        <View style={styles.Header}>
                            <View>
                                <Text style={styles.welcom}>welcome,</Text>
                                <Text style={styles.username}>{this.state.username}</Text>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft:calcWidth(116.4) }}>
                                <Icon
                                    name='bell'
                                    size={24}
                                    style={styles.icons}

                                />
                                <Icon
                                    name='search'
                                    size={24}
                                    style={styles.icons}
                                />

                            </View>
                        </View>
                    </ImageBackground>
                </ImageBackground>
                <View style={styles.Page}>
                    <View style={styles.card}>
                        <Image
                            source={require('../assets/images/iv-bag.png')}
                            style={{ height:calcHeight(57.5), width:calcWidth(45.5) }}
                        />
                        <View>
                            <Text style={{ fontSize: calcWidth(20), fontFamily: 'Montserrat-Bold', color: Colors.theme }}>{this.state.lastdonate.day}{" "}{this.state.lastdonate.month}</Text>
                            <Text style={{ fontSize: calcWidth(12), fontFamily: 'Montserrat-Regular', color: Colors.theme }}>Last donation</Text>
                            <Text style={{ marginTop:calcHeight(9), fontSize: calcWidth(12), fontFamily: 'Montserrat-Regular', color: Colors.textCard }}>You can’t donate till {this.state.nextdonate.day}{" "}{this.state.nextdonate.month}</Text>
                        </View>
                        <View>
                            <Image
                                style={{ marginBottom: calcHeight(8), width: calcWidth(30.89), height: calcHeight(30.89) }}
                                source={require('../assets/images/exclamation1.png')}
                            />
                            <Icon
                                name='calendar'
                                size={35}
                                color={'#7C7C7C'}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: calcHeight(25),paddingHorizontal: calcWidth(25), marginTop: calcHeight(6) }}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize:  calcWidth(16), color: Colors.theme }}>Blood requests</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize:  calcWidth(14), fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>See all</Text>
                    </TouchableOpacity>
                </View>
                {/*

                 <Card/>

                 */}
                <Navbar />
            </View>
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
        width: calcWidth(431.69),
        height: calcHeight(144.41),
        
    },
    LightImage: {
        height: calcHeight(140), 
        width: calcWidth(330),
    },
    Header: {
        paddingVertical: calcHeight(25),
        paddingHorizontal: calcWidth(25),
        flexDirection: 'row',
        alignItems: 'center',
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
        marginRight: calcWidth(12),
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