import React, { } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import { getAppLanguage, strings } from '../../assets/Local/localLanguagesController';
import Back from '../../assets/svgs/Back';
import BloodUnit from '../../assets/svgs/BloodUnit';
import DonateWarn from '../../assets/svgs/DonateWarn';
import { calcWidth } from '../../Dimension';



type Props = {
    lastDonate: String,
    donateTill: String
}


export default NoDonate = (props: Props) => {
    let { lastDonate, donateTill } = props

    //Render
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <BloodUnit />
                <View style={styles.lastDonateTextView}>
                    <Text style={styles.lastDonateText}>{lastDonate}</Text>
                    <Text style={[styles.lastDonateText, { fontFamily: "Montserrat-Regular", fontSize: calcWidth(12) }]}>{strings("lastDon")}</Text>
                </View>
                <DonateWarn />

            </View>
            {donateTill && <Text style={styles.tillText}>{strings("donTill")} {donateTill}</Text>}


        </View>
    )

}