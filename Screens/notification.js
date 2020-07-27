import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    FlatList,
    Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Icon from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import NotificationCard from '../components/Cards/notificationCard';
import ImageBackground from '../components/Background';

export default class notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = async () => {
        this.getRequest()
        //console.log("iddddd", auth().currentUser.uid)
    }
    getRequest = async () => {
        database()
            .ref('users/' + auth().currentUser.uid + '/helpRequest')
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    //console.log('help requests')
                    let dbData = []
                    let notificationID = Object.keys(snapshot.val())
                    let d = []//senderID
                    for (let index = 0; index < notificationID.length; index++) {
                        d.push(snapshot.val()[notificationID[index]]['senderId'])
                    }
                    //console.log('ddd', d)
                    this.setState({ senderId: d }, () => {
                        for (let i = 0; i < this.state.senderId.length; i++) {
                            database()
                                .ref('users/' + this.state.senderId[i] + '/informations')
                                .on('value', snapshot => {
                                    console.log('User data ', snapshot.val());
                                    dbData.push({ 'name': snapshot.val().name, 'time': 'just now', 'photo': snapshot.val().image, 'notificationID': notificationID[i], 'senderId': this.state.senderId[i] })
                                    //console.log(dbData)
                                    this.setState({
                                        data: dbData
                                    })
                                    //console.log(this.state.data)
                                });
                        }
                    })
                } else {
                    alert('You do not have any notification yet')
                }

            });
    }
    render() {
        //console.log(this.state.data)
        return (
            <SafeAreaView style={styles.container} >
                <ImageBackground>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Header title={"Notification"} navigation={this.props.navigation} />
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView} >

                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <NotificationCard photo={item.photo} name={item.name} time={item.time} navigation={this.props.navigation} notificationID={item.notificationID} senderId={item.senderId} />}
                            />

                        </ScrollView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.Graybackground,
    },
    Page: {
        marginTop: calcHeight(14),
        height: calcHeight(720)

    },
    ScrollView: {
        marginTop: 30,
        paddingBottom: 200,
    },
});