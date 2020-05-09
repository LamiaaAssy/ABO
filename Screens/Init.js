import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Header from '../components/Header';




export default class Init extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textcontainer}>
                    <Text style={styles.text1}>Test Montserrat Bold</Text>
                    <Text style={styles.text2}>Test Roboto Regular</Text>
                    <Text style={styles.text3}>Test Poppins Regular</Text>
                </View>
                <TouchableOpacity style={styles.touchable}>
                    <Text>TEST</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center"
    },
    textcontainer: {
        height: 200,
        width: 400,
        backgroundColor: Colors.Whitebackground,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        elevation: 5,
    },
    text1: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        color: '#7C7C7C',
    },
    text2: {
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
        color: '#7C7C7C',
    },
    text3: {
        fontSize: 30,
        fontFamily: 'Poppins-Regular',
    },
       
    touchable: {
        marginTop: calcHeight(45),
        height: calcHeight(49),
        width: calcWidth(325),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gold",
        elevation: 5,

    }
})





