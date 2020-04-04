import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";




export default class Init extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>Test Montserrat Bold</Text>
                <Text style={styles.text2}>Test Roboto Regular</Text>
                <Text style={styles.text3}>Test Poppins Regular</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    text1: {
        fontSize: 30,
        fontFamily: 'Montserrat-Bold'
    },
    text2: {
        fontSize: 30,
        fontFamily: 'Roboto-Regular'
    },
    text3: {
        fontSize: 30,
        fontFamily: 'Poppins-Regular'
    }
})