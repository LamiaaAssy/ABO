import React, { } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { getAppLanguage } from '../../assets/Local/localLanguagesController';
import Back from '../../assets/svgs/Back';



type Props = {
    title: String
}


export default Header = (props: Props) => {
    let { title } = props

    //Render
    return (
        <View style={styles.container}>

            <View style={styles.child}>

                {/*********** Back Button ***********/}
                <TouchableOpacity style={styles.leftButton} onPress={() => props.navigation.goBack()}>
                    <Back rotateDegree={getAppLanguage() == "ar" ? 180 : 0} />
                </TouchableOpacity>

                {/*********** Title Text ***********/}
                <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
            </View>



        </View>
    )

}
