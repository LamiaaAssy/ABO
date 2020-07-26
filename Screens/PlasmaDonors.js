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
import Card from '../components/Cards/RequestCard';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Colors from '../assets/Colors';
import Header from '../components/Header';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { sin, pow, cos, tan } from 'react-native-reanimated';
import ImageBackground from '../components/Background';

export default class PlasmaDonors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestsID: [],
            data: [],
            ID_Address: [],
            matchedRequests: [],//Blood type
            matchedRequests2: [],//place
            user_LatLon: '',
            acceptedID: [],
        }
    }
    componentDidMount = async () => {
        this.getrequestData()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header title={"All Donors"} navigation={this.props.navigation} />
                <ImageBackground>
                    
                </ImageBackground>

            </SafeAreaView>
        )
    }
}