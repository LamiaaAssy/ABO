import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5'


export default class Card extends Component {
    render() {
        return (

            <TouchableOpacity style={styles.body} onPress={()=>{this.props.navigation.navigate('ChatView',{ChatId:this.props.id})
                       console.log('chaaaaaaaaaat :  ',this.props.id)
                       }} >
                {/* start body */}
                
                <View style={{ flexDirection: 'row', alignItems: "center" }}>

                    {/* <Image source={require('../../assets/images/PP.jpeg')} style={styles.ProflePicture} >
                    </Image> */} 
                    {this.props.image != null ?  
                        <Avatar
                            size="xlarge"
                            rounded
                            activeOpacity={0.01}
                            //source={require('../../assets/images/PP.jpeg')}
                            source={{ uri: this.props.image }}
                            style={styles.ProflePicture}
                        /> 
                        :
                         <Icon name='user-circle'  color='#48494B' 
                                   size={55} 
                                   style={{ color: Colors.LightGray ,marginLeft: calcWidth(15) ,elevation:50}} 
                            />
                        }
         
                    <View style={{ marginLeft: calcWidth(13) }}>
                        <Text style={styles.name} numberOfLines={1} >{this.props.name}</Text>
                        <Text style={styles.messages} numberOfLines={1} >{this.props.message}</Text>
                        <Text style={styles.time} numberOfLines={1} >{this.props.time}</Text>
                    </View>

                </View>


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
        marginTop: calcHeight(10),
        marginBottom: calcHeight(10),
        alignSelf: 'center',
        borderWidth: calcWidth(1),
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
        borderWidth: calcWidth(1),
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

