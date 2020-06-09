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
import Header from '../components/Header';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';

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

                    <Header title={"Explore donners"} navigation={this.props.navigation} />

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
                                            <View style={{ marginLeft: calcWidth(11) }}>
                                                <Text style={{ color: Colors.theme, fontFamily: 'Montserrat-Bold', fontSize: calcWidth(12) }}>Donner</Text>
                                                <Text style={{ color: Colors.textCard, fontFamily: 'Montserrat-Medium', fontSize: calcWidth(12) }}>{item.name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.bloodtypeView}>
                                            <Text style={{ color: Colors.Whitebackground, fontSize: calcWidth(12), fontFamily: 'Montserrat-SemiBold' }}>{item.BloodType}</Text>
                                        </View>
                                    </View>
                                    <View style={{ borderColor: Colors.textCard, borderWidth: calcWidth(.23), marginTop: calcHeight(15.5), marginBottom: calcHeight(15.5) }}></View>
                                    <View style={styles.cardButtom}>
                                        <View style={styles.left}>
                                            <Icon
                                                name='enviromento'
                                                size={20}
                                                color={Colors.textCard}
                                            />
                                            <Text style={{ fontSize: calcWidth(12), fontFamily: 'Montserrat-Medium', color: Colors.textCard, marginLeft: calcWidth(11.7) }}>{item.adress}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.button}>
                                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: calcWidth(13), color: Colors.Whitebackground }}>Ask for help</Text>
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
        // padding: 15
    },
    Header: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        //height: Dimensions.get("screen").height * 0.1
    },
    Headertext: {
        fontSize: calcWidth(18),
        fontFamily: 'Roboto-Medium',
        color: Colors.theme
    },
    Page: {
        alignItems: 'center',
        marginTop: calcHeight(14),
    },
    DonorCard: {
        justifyContent: 'space-around',
        paddingHorizontal: calcWidth(20),
        paddingVertical: calcHeight(20),
        width: calcWidth(325),
        height: calcHeight(143),
        backgroundColor: Colors.Whitebackground,
        borderWidth: calcWidth(1),
        borderColor: Colors.Border,
        borderRadius: 15,
        elevation: 1.5,
        marginBottom: calcHeight(20),
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
        width: calcHeight(33),
        height: calcHeight(33),
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
        height: calcHeight(31),
        width: calcWidth(122),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: calcWidth(17),
    },
})

export default ExploreDonners;