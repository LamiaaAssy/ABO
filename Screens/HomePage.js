import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'

class HomePage extends Component {
    state = {
        username: 'samar',
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginLeft: 116.4 }}>
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
                            style={{ height: 57.5, width: 45.5 }}
                        />
                        <View>
                            <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', color: Colors.theme }}>{this.state.lastdonate.day}{" "}{this.state.lastdonate.month}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', color: Colors.theme }}>Last donation</Text>
                            <Text style={{ marginTop: 9, fontSize: 12, fontFamily: 'Montserrat-Regular', color: '#7C7C7C' }}>You can’t donate till {this.state.nextdonate.day}{" "}{this.state.nextdonate.month}</Text>
                        </View>
                        <View>
                            <Image
                                style={{ marginBottom: 8, width: 30.89, height: 30.89 }}
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 25, marginTop: 6 }}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 16, color: Colors.theme }}>Blood requests</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: Colors.theme }}>See all</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop: 14
    },
    Image: {
        width: 431.69,
        height: 144.41
    },
    LightImage: {
        height: 140, width: 330
    },
    Header: {
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center'
    },
    welcom: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: Colors.Whitebackground
    },
    username: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        color: Colors.Whitebackground
    },
    icons: {
        color: Colors.Whitebackground,
        marginRight: 12
    },
    card: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: 20,
        width: 325,
        height: 103,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        borderRadius: 10
    }


})
export default HomePage;