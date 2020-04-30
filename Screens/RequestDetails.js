import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import Icon3 from 'react-native-vector-icons/Feather'
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';


export default class RequestDetails extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                {/* start headr */}
                <View style={styles.headr}>
                    <Icon name="angle-left" size={50} color="#FD554F" onPress={() => alert('Back')} />
                    <Text style={styles.headrText} >Request details</Text>
                </View>
                {/* end headr */}

                <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get("window").width, alignItems: "center", paddingBottom: 50, justifyContent: "center", paddingTop: 50 }}>

                        {/* start units needed */}
                        <View style={styles.unitsNeededView}>
                            <View style={styles.bloodbag}>
                                <Image source={require('../assets/images/iv-bag.png')} style={{ height: 57.5, width: 45.5, marginRight: 12.5 }} />
                                <View>
                                    <Text style={{ fontSize: 20, color: Colors.theme, fontFamily: 'Montserrat-Bold' }}>10</Text>
                                    <Text style={{ fontSize: 12, color: Colors.theme, fontFamily: 'Montserrat-Regular' }}>units needed</Text>
                                </View>
                            </View>

                            <Text style={styles.remaining}>5 remaining</Text>
                        </View>
                        {/* start units needed */}
                        {/* start paitent information */}
                        <View style={styles.patientInformationView}>
                            {/* start Top */}
                            <View style={{ height: "50%", width: "100%", flexDirection: "row" }}>
                                <View style={styles.patientInformation}>
                                    <Text style={{ fontSize: 16, color: Colors.theme, fontFamily: 'Montserrat-Bold' }}>Paitent</Text>
                                    <Text style={{ fontSize: 14, color: '#7C7C7C', fontFamily: 'Montserrat-Medium', marginTop: calcHeight(3) }}>Mohamed ALi Mahmoud</Text>
                                    <Text style={{ fontSize: 12, color: '#656565', fontFamily: 'Montserrat-Bold', marginTop: calcHeight(7) }}>Valid Until</Text>
                                </View>
                                <View style={styles.patientViewIcons}>
                                    <View>
                                        <Icon
                                            name='share-alt'
                                            size={16}
                                            color={'#7C7C7C'}
                                        />
                                    </View>
                                    <Text style={styles.date}>15 / 2 / 2020</Text>
                                </View>
                            </View>
                            {/* end Top */}
                            <View style={{ height: "1%", backgroundColor: "#E7EAEF", width: "90%", alignSelf: "center", marginTop: 12.5, marginBottom: 20.5 }}></View>
                            {/* start End */}
                            <View style={{ height: "49%", width: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 14, color: '#7C7C7C', fontFamily: 'Montserrat-SemiBold' }}>By{" "}</Text>
                                    <Text style={{ fontSize: 14, color: '#7C7C7C', fontFamily: 'Montserrat-Regular' }} >Ali Mohamed</Text>
                                </View>

                                <Icon3
                                    name='phone-call'
                                    size={16}
                                    color={'#7C7C7C'}

                                />

                            </View>
                            {/* end End */}
                        </View>
                        {/* end paitent information */}

                        {/* start blood required */}
                        <View style={styles.bloodRequiredView}>
                            <Text style={{ fontSize: 14, color: Colors.theme, fontFamily: 'Montserrat-SemiBold' }} >Blood donor type required</Text>
                            <View style={styles.circlesContainer}>
                                <View style={styles.circle}>
                                    <Text style={styles.circleText}>A+</Text>
                                </View>
                                <View style={styles.circle}>
                                    <Text style={styles.circleText}>B+</Text>
                                </View>
                                <View style={styles.circle}>
                                    <Text style={styles.circleText}>A-</Text>
                                </View>
                            </View>
                        </View>
                        {/* end blood required */}

                        {/* start hospital informations */}
                        <View style={styles.hospitalInformationsView}>
                            <Text style={{ fontSize: 14, color: Colors.theme, fontFamily: 'Montserrat-SemiBold' }} >Hospital address</Text>
                            <View style={styles.hospitaladdress}>
                                <Icon2 name="location" size={25} color="#7C7C7C" />
                                {/* <View style={{ backgroundColor: "black", height: 17.5, width: 12.5 }}></View> */}
                                <Text style={styles.hospitaladdressText}>15 Ramsis st.Cairo</Text>
                            </View>
                        </View>


                        <View style={styles.hospitaladdressdetails}>
                            <TouchableOpacity style={styles.Touchable} onPress={() => alert('Show on map')} >
                                <Icon2 name="location" size={30} color="#7C7C7C" style={{ marginLeft: 10 }} />
                                <Text style={styles.TouchableText}>Show on map</Text>
                            </TouchableOpacity>
                            <View style={{ height: "80%", backgroundColor: "#E7EAEF", width: 1, alignSelf: "center" }}></View>
                            <TouchableOpacity style={styles.Touchable} onPress={() => alert('Share')}>
                                <Icon2 name="share-google" size={30} color="#7C7C7C" style={{ marginLeft: 10 }} />
                                <Text style={styles.TouchableText}>Share details</Text>
                            </TouchableOpacity>

                        </View>
                        {/* end hospital informations */}

                        <TouchableOpacity style={styles.TouchableDonate} onPress={() => alert('Done')}>
                            <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Donate</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>







            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    headr: {
        width: calcWidth(325),
        height: calcHeight(45),
        marginTop: calcHeight(20),
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    },
    headrText: {
        fontSize: 20,
        color: Colors.theme,
        marginLeft: calcWidth(20),
        fontFamily: 'Roboto-Medium',
    },
    unitsNeededView: {
        backgroundColor: Colors.Whitebackground,
        padding: 20,
        width: calcWidth(325),
        height: calcHeight(92),
        marginTop: calcHeight(15),
        flexDirection: "row",
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-between'
    },
    bloodbag: {
        marginVertical: calcHeight(17),
        flexDirection: 'row',
        alignItems: 'center'
    },
    unitsNeededText: {
        height: calcHeight(44),
        width: calcWidth(81),
        marginLeft: calcWidth(12.5),
        marginVertical: calcHeight(26)

    },
    remaining: {
        marginTop: calcHeight(30),
        //marginBottom: calcHeight(27),
        //marginLeft: calcWidth(72),
        color: '#7C7C7C',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
    },
    patientInformationView: {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(325),
        height: calcHeight(162),
        marginTop: calcHeight(25),
        borderRadius: 10,
        elevation: 5,
        padding: 20,
        justifyContent: 'space-between'
    },
    patientInformation: {
        height: "100%",
        width: "60%",
    },
    patientViewIcons: {
        height: "100%",
        width: "40%",
        alignItems: 'flex-end',
        //backgroundColor: Colors.theme
    },
    date: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: '#7C7C7C',
        textAlign: "center",
        marginTop: calcHeight(21),

    },
    bloodRequiredView: {
        width: calcWidth(325),
        height: calcHeight(115),
        marginTop: calcHeight(26),
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
    },
    circlesContainer: {
        flexDirection: "row",
        width: "100%",
        height: calcHeight(50),
        marginTop: 15,
        alignItems: "center",
        justifyContent: 'flex-start',
        //backgroundColor: Colors.theme
    },
    circle: {
        height: 42,
        width: 42,
        backgroundColor: Colors.theme,
        borderRadius: 21,
        marginRight: calcWidth(21),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        elevation: 5
    },
    circleText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Montserrat-SemiBold',
        width: "100%",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center"
    },
    hospitalInformationsView: {
        width: calcWidth(325),
        height: calcHeight(87),
        marginTop: calcHeight(22),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        padding: 21,
        justifyContent: 'flex-start'
    },
    hospitaladdress: {
        flexDirection: "row",
        marginTop: calcHeight(10),
        justifyContent: 'flex-start'

    },
    hospitaladdressText: {
        marginLeft: calcWidth(11.7),
        fontSize: 14,
        color: '#7C7C7C',
        fontFamily: 'Roboto-Medium',
    },
    hospitaladdressdetails: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(26),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
        flexDirection: "row",
        justifyContent: "center"
    },
    Touchable: {
        height: "100%",
        width: "48%",
        flexDirection: "row",
        alignItems: "center",

    },
    TouchableText: {
        fontSize: 14,
        color: Colors.theme,
        marginLeft: calcWidth(8),
        fontFamily: 'Montserrat-SemiBold',
    },
    TouchableDonate: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(45),
        borderRadius: 10,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    }

})

