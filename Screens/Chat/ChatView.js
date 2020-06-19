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



export default class ChatView extends Component {

    state = {
        message: '',
        flag: true,
    };

    componentDidMount() {
        this.setState({
            messages: [

                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },


            ],
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }


    onChangeText = message => this.setState({ message });


    render() {
        function renderSend(props) {
            return (
                <Send {...props}>
                    <IconButton icon='send-circle' size={25} color='#FD554F' style={{ alignSelf: 'center', justifyContent: 'center' }} />
                </Send>
            );
        }
        function renderBubble(props) {
            return (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: '#FD554F',
                            //elevation: 1,
                        }
                    }}
                    textStyle={{
                        right: {
                            color: '#FFFFFF'

                        }
                    }}
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

                <Header navigation={this.props.navigation} whiteHeader
                    newComponent={
                        <View style={{ flexDirection: 'row' }}>
                            <View >
                                <Text style={styles.name} numberOfLines={1}>Lamiaa Hamdy</Text>
                            </View>
                            <View style={{ alignItems:'flex-end'}}>
                                {this.state.flag == false ?


                                    <TouchableOpacity style={styles.confirmbutton} onPress={() => this.setState({ flag: true })}>
                                        <Text style={styles.confirm}>Confirm donation</Text>
                                        <Image source={require('../../assets/images/tick.png')} style={styles.confirmicon} />
                                    </TouchableOpacity>

                                    :

                                    <View style={{marginLeft:calcWidth(90), flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity>
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
                        _id: 1,
                        _id: 2,
                    }}
                    showUserAvatar
                    placeholder='Add text to this message ... '
                    placeholderTextColor={Colors.DarkGray}
                    multiline
                    onChangeText={this.onChangeText}
                    value={this.state.message}
                    alwaysShowSend
                    renderSend={renderSend}
                    renderBubble={renderBubble}
                    renderLoading={renderLoading}


                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground ,

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
    confirm:
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



