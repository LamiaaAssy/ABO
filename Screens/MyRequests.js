import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    Dimensions,
    SnapshotViewIOS
} from 'react-native';
import Card from '../components/Cards/MyReqCard';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class MyRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = async () => {
        this.Myrequests()
    }
    Myrequests = async () => {
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
                    for (let index = 0; index < data1.length; index++) {
                        if (auth().currentUser.uid == data1[index]['user_id']) {
                            if (data1[index]['remaining'] > 0) {
                                if (data1[index]['dayCount'] < 7) {
                                    data2.push(data1[index])
                                }
                            }
                        }
                    }
                    this.setState({ requestsID: requestsID1, data: data2 }, () => {
                        if (this.state.data.length == 0) {
                            alert('you do not have any request')
                        }
                    })
                    //console.log('my requests', this.state.data)

                } else {
                    alert('There is no accepted requests yet')
                }
            });
    }
    render() {
        return (
            <SafeAreaView style={styles.container} >
                <Header title={"My requests"} navigation={this.props.navigation} />
                < ScrollView >
                    {/* <Card /> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Card name={item.Patient_name} type={item.BloodTypes[0]} Adress={item.address.text} needsunits={item.BloodbagsNum} requestID={item.requestID} navigation={this.props.navigation} />}
                    />
                </ScrollView>
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
    header:
    {
        flexDirection: 'row',
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(375),
        height: calcHeight(35),
        marginTop: calcHeight(47),
        marginBottom: calcHeight(25),

    },
    backbutton:
    {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(20),
        height: calcHeight(30),
        marginLeft: calcWidth(25),
        alignItems: 'center',

    },
    backicon:
    {

        width: calcWidth(17.61),
        height: calcHeight(32),

    },
    title:
    {
        fontFamily: 'Roboto-Medium',
        fontSize: calcWidth(18),
        color: Colors.theme,
        marginLeft: calcWidth(20.4),

    },

});









{/* start headr */ }
{/* <View style={styles.header}> */ }

{/* back button */ }
{/* <TouchableOpacity style={styles.backbutton}>
                        <Image source={require('../assets/images/right.png')} style={styles.backicon} />
                    </TouchableOpacity> */}

{/* label */ }
{/* <Text style={styles.title}>All blood requests</Text> */ }
{/* end headr */ }
{/* </View> */ }