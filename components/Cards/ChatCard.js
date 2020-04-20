import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';


export default class Card extends Component {
    render() {
        return (

            <TouchableOpacity style={styles.body} >
                {/* start body */}

                <View style={{ flexDirection: 'row', alignItems: "center" }}>

                    {/* profile picture */}

                    <Image source={require('../../assets/images/PP.jpeg')} style={styles.ProflePicture} >
                    </Image>
                    {/* chat information */}
                    <View style={{ marginLeft: calcWidth(13) }}>
                        {/* name */} 
                        <Text style={styles.name} numberOfLines={1} >{this.props.name}</Text>
                        {/* messages */}
                        <Text style={styles.messages} numberOfLines={1} >{this.props.message}</Text>
                        {/* time */}
                        <Text style={styles.time} numberOfLines={1} >{this.props.time}</Text>
                    </View>

                </View>

                {/* end body */}

            </TouchableOpacity>

        );
    }
}



const styles = StyleSheet.create({
    body:
    {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(325),
        height: calcHeight(95),
        marginTop: calcHeight(20),
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.Border,
        borderRadius: 10,
        elevation: 3,
        justifyContent: 'center',
    },
    ProflePicture:
    {
        height: calcWidth(50),
        width: calcWidth(50),
        backgroundColor: Colors.theme,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.Border,
        marginLeft: calcWidth(15),
    },
    name:
    {
        fontSize: calcWidth(15),
        color: Colors.BlackText,
        maxWidth: calcWidth(145),
        fontFamily: 'Roboto-Regular', /////EDIT FONT
        fontWeight: 'bold',
    },
    messages:
    {
        fontSize: calcWidth(14),
        color: Colors.BlackText,
        fontFamily: 'Roboto-Regular',
        maxWidth: calcWidth(215),
    },
    time:
    {
        fontSize: calcWidth(12),
        color: Colors.LightGray,
        fontFamily: 'Roboto', ///////EDIT FONT
        marginTop: calcHeight(5),
    },

});

