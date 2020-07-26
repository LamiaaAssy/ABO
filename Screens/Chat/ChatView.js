import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import Header from '../../components/Header';
import { IconButton } from 'react-native-paper';
import call from 'react-native-phone-call';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { sendPushNotification } from '../../PushNotification';
import { getUser } from '../../Local-Storage';


export default class ChatView extends Component {

    state = {
        message: '',
        flag: true,
        myId: auth().currentUser.uid,
        ChatId: null,
        anotherUserId: null,
        mobile_number: '',
        anotherUsername: '',
    };

    componentDidMount() {

        let { myId } = this.state
        let ChatId = this.props.navigation.getParam('ChatId')

        database()
            .ref('/Chat/' + ChatId)
            .on('value', snapshot => {

                if (snapshot.val().user1 == myId) {
                    this.setState({ anotherUserId: snapshot.val().user2 }, () => {
                        this.setState({ messages: snapshot.val().messages ? snapshot.val().messages : [], ChatId: ChatId }
                            , () => {
                                database().ref('users/' + this.state.anotherUserId + '/informations').on('value', snapshot => {
                                    this.setState({

                                        mobile_number: snapshot.val().phone,
                                        anotherUsername: snapshot.val().name,

                                    })
                                })
                            })
                    })


                }
                else
                    this.setState({ anotherUserId: snapshot.val().user1 }, () => {
                        this.setState({ messages: snapshot.val().messages ? snapshot.val().messages : [], ChatId: ChatId }
                            , () => {
                                database().ref('users/' + this.state.anotherUserId + '/informations').on('value', snapshot => {
                                    this.setState({

                                        mobile_number: snapshot.val().phone,
                                        anotherUsername: snapshot.val().name,

                                    })
                                })
                            })
                    })




            });

    }
    onSend(messages = []) {

        let x = this.state.messages
        let newMessage = messages[0]
        newMessage['createdAt'] = messages[0].createdAt.toString()
        console.log('neeeeeeeew :  ', newMessage)
        x.push(newMessage);

        database().ref('users/' + auth().currentUser.uid + '/informations').once("value", snapshot => {
            const object = snapshot.val()
            console.log("object : ", object)
            sendPushNotification(this.state.anotherUserId, object.name, messages[0].text)
        })

        const newReference = database()
            .ref('/Chat/' + this.state.ChatId + '/messages')
            .set(x);

    }

    onChangeText = message => this.setState({ message });
    callPatient() {
        const args = {
            number: this.state.mobile_number,
            prompt: false
        }

        call(args).catch(console.error)
    }
    confirmDonation() {
        this.setState({ flag: true })
        let d = new Date().getDate() //To get the Current Date
        let m = new Date().getMonth() + 1 //To get the Current Date
        let y = new Date().getFullYear() //To get the Current Date
        let Nm = m, Ny = y
        database().ref('users/' + auth().currentUser.uid + '/informations/gender').on('value', snapshot => {
            //console.log('gender', snapshot.val())
            this.setState({ gender: snapshot.val() }, () => {
                //console.log('stategender', this.state.gender)
                if (this.state.gender == 'male') {
                    for (let index = 0; index < 4; index++) {
                        if (Nm == 12) {
                            Nm = 1,
                                Ny++
                        } else {
                            Nm++
                        }

                    }
                } else if (this.state.gender == 'female') {
                    for (let index = 0; index < 6; index++) {
                        if (Nm == 12) {
                            Nm = 1,
                                Ny++
                        } else {
                            Nm++
                        }
                    }
                }
                //console.log('Nm', Nm, '////', 'Ny', Ny)
                database().ref('users/' + auth().currentUser.uid + '/informations').update({
                    last_donation: {
                        day: d,
                        month: m,
                        year: y
                    },
                    next_donation: {
                        day: d,
                        month: Nm,
                        year: Ny
                    }
                })
            })

        })
    }
    render() {
        function renderSend(props) {
            return (
                <Send {...props}>
                    <IconButton icon='send-circle' size={25} color='#D40E04' style={{ alignSelf: 'center', justifyContent: 'center' }} />
                </Send>
            );
        }
        function renderBubble(props) {
            return (
                <Bubble
                    {...props}
                    wrapperStyle={{

                        right: {
                            backgroundColor: '#D40E04',
                            elevation: 1,
                            marginTop: calcHeight(5),
                        },
                        left: {
                            elevation: 1,
                            marginTop: calcHeight(5),
                        }
                    }}
                    textStyle={{
                        right: {
                            color: '#FFFFFF'

                        }
                    }}
                    style={{ marginTop: 500 }}
                />
            );
        }
        function renderLoading() {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#6646ee' />
                </View>
            );
        }

