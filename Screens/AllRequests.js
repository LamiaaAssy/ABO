import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import Card from '../components/Cards/RequestCard';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';


export default class AllRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    name: 'Mohamed Adel Ahmed',
                    type: 'A+',
                    adress: '15, Ramsis st. Cairo',
                    needsunits: '9 units',

                },

                {
                    name: 'Mohamed Adel Ahmed',
                    type: 'A+',
                    adress: '15, Ramsis st. Cairo',
                    needsunits: '9 units',

                },
                {
                    name: 'Mohamed Adel Ahmed',
                    type: 'A+',
                    adress: '15, Ramsis st. Cairo',
                    needsunits: '9 units',

                },
                {
                    name: 'Mohamed Adel Ahmed',
                    type: 'A+',
                    adress: '15, Ramsis st. Cairo',
                    needsunits: '9 units',

                },

            ]
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container} >

                <Header title={"All blood requests"} navigation={this.props.navigation} />
                < ScrollView>

                    {/* <Card /> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Card name={item.name} type={item.type} Adress={item.adress} needsunits={item.needsunits} />}
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