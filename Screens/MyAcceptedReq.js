import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    Text,
    Image,
} from 'react-native';
import MyAcceptedReqCard from '../components/Cards/MyAcceptedReqCard';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ImageBackground from '../components/Background';

export default class MyAcceptedReq extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestsID: [],
            data: [],
            AcceptedReq: [],

        }
    }
    componentDidMount = async () => {
        this.getrequestData()
        //this.get_AcceptedReq()

    }
    getrequestData = async () => {
        // console.log("hello from get requestsdata")
        database()
            .ref('BloodRequests/AllRequests')
            .on('value', snapshot => {
                let data1 = [], data2 = []
                let requestsID1 = []
                if (snapshot.val() != null) {
                    for (let index = 0; index < Object.keys(snapshot.val()).length; index++) {
                        requestsID1.push(Object.keys(snapshot.val())[index])
                        data1.push(snapshot.val()[requestsID1[index]])
                    }
                    for (let index = 0; index < requestsID1.length; index++) {
                        data1[index]['requestID'] = requestsID1[index]
                    }
                    this.setState({ requestsID: requestsID1, data: data1, empty: false }, () => { this.get_AcceptedReq() })

                } else {
                    // alert('There is no accepted requests yet')
                    this.setState({ empty: true })
                }
            });
    }
    get_AcceptedReq() {
        database()
            .ref('users/' + auth().currentUser.uid + '/AcceptedReq')
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    let AcceptedReq_ID = Object.keys(snapshot.val())
                    let AcceptedReq_Data = []
                    // console.log('request acc id', AcceptedReq_ID)
                    for (let x = 0; x < AcceptedReq_ID.length; x++) {
                        for (let y = 0; y < this.state.data.length; y++) {
                            if (AcceptedReq_ID[x] == this.state.data[y]['requestID']) {
                                AcceptedReq_Data.push(this.state.data[y])
                            }
                        }
                    }
                    this.setState({ AcceptedReq: AcceptedReq_Data })
                } else {
                    // alert('There is no accepted requests yet')
                    this.setState({ empty: true })
                }

            });
    }
    render() {
        return (
            <SafeAreaView style={styles.container} >

                <Header title={"Accepted Requests"} navigation={this.props.navigation} />
                <ImageBackground>
                <View style={styles.massage}>
                    <Text style={styles.title}> Please, Be carfull ! </Text>
                    <Text style={styles.subtitle}> You have to press Done after the donation in the hospital, you can't ignore the request after pressing Done!</Text>
                </View>
                < ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView} >
                    {/* <Card /> */}
                    {this.state.empty == true ?
                        <View style={{ height: 350, width: 300, alignSelf: "center" }}>
                            <Image
                                style={{ height: "100%", width: "100%" }}
                                source={require('../assets/images/Notaccepted-req.png')}
                                resizeMode="cover"
                            />
                        </View>
                        :
                        <FlatList
                            data={this.state.AcceptedReq}
                            renderItem={({ item }) => <MyAcceptedReqCard name={item.Patient_name} type={item.BloodTypes[0]} Adress={item.address.text} needsunits={item.BloodbagsNum} requestID={item.requestID} navigation={this.props.navigation} />}
                        />
                    }

                </ScrollView>
                </ImageBackground>
            </SafeAreaView >

        );
    }
}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
        paddingBottom: 15
    },
    massage: {

        width: "97%",
        height: calcHeight(95),
        marginTop: calcHeight(15),
        alignSelf: "center",
        //backgroundColor: "yellow",
        paddingHorizontal: calcWidth(10),
        paddingVertical: calcHeight(10),
        justifyContent: "center",
        borderRadius: 1,
        elevation: 2


    },
    ScrollView: {
        marginTop: 30,
        paddingBottom: 50,
        backgroundColor: Colors.Whitebackground,
    },
    title: {
        color: "#E00808",
        fontFamily: 'Montserrat-Bold',
        fontSize: calcWidth(15),
        paddingBottom: calcHeight(5)
    },
    subtitle: {
        marginLeft: calcWidth(10),
        color: Colors.textCard,
        fontFamily: 'Montserrat-Medium',
        fontSize: calcWidth(13),
    },
});