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
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Icon from 'react-native-vector-icons/Entypo';
import { set } from 'react-native-reanimated';
import { Avatar } from 'react-native-elements';

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

                <ImageBackground source={require('../assets/images/redBackground.png')}
                    style={styles.redBackground}>
                    <View style={styles.header}>

                        {/* back button */}
                        <TouchableOpacity style={styles.backbutton}>
                            <Image source={require('../assets/images/right.png')} style={styles.backicon} />
                        </TouchableOpacity>

                        {/* label */}
                        <Text style={styles.title}>Notification</Text>
                        {/* end headr */}
                        <View style={{ marginLeft: 170 }}>
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

                                    <View style={styles.cardup}>
                                        <View style={styles.left}>
                                            {/* <View>
                                                <Avatar source={item.drop}
                                                    size={20}
                                                    // backgroundColor="blue"
                                                    marginLeft={5}
                                                    overlayContainerStyle={{ borderRadius: 50 }}
                                                />
                                            </View> */}
                                            <Avatar source={item.photo}
                                                size={70}
                                                // backgroundColor="blue"
                                                marginLeft={20}
                                                overlayContainerStyle={{ borderRadius: 70 }}
                                            />
                                            <View style={{ marginLeft: 5, flex: 1, paddingBottom: 15 }}>
                                                <View style={styles.right}>
                                                    <Text style={{ marginBottom: 20, color: "#312E2E", fontFamily: 'Montserrat-Bold', fontSize: 15 }} numberOfLines={3}>{item.name}{" "}{item.message1}</Text>

                                                </View>
                                                {/* <Text style={{ color: '#595959', fontFamily: 'Montserrat-Medium', fontSize: 15, paddingRight: 50 }} >{item.message1}</Text> */}

                                                {/* <Text style={{ color: '#595959', fontFamily: 'Montserrat-Medium', fontSize: 15 }}>{item.message2}</Text> */}
                                                <Text style={{ color: '#ABABAB', fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{item.time}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>}
                            />

                        </View>
                    </ScrollView>
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
    redBackground: {
        flex: 1,
        height: '100%',
        width: "100%",
    },
    header:
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
        marginBottom: 5
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
        marginTop: 14,
    },
    DonorCard: {
        // justifyContent: 'space-around',
        flex: 1,
        // padding: 20,
        width: "100%",
        height: 100,
        backgroundColor: "#F5F5F5",
        // borderBottomColor: "#F5F5F5",
        // borderColor: "#F5F5F5",
        // borderRadius: 10,
        marginBottom: 5,
        // backgroundColor: "yellow"
    },
    cardup:
    {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // backgroundColor: "yellow"

    },
    right:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: "white",
        marginTop: 30

    },
    left:
    {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderColor: "#F5F5F5",
        // justifyContent: "space-between",
        backgroundColor: "#F5F5F5"
    },
    bloodtypeView:
    {
        backgroundColor: Colors.theme,
        borderRadius: 50,
        elevation: 3,
        width: 33,
        height: 33,
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