        return (
            <SafeAreaView style={styles.container}>
                <Header navigation={this.props.navigation} 
                    newComponent={
                        <View style={{ flexDirection: 'row' }}>
                            <View >
                                <Text style={styles.name} numberOfLines={1}>{this.state.anotherUsername}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                {this.state.flag == false ?

                                    <View>
                                        <TouchableOpacity style={styles.confirmbutton} onPress={() => { this.confirmDonation() }}>
                                            <Text style={styles.text}>Confirm donation</Text>
                                            <Image source={require('../../assets/images/tick.png')} style={styles.confirmicon} />
                                        </TouchableOpacity>
                                    </View>
                                    :

                                    <View style={{ marginLeft: calcWidth(90), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.callPatient()}>
                                            <Image source={require('../../assets/images/call.png')} style={styles.callicon} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.setState({ flag: false })}>
                                            <Image source={require('../../assets/images/more.png')} style={styles.moreicon} />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>

                    }

                />

                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.myId,
                        _id: this.state.anotherUserId,
                    }}
                    //showUserAvatar
                    placeholder='Add text to this message ... '
                    placeholderTextColor={Colors.DarkGray}
                    multiline
                    onChangeText={this.onChangeText}
                    value={this.state.message}
                    alwaysShowSend
                    renderSend={renderSend}
                    renderBubble={renderBubble}
                    renderLoading={renderLoading}
                    inverted={false}


                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,

    },
    name:
    {
        color: Colors.Whitebackground,
        fontSize: calcWidth(20),
        fontFamily: 'Roboto-Medium',
        width: calcWidth(160),
        marginBottom: calcHeight(8),

    },
    confirmbutton:
    {
        width: calcWidth(147),
        height: calcHeight(32),
        backgroundColor: Colors.Whitebackground,
        borderRadius: 15,
        elevation: 1,
        marginLeft: calcWidth(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cancelbutton:
    {
        width: calcWidth(147),
        height: calcHeight(32),
        backgroundColor: Colors.Whitebackground,
        borderRadius: 15,
        elevation: 1,
        marginLeft: calcWidth(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: calcHeight(8),

    },
    text:
    {
        color: Colors.theme,
        fontSize: calcWidth(12),
        fontFamily: 'Montserrat-Medium',

    },
    confirmicon:
    {
        height: calcHeight(9.06),
        width: calcWidth(11.53),
        marginLeft: calcWidth(4.88),
        
    },
    sendbox:
    {
        flexDirection: 'row',
        alignItems: 'center',
        height: calcHeight(73),
        width: calcWidth(375),
        backgroundColor: Colors.Whitebackground,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: Colors.shadow,
        borderBottomColor: Colors.shadow,
        position: 'absolute',
        bottom: 0,
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    plus:
    {
        color: Colors.DarkGray,
        fontSize: calcWidth(20),
        marginLeft: calcWidth(21),
    },
    messageInput:
    {
        fontSize: calcWidth(14),
        fontFamily: 'Montserrat-Regular',
        color: Colors.DarkGray,
        marginLeft: calcWidth(17),
        width: calcWidth(270),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.shadow,
        paddingHorizontal: calcWidth(10),
    },
    sendicon:
    {
        height: calcHeight(17.98),
        width: calcWidth(20.87),
    },
    send:
    {
        color: Colors.theme,
        fontSize: calcWidth(11),
        fontFamily: 'Roboto-Regular',
        marginTop: calcHeight(5),

    },
    callicon:
    {
        width: calcWidth(22.78),
        height: calcHeight(22.78),
        marginLeft: calcWidth(5),
    },
    moreicon:
    {
        width: calcWidth(5.52),
        height: calcHeight(24.86),
        marginLeft: calcWidth(21),
        marginRight: calcWidth(20),
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})



