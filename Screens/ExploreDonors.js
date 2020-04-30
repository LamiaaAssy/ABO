import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/Colors'
import { Avatar } from 'react-native-elements';

class ExploreDonners extends Component {
    state = {
        DonorData: [
            {
                id: '1',
                name: 'ahmed mohamed',
                BloodType: 'A+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '2',
                name: 'ahmed mohamed hassan',
                BloodType: 'O-',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '3',
                name: 'samar',
                BloodType: 'AB+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '4',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '5',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
            {
                id: '6',
                name: 'ahmed mohamed ahmed',
                BloodType: 'B+',
                adress: '15, Ramsis st. Cairo',
                photo: require('../assets/images/profile_user.png')
            },
        ]
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.Header}>
                        <Icon
                            name='left'
                            size={40}
                            color={Colors.theme}
                        />
                        <Text style={styles.Headertext}>Explore donners</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.Page}>
                            <FlatList

                                data={this.state.DonorData}
                                renderItem={({ item }) => <View style={styles.DonorCard}>
                                    <View style={styles.cardup}>
                                        <View style={styles.left}>
                                            <Avatar source={item.photo}
                                                size={42}
                                                overlayContainerStyle={{ borderRadius: 10 }}
                                            />
                                            <View style={{ marginLeft: 11 }}>
                                                <Text style={{ color: Colors.theme, fontFamily: 'Montserrat-Bold', fontSize: 12 }}>Donner</Text>
                                                <Text style={{ color: '#7C7C7C', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bloodtypeView}>
                                            <Text style={{ color: Colors.Whitebackground, fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{item.BloodType}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderColor: '#7C7C7C', borderWidth: .23, marginTop: 15.5, marginBottom: 15.5 }}></View>
                                    <View style={styles.cardButtom}>
                                        <View style={styles.left}>
                                            <Icon
                                                name='enviromento'
                                                size={20}
                                                color={'#7C7C7C'}
                                            />
                                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Medium', color: '#7C7C7C', marginLeft: 11.7 }}>{item.adress}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: Colors.Whitebackground }}>Ask for help</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>}
                            />

                        </View>
                    </ScrollView>
                </View>

            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
        padding: 15
    },
    Header: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        height: Dimensions.get("screen").height * 0.1
    },
    Headertext: {
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        color: Colors.theme
    },
    Page: {
        alignItems: 'center',
        marginTop: 14,
    },
    DonorCard: {
        justifyContent: 'space-around',
        padding: 20,
        width: 325,
        height: 143,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        //borderWidth: .23,
        borderRadius: 10,
        marginBottom: 20
    },
    cardup:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    left:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bloodtypeView:
    {
        backgroundColor: Colors.theme,
        borderRadius: 50,
        elevation: 3,
        width: 33,
        height: 33,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardButtom:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button:
    {
        borderRadius: 10,
        backgroundColor: Colors.theme,
        height: 31, width: 122,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 17
    }
})

export default ExploreDonners;