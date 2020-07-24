import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { getAppLanguage } from '../../assets/Local/localLanguagesController';
import Back from '../../assets/svgs/Back';
import Colors from '../../assets/Colors';


type Props = {
    title: String,
    newComponent: Component,
    whiteHeader: true | false
}


export default Header = (props: Props) => {
    let { title, whiteHeader, newComponent } = props

    //Render
    return (
        <View style={[styles.container, (whiteHeader && { backgroundColor: Colors.Whitebackground })]}>

            <View style={styles.child}>

                {/*********** Back Button ***********/}
                <TouchableOpacity style={styles.leftButton} onPress={() => props.navigation.goBack()}>
                    <Back rotateDegree={getAppLanguage() == "ar" ? 180 : 0} fill={whiteHeader ? '#FFFFFF' : null} />
                </TouchableOpacity>

                {/*********** Title Text ***********/}
                <Text numberOfLines={1} style={[styles.titleText, (whiteHeader && { color: '#FFFFFF' })]}>{title}</Text>

                {newComponent}

            </View>



        </View>
    )

}
