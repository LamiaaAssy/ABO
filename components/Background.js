import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

export default class Background extends Component {

    render() {
        return (
            <ImageBackground source={require('../assets/images/1.png')}
                style={styles.backgroundImage}>
                <View>
                    {this.props.children}
                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
})