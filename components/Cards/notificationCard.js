

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Colors from '../../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import { Avatar } from 'react-native-elements';


export default class NotificationCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Notification: styles.Notification,
        }
    }
    componentDidMount = async () => {
        this.notificationView()
    }
    notificationPress = async () => {
        console.log('iddddd', this.props.notificationID)
        database().ref('users/' + auth().currentUser.uid + '/helpRequest/' + this.props.notificationID).update({
            press: true
        })
    }
    notificationView() {
        database().ref('users/' + auth().currentUser.uid + '/helpRequest/' + this.props.notificationID).on('value', snapshot => {
            console.log(this.props.notificationID, snapshot.val().press)
            if (snapshot.val() != null && snapshot.val().press == true) {
                console.log('vvvv', this.props.notificationID)
                this.setState({ Notification: styles.pressedNotification })
            }
        })
    }
    render() {
        return (
            <View style={styles.NotificationCard}>

                <TouchableOpacity style={styles.cardup}
                    onPress={() => { this.notificationPress() }}>
                    <View style={this.state.Notification}>
                        <Avatar source={{ uri: this.props.photo }}
                            size={70}
                            rounded
                            // backgroundColor="blue"
                            marginLeft={calcWidth(20)}
                            overlayContainerStyle={{ borderRadius: 70 }}
                        />
                        <View style={{ marginLeft: calcWidth(15), flex: 1, paddingBottom: calcHeight(15) }}>
                            <View style={styles.right}>
                                <Text style={{ marginBottom: calcHeight(20), color: "#29304D", fontFamily: 'Roboto-Regular', fontWeight: 'bold', fontSize: calcWidth(14) }} numberOfLines={2}>{this.props.name} asked your help, tap here to send her message to send her message</Text>

                            </View>
                            <Text style={{ color: '#ABABAB', fontFamily: 'Montserrat-Medium', fontSize: calcWidth(12) }}>{this.props.time}</Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>

        )
    }
}
const styles = StyleSheet.create({
    NotificationCard: {
        width: "100%",
        height: calcHeight(100),
        marginBottom: calcHeight(5),

    },
    cardup:
    {
        flex: 1,
    },
    right:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: calcHeight(30),

    },
    Notification:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: "#F5F5F5",
        backgroundColor: Colors.LightGray
    },
    pressedNotification:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: "#F5F5F5",
        backgroundColor: "#F5F5F5"
    },
});