import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Header } from 'react-native-elements';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';



export default class ChatView extends Component {

    state = {
        message: '',
        flag: true,
        messages: [],
    };
    onChangeText = message => this.setState({ message });

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* start body */}
                {/* start header */}
                <Header
                    containerStyle={styles.header}
                    placement="left"
                    leftComponent=
                    {
                        <TouchableOpacity style={styles.backbutton}>
                            <Image source={require('../../assets/images/right-white.png')} style={styles.backicon} />
                        </TouchableOpacity>
                    }
                    centerComponent=
                    {
                        <View >
                            <Text style={styles.name} numberOfLines={1}>Lamiaa Hamdy</Text>
                        </View>
                    }
                    rightComponent=
                    {

                        this.state.flag == false ?

                            <TouchableOpacity style={styles.confirmbutton} onPress={() => this.setState({ flag: true })}>
                                <Text style={styles.confirm}>Confirm donation</Text>
                                <Image source={require('../../assets/images/tick.png')} style={styles.confirmicon} />
                            </TouchableOpacity>

                            :

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity>
                                    <Image source={require('../../assets/images/call.png')} style={styles.callicon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ flag: false })}>
                                    <Image source={require('../../assets/images/more.png')} style={styles.moreicon} />
                                </TouchableOpacity>
                            </View>

                    }

                />
                {/* end header */}


                {/* START footer*/}
                <View style={styles.sendbox}>
                    {/* plus button */}
                    <TouchableOpacity>
                        <Text style={styles.plus}>+</Text>
                    </TouchableOpacity>
                    {/* message box */}
                    <TextInput
                        style={styles.messageInput}
                        placeholder='Add text to this message ... '
                        placeholderTextColor={Colors.DarkGray}
                        multiline
                        onChangeText={this.onChangeText}
                        value={this.state.message}
                    />
                    {/* send button */}
                    <View style={{ marginLeft: calcWidth(15), alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/send.png')} style={styles.sendicon} />
                        </TouchableOpacity>
                        <Text style={styles.send}>Send</Text>
                    </View>

                </View>
                {/* end footer*/}

                {/* end body */}
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Graybackground,
    },
    header:
    {
        width: calcWidth(375),
        height: calcHeight(91.31),
        backgroundColor: Colors.theme,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backbutton:
    {
        width: calcWidth(17.61),
        height: calcHeight(29.97),
        marginLeft: calcWidth(10),
        backgroundColor: Colors.theme,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backicon:
    {
        width: calcWidth(17.61),
        height: calcHeight(29.97),
    },
    name:
    {
        color: Colors.Whitebackground,
        fontSize: calcWidth(20),
        fontFamily: 'Roboto-Medium',
        maxWidth: calcWidth(150),
        marginLeft: calcWidth(5),

    },
    confirmbutton:
    {
        width: calcWidth(147),
        height: calcHeight(32),
        backgroundColor: Colors.Whitebackground,
        borderRadius: 15,
        elevation: 1,
        // marginLeft: calcWidth(15),
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
    }

})

