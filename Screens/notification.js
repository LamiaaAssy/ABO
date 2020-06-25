import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Form,
    Item,
    Platform,
    Button

} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension';
import Icon from 'react-native-vector-icons/Entypo';
import { set } from 'react-native-reanimated';
import { Avatar } from 'react-native-elements';
import Header from '../components/Header';


export default class notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    // drop: <Icon
                    //     name='chat'
                    //     size={20}
                    //     color={'red'}
                    // />,
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {
                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },
                {

                    photo: require('../assets/images/profile_user.png'),
                    name: 'Hadeer Ali',
                    message1: 'asked your help, tap here to send her message',
                    // message2: 'to send her message',
                    time: 'just now',
                },


            ]
        };


    }




    render() {
        return (
            <SafeAreaView style={styles.container} >


                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    {/* style={styles.Topbar } */}
                    <Header title={"Notification"} navigation={this.props.navigation} />

                    <View style={{ marginLeft: calcWidth(170) }}>
                        <Icon
                            name='chat'
                            size={40}
                            color={Colors.theme}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.Page}>
                        <FlatList

                            data={this.state.data}
                            renderItem={({ item }) => <View style={styles.DonorCard}>

                                <TouchableOpacity style={styles.cardup}>
                                    <View style={styles.left}>
                                        <Avatar source={item.photo}
                                            size={70}
                                            // backgroundColor="blue"
                                            marginLeft={calcWidth(20)}
                                            overlayContainerStyle={{ borderRadius: 70 }}
                                        />
                                        <View style={{ marginLeft: calcWidth(15), flex: 1, paddingBottom: calcHeight(15) }}>
                                            <View style={styles.right}>
                                                <Text style={{ marginBottom: calcHeight(20), color: "#29304D", fontFamily: 'Roboto-Regular', fontWeight: 'bold', fontSize: calcWidth(14) }} numberOfLines={2}>{item.name}{" "}{item.message1}</Text>

                                            </View>
                                            {/* <Text style={{ color: '#595959', fontFamily: 'Montserrat-Medium', fontSize: 15, paddingRight: 50 }} >{item.message1}</Text> */}

                                            {/* <Text style={{ color: '#595959', fontFamily: 'Montserrat-Medium', fontSize: 15 }}>{item.message2}</Text> */}
                                            <Text style={{ color: '#ABABAB', fontFamily: 'Montserrat-Medium', fontSize: calcWidth(12) }}>{item.time}</Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>}
                        />

                    </View>
                </ScrollView>

            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: Colors.Graybackground,
    },
    redBackground: {
        flex: 1,
        height: '100%',
        width: "100%",
    },
    Topbar:
    {
        flexDirection: 'row',
        // backgroundColor: Colors.Graybackground,
        alignItems: 'center',
        width: calcWidth(375),
        height: calcHeight(35),
        marginTop: calcHeight(47),

    },
    backbutton:
    {
        // backgroundColor: Colors.Graybackground,
        width: calcWidth(18),
        height: calcHeight(25),
        marginLeft: calcWidth(25),
        alignItems: 'center',
        marginBottom: calcHeight(5),
    },
    backicon:
    {

        width: calcWidth(17.61),
        height: calcHeight(30),

    },

    title:
    {
        fontFamily: 'Roboto-Medium',
        fontSize: calcWidth(20),
        color: Colors.theme,
        marginLeft: calcWidth(20),

    },
    Page: {
        marginTop: calcHeight(14),

    },
    DonorCard: {
        // justifyContent: 'space-around',
        flex: 1,
        // padding: 20,
        width: "100%",
        height: calcHeight(100),
        backgroundColor: "#F5F5F5",
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
    left:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: "#F5F5F5",
        backgroundColor: "#F5F5F5"
    },
    bloodtypeView:
    {
        backgroundColor: Colors.theme,
        borderRadius: 50,
        elevation: 3,
        width: calcWidth(30),
        height: calcHeight(33),
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardButtom:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

