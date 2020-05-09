import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
} from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';


export default class ChatView extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                </View>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.theme,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:
    {
        width: calcWidth(250),
        height: calcHeight(300),


    }
})

