import React, { Component } from 'react';
import { StyleSheet, View, Text } from "react-native";




export default class Init extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }



    render(){
        return(
            <View style={styles.container}>
                <Text>Hello In Our Project</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red",
        justifyContent:"center",
        alignItems:"center"
    }
})