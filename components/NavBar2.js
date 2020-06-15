import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { FloatingAction } from "react-native-floating-action";
import auth from '@react-native-firebase/auth';
import { calcWidth, calcHeight } from '../Dimension';

class NavBar2 extends Component {



    LogOut = async () => {
        console.log("hiiiiiiii")
        auth()
            .signOut()
            .then(() => {

                this.props.navigation.replace('Login')
            });
    }
    render() {
        const actions = [
            {
                text: "Explore donners",
                icon: <Icon name="ios-paper" style={styles.actionButtonIcon} />,
                name: "bt_accessibility",
                position: 1,
                color: Colors.Whitebackground,
                textColor: Colors.theme,
            },
            {
                text: "Chat",
                icon: <Icon name="ios-chatboxes" style={styles.actionButtonIcon} />,
                name: "bt_language",
                position: 2,
                color: Colors.Whitebackground,
                textColor: Colors.theme

            },
            {
                text: "Profile",
                icon: <Icon name="md-person" style={styles.actionButtonIcon} />,
                name: "bt_room",
                position: 3,
                color: Colors.Whitebackground,
                textColor: Colors.theme

            },
            {
                text: "LogOut",
                icon: <Icon2 name="sign-out" style={styles.actionButtonIcon} />,
                name: "bt_videocam",
                position: 4,
                color: Colors.Whitebackground,
                textColor: Colors.theme,

            }
        ];
        return (

            <View style={styles.container}>
                <View style={styles.NavBar}>
                    <View style={styles.homeIcon}>
                        <Icon
                            name='ios-home'
                            size={30}
                            color={Colors.Whitebackground}
                        />
                        <Text style={styles.Text}>HOME</Text>
                    </View>
                    <View style={styles.BloodRequestIcon}>
                        <View style={styles.IconView}>
                            <Icon
                                name='md-wifi'
                                size={40}
                                color={Colors.theme}
                            />
                        </View>
                        <Text style={styles.Text}>BLOOD REQUEST</Text>
                    </View>
                    <FloatingAction
                        color={Colors.theme}
                        shadow={{ shadowOpacity: 0 }}
                        actions={actions}
                        showBackground={false}
                        animated={false}
                        //shadow={{ shadowOpacity: 0, shadowOffset: { width: 0, height: 0 }, shadowColor: "#000000", shadowRadius: 0 }}
                        floatingIcon={<Icon
                            name='ios-list'
                            size={30}
                            color={Colors.Whitebackground}
                        />}
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                        }}
                    />
                    <View style={{ marginTop: calcHeight(30), /*marginLeft: 72 */ }}>
                        <Text style={styles.Text}>MENU</Text>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Whitebackground,
    },
    NavBar: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: calcWidth(60),
        //left: 0,
        backgroundColor: Colors.theme,
        height: calcHeight(60),
        width: calcWidth(375),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    homeIcon: {
        //  marginLeft: 30,
        alignItems: 'center'
    },
    BloodRequestIcon:
    {
        marginBottom: calcHeight(30),
        // marginLeft: 70,
        alignItems: "center"
    },
    IconView:
    {
        backgroundColor: Colors.Whitebackground,
        borderRadius: 50,
        borderColor: Colors.theme,
        borderWidth: 8,
        height: calcHeight(60),
        width: calcWidth(65),
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text: {
        fontSize: 12,
        color: Colors.Whitebackground
    },
    ActionButton: {
        position: 'absolute',
        top: calcHeight(12),
        height: calcHeight(70),
        marginRight: calcWidth(20),
    },
    actionButtonIcon: {
        fontSize: 20,
        height: calcHeight(22),
        color: Colors.theme,
    },
});
export default NavBar2;