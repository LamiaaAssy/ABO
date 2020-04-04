import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";
import Colors from '../assets/Colors'




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
        alignSelf: "center"
    },
    text1: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold',
        color: Colors.textCard,
    },
    text2: {
        fontSize: 30,
        fontFamily: 'Roboto-Regular',
        color: Colors.textCard,
    },
    text3: {
        fontSize: 30,
        fontFamily: 'Poppins-Regular',
        color: Colors.textCard,
    }
})