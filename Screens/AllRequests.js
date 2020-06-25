import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import Card from '../components/Cards/RequestCard';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';

export default class AllRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestsID: [],
            data: [],
            ID_Address: []
        }
    }
    componentDidMount() {
        this.getrequestData()
    }
    getrequestData() {
        console.log("hello from get requestsdata")
        database()
            .ref('BloodRequests/AllRequests')
            .on('value', snapshot => {
                let data1 = []
                let requestsID1 = []
                for (let index = 0; index < Object.keys(snapshot.val()).length; index++) {
                    requestsID1.push(Object.keys(snapshot.val())[index])
                    data1.push(snapshot.val()[requestsID1[index]])
                }
                for (let index = 0; index < requestsID1.length; index++) {
                    data1[index]['requestID'] = requestsID1[index]
                }
                this.setState({ requestsID: requestsID1, data: data1 })
                console.log('data', this.state.data)
            });
    }
    render() {
        //  console.log({ 'data1': this.state.data })
        return (
            <SafeAreaView style={styles.container} >

                <Header title={"All blood requests"} navigation={this.props.navigation} />
                < ScrollView>
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