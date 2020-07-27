import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';

import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { sin, pow, cos, tan } from 'react-native-reanimated';
import ImageBackground from '../components/Background'
import Card from '../components/Cards/ExploreDonnerCard';

export default class PlasmaDonors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            donors: [],
            bloodMatched: [],
            addressMatched: [],
            final: []
        }
    }
    componentDidMount = async () => {
        this.getDonorsData()
    }
    getDonorsData() {
        const rootRef = database().ref('PlasmaDonors/')
        rootRef.on("value", snap => {
            const foo = snap.val();
            //alert(JSON.stringify(foo))
            if (foo !== null) {
                let data = []
                //make init for array before the loop
                Object.keys(foo).forEach(key => {
                    //this is loop
                    // The ID is the key
                    console.log(key);
                    // The Object is foo[key]
                    console.log(foo[key]);
                    let singleObject = foo[key]
                    // alert(JSON.stringify(singleObject.price))
                    let singleData = {
                        id: key,
                        informations: singleObject.informations,
                    }
                    //push to array here the new object
                    if (key != auth().currentUser.uid) {
                        data.push(singleData) //wrong   
                    }
                });
                this.setState({ donors: data }, () => {
                    console.log("fisrt list from data base ==>", this.state.donors)
                    this.BloodMatching()
                })
            }
        });
    }

    BloodMatching = async () => {
        console.log("hiiiiiiiiii")
        console.log("blood request ==>", this.props.navigation.state.params.blood)
        for (let x = 0; x < this.state.donors.length; x++) {
            console.log("blood ==>", this.state.donors[x].informations.bloodType)
            for (let y = 0; y < this.props.navigation.state.params.blood.length; y++) {
                if (this.state.donors[x].informations.bloodType == this.props.navigation.state.params.blood[y]) {
                    this.state.bloodMatched.push(this.state.donors[x])
                }
            }
        }
        console.log("matched blood ==> ", this.state.bloodMatched)
        this.AddressMatchin()
    }
    AddressMatchin = async () => {
        console.log("gfcvghbjknml===>", this.props.navigation.state.params.reqlat, this.props.navigation.state.params.reqlon)
        let req_LatLon = { lat: this.props.navigation.state.params.reqlat, lon: this.props.navigation.state.params.reqlon }
        this.setState({ req_LatLon: req_LatLon })
        for (let index = 0; index < this.state.bloodMatched.length; index++) {
            this.state.addressMatched.push({
                'user_id': this.state.bloodMatched[index].id,
                'image': this.state.bloodMatched[index].image,
                'BloodType': this.state.bloodMatched[index].informations.bloodType,
                'name': this.state.bloodMatched[index].informations.name,
                'mobile': this.state.bloodMatched[index].informations.phone,
                'address': this.state.bloodMatched[index].informations.address.text,
                'lat': this.state.bloodMatched[index].informations.address.lat,
                'lon': this.state.bloodMatched[index].informations.address.lon,
                'latDef': Math.abs(req_LatLon.lat - this.state.bloodMatched[index].informations.address.lat),
                'lonDef': Math.abs(req_LatLon.lon - this.state.bloodMatched[index].informations.address.lon)
            })
        }


        console.log("addrres matching before sorting=== >", this.state.addressMatched)

        let Outcomes = []
        for (let x = 0; x < this.state.addressMatched.length; x++) {
            console.log("dakhaltttt ???")
            let a = Math.pow(Math.sin(this.state.addressMatched[x].latDef / 2), 2) + Math.cos(req_LatLon.lat) * Math.cos(this.state.addressMatched[x].lat) * Math.pow(Math.sin(this.state.addressMatched[x].lonDef / 2), 2)
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            Outcomes.push({
                'BloodType': this.state.addressMatched[x].BloodType,
                'name': this.state.addressMatched[x].name,
                'image': this.state.addressMatched[x].image,
                'number': this.state.addressMatched[x].mobile,
                'user_id': this.state.addressMatched[x].user_id,
                'address': this.state.addressMatched[x].address,
                'Outcome': c
            })
        }
        Outcomes.sort(function (a, b) {
            return a.Outcome - b.Outcome;
        })
        console.log("outcomes ==> ", Outcomes)
        this.setState({ final: Outcomes, empty: false }, () => {
            console.log("final final ===>", this.state.final)
            if (Outcomes.length == 0) {
                this.setState({ empty: true })
            }
        })


    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header title={"All Donors"} navigation={this.props.navigation} />
                <ImageBackground>
                    < ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}  >

                        {this.state.empty == true ?
                            <View style={{ height: 350, width: 300, alignSelf: "center" }}>
                                <Image
                                    style={{ height: "100%", width: "100%" }}
                                    source={require('../assets/images/Donors.png')}
                                    resizeMode="cover"
                                />
                            </View>
                            :
                            <FlatList
                                data={this.state.final}
                                renderItem={({ item }) => <Card useId={item.user_id} name={item.name} user_id={item.user_id} image={item.image} BloodType={item.BloodType} adress={item.address} navigation={this.props.navigation} />}
                            />}

                    </ScrollView>
                </ImageBackground>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
        paddingBottom: 15
    },
    ScrollView: {
        marginTop: 30,
        paddingBottom: 50,
        alignItems: "center"
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