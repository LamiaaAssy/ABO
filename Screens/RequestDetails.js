import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';


export default class RequestDetails extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                {/* start headr */}
                <View style={styles.headr}>
                    <Icon name="angle-left" size={50} color="#FD554F" />
                    <Text style={styles.headrText} >Request details</Text>
                </View>
                {/* end headr */}

                <View style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: Dimensions.get("window").width, alignItems: "center", paddingBottom: 50, justifyContent: "center", paddingTop: 50 }}>

                        {/* start units needed */}
                        <View style={styles.unitsNeededView}>
                            <View style={styles.bloodbag}>
                                {/* <Image source={require('./images/iv-bag.png')} style={{ height: "100%", width: "100%" }} /> */}
                            </View>

                            <View style={styles.unitsNeededText}>
                                <Text style={{ fontSize: 20, color: Colors.theme, fontFamily: 'Montserrat-Bold' }}>10</Text>
                                <Text style={{ fontSize: 12, color: Colors.theme, fontFamily: 'Montserrat-Regular' }}>units needed</Text>
                            </View>

                            <Text style={styles.remaining}>5 remaining</Text>
                        </View>
                        {/* start units needed */}


                        {/* start paitent information */}
                        <View style={styles.patientInformationView}>
                            {/* start Top */}
                            <View style={{ height: "50%", width: "100%", flexDirection: "row" }}>
                                <View style={styles.patientInformation}>
                                    <Text style={{ fontSize: 16, color: Colors.theme, fontFamily: 'Montserrat-Bold', marginTop: calcHeight(10) }}>Paitent</Text>
                                    <Text style={{ fontSize: 14, color: Colors.textCard, fontFamily: 'Montserrat-Medium', marginTop: calcHeight(3) }}>Mohamed ALi Mahmoud</Text>
                                    <Text style={{ fontSize: 12, color: '#656565', fontFamily: 'Montserrat-Bold', marginTop: calcHeight(6) }}>Valid Until</Text>
                                </View>
                                <View style={styles.patientViewIcons}>
                                    <View style={styles.share}>

                                    </View>
                                </View>
                            </View>
                            {/* end Top */}
                            <View style={{ height: "1%", backgroundColor: "#E7EAEF", width: "90%", alignSelf: "center" }}></View>
                            {/* start End */}
                            <View style={{ height: "49%", width: "100%", backgroundColor: "yellow" }}>


                            </View>
                            {/* end End */}
                        </View>
                        {/* end paitent information */}


                        {/* start blood required */}
                        <View style={styles.bloodRequiredView}>
                            <Text style={{ fontSize: 14, color: Colors.theme, fontFamily: 'Montserrat-SemiBold', marginLeft: calcWidth(20), marginTop: calcHeight(20) }} >Blood donor type required</Text>
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
                            <Text style={{ fontSize: 14, color: Colors.theme, fontFamily: 'Montserrat-SemiBold', marginLeft: calcWidth(20), marginTop: calcHeight(20) }} >Hospital address</Text>
                            <View style={styles.hospitaladdress}>
                                <Icon2 name="location" size={25} color="#7C7C7C" style={{ marginLeft: 10 }} />
                                {/* <View style={{ backgroundColor: "black", height: 17.5, width: 12.5 }}></View> */}
                                <Text style={styles.hospitaladdressText}>15 Ramsis st.Cairo</Text>
                            </View>
                        </View>



                        <View style={styles.hospitaladdressdetails}>
                            <TouchableOpacity style={styles.Touchable}>
                                <Icon2 name="location" size={30} color="#7C7C7C" style={{ marginLeft: 10 }} />
                                <Text style={styles.TouchableText}>Show on map</Text>
                            </TouchableOpacity>
                            <View style={{ height: "80%", backgroundColor: "#E7EAEF", width: 1, alignSelf: "center" }}></View>
                            <TouchableOpacity style={styles.Touchable}>
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



            </View >

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
        // backgroundColor: Colors.Whitebackground,
        // elevation: 2,
    },
    headrText: {
        fontSize: 20,
        color: Colors.theme,
        marginLeft: calcWidth(20),
        fontFamily: 'Roboto-Medium',
    },
    unitsNeededView: {
        backgroundColor: Colors.Whitebackground,
        width: calcWidth(325),
        height: calcHeight(92),
        marginTop: calcHeight(15),
        flexDirection: "row",
        borderRadius: 10,
        elevation: 5,
    },
    bloodbag: {
        height: calcHeight(57.5),
        width: calcWidth(45.5),
        marginLeft: calcWidth(22),
        marginVertical: calcHeight(17),
        backgroundColor: Colors.theme
    },
    unitsNeededText: {
        height: calcHeight(44),
        width: calcWidth(81),
        marginLeft: calcWidth(12.5),
        marginVertical: calcHeight(26)

    },
    remaining: {
        marginTop: calcHeight(50),
        marginBottom: calcHeight(27),
        marginLeft: calcWidth(72),
        color: Colors.textCard,
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
    },
    patientInformation: {
        height: "100%",
        width: "60%",
        paddingLeft: calcWidth(20)
    },
    patientViewIcons: {
        height: "100%",
        width: "40%",
        backgroundColor: "green",
    },
    share: {
        marginTop: calcHeight(10),
        // marginBottom: calcHeight(27),
        marginLeft: calcWidth(85),
        height: calcHeight(27),
        width: calcWidth(27),
        backgroundColor: Colors.theme
    },
    bloodRequiredView: {
        width: calcWidth(325),
        height: calcHeight(115),
        marginTop: calcHeight(26),
        borderRadius: 10,
        backgroundColor: Colors.Whitebackground,
        elevation: 5,
    },
    circlesContainer: {
        flexDirection: "row",
        width: "100%",
        height: calcHeight(50),
        marginTop: 10,
        alignItems: "center",
    },
    circle: {
        height: calcHeight(42),
        width: calcWidth(42),
        backgroundColor: Colors.theme,
        borderRadius: calcWidth(21),
        marginLeft: calcWidth(21),
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
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
    },
    hospitaladdress: {
        flexDirection: "row",
        width: "100%",
        height: calcHeight(30),
        marginTop: calcHeight(10),
        alignItems: "center",
    },
    hospitaladdressText: {
        marginLeft: calcWidth(11),
        fontSize: 14,
        color: Colors.textCard,
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