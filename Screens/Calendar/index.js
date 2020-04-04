import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Keyboard, ShadowPropTypesIOS } from 'react-native';
import styles from './styles';
import { strings } from '../../assets/Local/localLanguagesController';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import Header from '../../components/Header';
import { calcHeight } from '../../assets/metrics';



export default Calendar = (props) => {
    // setAppLanguage("en", true);

    //State Hooks  *make it const*
    const [mobile, setMobile] = useState("01112700405")





    //Render
    return (
        <View style={styles.container}>

            <Header title={strings("calendar")} navigation={props.navigation} />


            <View style={{ marginTop: calcHeight(80), height: calcHeight(200), width: "100%" }}>
                <AnimatedLinearGradient customColors={["#FD554F", "#DD1107"]} speed={1500} />
            </View>


        </View>
    )

}
