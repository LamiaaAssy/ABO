import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }



    render() {
        return (
            <View style={{ backgroundColor: 'yellow', justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>helloooooo</Text>
                <TouchableOpacity>
                    <Text> press me</Text>
                </TouchableOpacity>
            </View>
        )
    }
}