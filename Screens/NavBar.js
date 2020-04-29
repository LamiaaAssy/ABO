import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

class NavBar extends Component {
    render() {
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
                                size={45}
                                color={Colors.theme}
                            />
                        </View>
                        <Text style={styles.Text}>BLOOD REQUEST</Text>
                    </View>
                    <ActionButton buttonColor={Colors.theme} style={styles.ActionButton}
                        icon={<Icon
                            name='ios-list'
                            size={30}
                            color={Colors.Whitebackground}
                        />} >
                        <ActionButton.Item buttonColor={Colors.Whitebackground} title="Explore donners" >
                            <Icon name="ios-paper" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor={Colors.Whitebackground} title="Chat" >
                            <Icon name="ios-chatboxes" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor={Colors.Whitebackground} title="Profile" >
                            <Icon name="md-person" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                    <View style={{ marginTop: 30, marginLeft: 72 }}>
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
        left: 0,
        backgroundColor: Colors.theme,
        height: 70,
        width: 375,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    homeIcon: {
        marginLeft: 30,
        alignItems: 'center'
    },
    BloodRequestIcon:
    {
        marginBottom: 40,
        marginLeft: 70,
        alignItems: "center"
    },
    IconView:
    {
        backgroundColor: Colors.Whitebackground,
        borderRadius: 50,
        borderColor: Colors.theme,
        borderWidth: 8,
        height: 70,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Text: {
        fontSize: 12,
        color: Colors.Whitebackground
    },
    ActionButton: {
        position: 'absolute',
        top: 10,
        height: 77,

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: Colors.theme,
    },
});
export default NavBar;