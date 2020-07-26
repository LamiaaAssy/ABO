import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    SafeAreaView
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import Icon2 from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import Navbar from '../components/NavBar'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import ImageBackground from '../components/Background'

export default class Covid extends Component {
    constructor(props) {
        super(props)
        this.state = {


        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                {/* start headr */}
                <Header title={"Covid-19"} navigation={this.props.navigation} />

                <View style={{ flex: 1 }}>
                    <ImageBackground>
                        <View style={{ height: 100, width: "100%", justifyContent: "center", marginTop: calcHeight(20) }}>
                            <Text style={styles.Text}>we are all in this together ♥️</Text>
                        </View>
                        <View style={styles.subView}>
                            <TouchableOpacity style={styles.Touchable} onPress={() => this.props.navigation.navigate('BeDonor')}>
                                <Image
                                    style={{ height: "100%", width: "100%" }}
                                    source={require('../assets/images/corona-2.png')}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Touchable} onPress={() => this.props.navigation.navigate('RequestBlazma')}>
                                <Image
                                    style={{ height: "100%", width: "100%" }}
                                    source={require('../assets/images/corona-1.png')}
                                    resizeMode="cover"
                                />
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </View>

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    subView: {
        height: calcHeight(330),
        marginTop: calcHeight(20),
        width: "100%",
        alignSelf: "center",
        justifyContent: "space-around",
        alignItems: "center",

    },
    Text: {
        fontSize: calcWidth(20),
        color: Colors.theme,
        fontFamily: 'Montserrat-Bold',
        alignSelf: "center",

    },
    Touchable: {
        backgroundColor: Colors.Whitebackground,
        height: "45%",
        width: "90%",
        //marginBottom: calcHeight(40),
        borderRadius: 5,
        elevation: 3
    }
})