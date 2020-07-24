import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    SafeAreaView
} from 'react-native';
import { Badge, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import ImageBackground from '../components/Background'

export default class BeDonor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked1: false,
            checked2: false,
            checked3: false,
            username: '',
            email: "",
            phone: "",
            gender: "",
            bloodType: "",
            address: "",
            image: ''
        }
    }
    addDonor = async () => {

        if (this.state.checked1 == true && this.state.checked2 == true && this.state.checked3 == true) {
            database().ref('users/' + auth().currentUser.uid + '/informations/').on('value', snapshot => {

                if (snapshot.val().bloodType == "A+" || snapshot.val().bloodType == "A-") {
                    this.setState({ bloodType: "A" })
                }
                else if (snapshot.val().bloodType == "B+" || snapshot.val().bloodType == "B-") {
                    this.setState({ bloodType: "B" })
                }
                else if (snapshot.val().bloodType == "O+" || snapshot.val().bloodType == "O-") {
                    this.setState({ bloodType: "O" })
                }
                else if (snapshot.val().bloodType == "AB+" || snapshot.val().bloodType == "AB-") {
                    this.setState({ bloodType: "AB" })
                }
                if (snapshot.val().image != null) {
                    this.setState({ image: snapshot.val().image })
                }
                this.setState({
                    username: snapshot.val().name,
                    email: auth().currentUser.email,
                    phone: snapshot.val().phone,
                    gender: snapshot.val().gender,
                    address: snapshot.val().address,
                    last_donation: snapshot.val().last_donation,
                    next_donation: snapshot.val().next_donation

                }, () => {
                    database().ref('PlasmaDonors/' + auth().currentUser.uid + '/informations').set({
                        name: this.state.username,
                        phone: this.state.phone,
                        address: this.state.address,
                        bloodType: this.state.bloodType,
                        gender: this.state.gender,
                        last_donation: this.state.last_donation,
                        next_donation: this.state.last_donation
                    })
                })

                console.log("data ", this.state.username, "==", this.state.phone, "==", this.state.gender, "==",
                    this.state.bloodType, "==", this.state.address, "==", this.state.last_donation)

            })

        }
        else {
            this.setState({ erorr: "You have to Confirm all condition !..." })
        }


    }
    getUser() {
        database().ref('users/' + auth().currentUser.uid + '/informations/').on('value', snapshot => {
            let name = snapshot.val().name;
            let blood = snapshot.val().bloodType;
            this.setState({ name: name, blood: blood });
        });

    }

    componentDidMount() {
        this.getUser();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                {/* start headr */}
                <Header title={"Be a Donor"} navigation={this.props.navigation} />
                <ImageBackground>
                    <View style={styles.personaldata}>

                        <View style={styles.row}>


                            <Text style={styles.rowText}>Donor Name:  "{this.state.name}"</Text>
                            <Icon
                                name='user'
                                size={24}
                                color={Colors.theme}
                                style={{ marginBottom: calcHeight(7.5) }}
                            />
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.rowText}>bloodType:   "{this.state.blood}"</Text>
                            <Icon2
                                name='blood-drop'
                                size={24}
                                color={Colors.theme}
                                style={{ marginBottom: calcHeight(7.5) }}
                            />
                        </View>

                    </View>

                    <Text style={styles.confirm}>PLease confirm that : </Text>

                    <CheckBox
                        title='I am recovered from the Covid-19 virus'
                        textStyle={styles.checkText}
                        checked={this.state.checked1}
                        checkedColor={Colors.theme}
                        onPress={() => this.setState({ checked1: !this.state.checked1 })}
                    />
                    <CheckBox
                        title='More than a month has passed since I recovered from the virus'
                        textStyle={styles.checkText}
                        checked={this.state.checked3}
                        checkedColor={Colors.theme}
                        onPress={() => this.setState({ checked3: !this.state.checked3 })}
                    />
                    <CheckBox
                        title='I will donate my blood plasma for free'
                        textStyle={styles.checkText}
                        checked={this.state.checked2}
                        checkedColor={Colors.theme}
                        onPress={() => this.setState({ checked2: !this.state.checked2 })}
                    />
                    {this.state.erorr ?
                        <Text style={styles.error}>{this.state.erorr}</Text>
                        :
                        <View></View>
                    }

                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={styles.RequestButton}
                            onPress={() => this.addDonor().then(this.props.navigation.navigate('HomePage'))}>
                            <Text style={{
                                fontSize: calcWidth(18), color: Colors.Whitebackground,
                                fontFamily: 'Montserrat-Medium'
                            }}>Submit</Text>
                        </TouchableOpacity>
                    </View>



                </ImageBackground>


            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    subView: {
        height: calcHeight(350),
        width: "100%",
        alignSelf: "center",
        backgroundColor: Colors.Whitebackground,
        justifyContent: "center",
        alignItems: "center",
    },
    Touchable: {
        backgroundColor: Colors.theme,
        height: calcHeight(150),
        width: "90%",
        marginBottom: calcHeight(40),
        borderRadius: 5,
        elevation: 3
    },
    personaldata: {
        //backgroundColor: "green",
        width: "100%",
        // height: calcHeight(100),
        paddingTop: 20,
        alignItems: "center",
        marginTop: calcHeight(40)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        height: calcHeight(26.5),
        borderBottomWidth: 1,
        borderBottomColor: Colors.theme,
        marginLeft: calcWidth(10),
        marginBottom: calcHeight(30.5),
        paddingHorizontal: calcWidth(15)
    },
    rowText: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Bold',
        marginBottom: calcHeight(7.5)
    },
    checkText: {
        fontSize: calcWidth(14),
        color: Colors.BlackText,
        fontFamily: 'Montserrat-Medium'
    },
    confirm: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Bold',
        marginBottom: calcHeight(25),
        marginLeft: calcWidth(10)
    },
    error: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Bold',
        marginTop: calcHeight(25),
        marginLeft: calcWidth(30)
    },
    RequestButton: {
        backgroundColor: Colors.theme,
        borderRadius: 13,
        width: calcWidth(325),
        height: calcHeight(49),
        alignItems: "center",
        justifyContent: "center",
        marginTop: calcHeight(45),
        elevation: 5
    }

})