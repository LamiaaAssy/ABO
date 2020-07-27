import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import { calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';
import { getUser } from '../Local-Storage'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Avatar } from 'react-native-elements';
import ImageBackground from '../components/Background';
import Navbar from '../components/NavBar'


export default class Profile extends React.Component {

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
                    bloodType: snapshot.val().bloodType,
                    image: snapshot.val().image,
                    birthday: snapshot.val().birthday,
                    birthmonth: snapshot.val().birthmonth,
                    birthyear: snapshot.val().birthyear
                })
            });
    }



    state = {
        username: '',
        email: '',
        phone: '',
        gender: '',
        bloodType: '',
        birthday: '',
        birthmonth: '',
        birthyear: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                <ImageBackground>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                        {/* start headr */}
                        <View style={styles.headr}>
                            <TouchableOpacity style={styles.headrAssets} >
                                <Image source={require('../assets/images/gear.png')} style={{ height: "100%", width: "100%" }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.headrAssets} onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Image source={require('../assets/images/edit.png')} style={{ height: "100%", width: "100%" }} />
                            </TouchableOpacity>
                        </View>
                        {/* end headr */}


                        <View style={styles.imageContainer}>
                            {this.state.image != null ? <Avatar source={{ uri: this.state.image }} size={140} rounded /> : <Icon2 name='user-circle' color='#48494B' size={90} style={{ color: Colors.LightGray }} />}
                            <Text style={styles.name}> {this.state.username}</Text>
                        </View>

                        <View style={styles.informations}>
                            <View style={styles.left}>
                                <View style={styles.leftInformations}>
                                    <Text style={styles.numbers}>4</Text>
                                    <Text style={styles.leftTitle}>Donated</Text>
                                </View>
                                <View style={styles.leftInformations}>
                                    <Text style={styles.numbers}>12</Text>
                                    <Text style={styles.leftTitle}>Requests</Text>
                                </View>

                            </View>
                            <View style={styles.right}>
                                <Text style={styles.rightText}>Blood Type</Text>
                                <Text style={styles.rightText}>{this.state.bloodType}</Text>
                            </View>

                        </View>
                        <View style={{ height: calcHeight(20), backgroundColor: Colors.Whitebackground, width: "100%" }}>

                        </View>

                        <View style={styles.personalinformations}>

                            <View style={styles.rowContainer}>
                                <Text style={styles.textrow}>
                                    {this.state.email}
                                </Text>
                                <Icon name='envelope-o' size={30} color={Colors.theme} />
                            </View>

                            <View style={styles.rowContainer}>
                                <Text style={styles.textrow}>
                                    {this.state.birthday}th of {this.state.birthmonth}, {this.state.birthyear}
                                </Text>
                                <Icon name='calendar' size={30} color={Colors.theme} />
                            </View>

                            <View style={styles.rowContainer}>
                                <Text style={styles.textrow}>
                                    {this.state.phone}
                                </Text>
                                <Icon name='phone' size={30} color={Colors.theme} />
                            </View>
                        </View>
                        <View style={styles.gender}>
                            <Text style={styles.genderText}>Gender</Text>
                            <View style={styles.genderButtons}>
                                <View style={styles.gendervalue}>
                                    <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>{this.state.gender}</Text>
                                </View >
                            </View>
                        </View>

                    </ScrollView>
                    <View style={{ position: "absolute", bottom: 0, height: !this.state.actionOpen ? calcHeight(90) : calcHeight(310), width: "100%" }}>
                        {/* <Navbar navigation={this.props.navigation} actionOpen={this.state.actionOpen} changeState={() => {
                            this.setState({
                                actionOpen: !this.state.actionOpen
                            })
                        }} /> */}
                    </View>
                </ImageBackground>
            </SafeAreaView >

        )
    }
}

const styles = StyleSheet.create({
    headr: {
        width: '100%',
        height: calcHeight(45),
        marginTop: calcHeight(20),
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "blue",
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(25)
    },
    headrAssets: {
        width: calcWidth(27),
        height: calcHeight(27),
        backgroundColor: Colors.Whitebackground
    },
    imageContainer: {
        height: calcHeight(180),
        width: '100%',
        // backgroundColor: 'yellow',
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 63,
    },
    name: {
        fontSize: calcWidth(16),
        color: '#7C7C7C',
        fontFamily: 'Montserrat-Medium',
        marginTop: calcWidth(7),
        // backgroundColor: "red"
    },
    informations: {
        height: calcHeight(65),
        width: "100%",
        borderTopColor: Colors.Grayborder,
        borderBottomColor: Colors.Grayborder,
        borderTopWidth: calcHeight(1),
        borderBottomWidth: calcHeight(1),
        flexDirection: "row"
    },
    left: {
        // backgroundColor: "red",
        height: "100%",
        width: "50%",
        borderRightColor: Colors.Grayborder,
        borderRightWidth: calcWidth(1),
        flexDirection: "row"
    },
    leftInformations: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "100%",
        // backgroundColor: "pink",

    },
    leftTitle: {
        fontFamily: "Montserrat-Medium",
        fontSize: calcWidth(10),
        color: Colors.DrakText
    },
    numbers: {
        fontFamily: "Montserrat-Bold",
        fontSize: calcWidth(17),
        color: Colors.theme
    },
    right: {
        //backgroundColor: "green",
        height: "100%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    rightText: {
        fontFamily: "Montserrat-Medium",
        fontSize: calcWidth(16),
        color: Colors.DrakText
    },
    ScrollView: {
        paddingBottom: 50,
        paddingHorizontal: 10,

    },
    personalinformations: {
        paddingVertical: calcHeight(20),
        // backgroundColor: "green",

    },
    rowContainer: {
        flexDirection: "row",
        width: "95%",
        height: calcHeight(60),
        alignSelf: "center",
        borderBottomColor: Colors.theme,
        borderBottomWidth: calcHeight(1),
        marginVertical: calcHeight(7),
        backgroundColor: Colors.Whitebackground,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: calcWidth(10),
    },
    textrow: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        fontSize: calcWidth(18),
    },
    gender: {
        marginTop: calcHeight(10),
        height: calcHeight(60),
        width: "100%",
        //backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center"
        paddingHorizontal: calcWidth(20),
    },
    genderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: calcWidth(20),
        color: Colors.theme,
        // marginLeft: calcWidth(30),
        //backgroundColor: "yellow"
    },
    genderButtons: {
        //backgroundColor: "red",
        width: "80%",
        height: "100%",
        //marginLeft: calcWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    gendervalue: {
        backgroundColor: Colors.theme,
        borderRadius: 10,
        elevation: 5,
        height: "75%",
        width: "50%",
        marginLeft: calcWidth(123),
        justifyContent: "center",
        alignItems: "center",
    },
    TouchableEdit: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(25),
        borderRadius: 10,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    }

})

