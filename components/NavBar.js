import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import auth from '@react-native-firebase/auth';
import { calcWidth, calcHeight } from '../Dimension';
class NavBar extends Component {

    constructor(props) {
        super(props);

    }
    LogOut = async () => {
        auth()
            .signOut()
            .then(() => {
                this.props.navigation.navigate('before-login')
            });
    }
    render() {
        //console.log("props in navbar", this.props.navigation)
        return (
            <View style={styles.container}>
                <View style={styles.NavBar}>
                    <View style={styles.homeIcon}>
                        <Icon
                            name='ios-home'
                            size={30}
                            color={Colors.Whitebackground}
                            onPress={() => this.props.navigation.navigate('HomePage')}
                        />
                        <Text style={styles.Text}>HOME</Text>
                    </View>
                    <View style={styles.BloodRequestIcon}>
                        <View style={styles.IconView}>
                            <Icon
                                name='md-wifi'
                                size={40}
                                color={Colors.theme}
                                onPress={() => this.props.navigation.navigate('BloodRequestForm')}
                            />
                        </View>
                        <Text style={styles.Text}>BLOOD REQUEST</Text>
                    </View>
                    <View style={{ marginTop: calcHeight(30), /*marginLeft: 72 */ }}>
                        <Text style={styles.Text}>MENU</Text>
                    </View>
                </View>
                <ActionButton buttonColor='#ffffff00' style={styles.ActionButton} degrees={0}
                    renderIcon={active => active ? (<Icon
                        name='ios-list'
                        size={30}
                        color={Colors.Whitebackground}
                    />) : (<Icon
                        name='ios-list'
                        size={30}
                        color={Colors.Whitebackground}
                    />)}>
                    <ActionButton.Item buttonColor={Colors.Whitebackground} title="Explore donners"
                        onPress={() => this.props.navigation.navigate('ExploreDonners')}
                    >
                        <Icon name="ios-paper" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={Colors.Whitebackground} title="Chat"
                        onPress={() => this.props.navigation.navigate('ChatHome')}

                    >
                        <Icon name="ios-chatboxes" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={Colors.Whitebackground} title="Profile"
                        onPress={() => this.props.navigation.navigate('Profile')}
                    >
                        <Icon name="md-person" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor={Colors.Whitebackground} title="LogOut" onPress={() => this.LogOut()} >
                        <Icon2 name="sign-out" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff00',
        // position: "absolute",
        // bottom: 0
    },
    NavBar: {
        flex: 1,
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
        fontSize: calcWidth(12),
        color: Colors.Whitebackground
    },
    ActionButton: {
        position: 'absolute',
        bottom: calcHeight(-15),
        marginRight: calcWidth(23),
        //backgroundColor: 'blue',

    },
    actionButtonIcon: {
        fontSize: calcWidth(20),
        height: calcHeight(22),
        color: Colors.theme,
    },
});
export default NavBar;