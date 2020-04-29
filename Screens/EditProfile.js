import React from 'react';
import { 
    View, 
    SafeAreaView, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Image, 
    TouchableOpacity, 
    Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';
import { Input } from 'react-native-elements';

export default class EditProfile extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                {/* start headr */}
                <View style={styles.headr}>
                    <TouchableOpacity style={styles.headrAssets}>
                        <Image source={require('../assets/images/gear.png')} style={{ height: "100%", width: "100%" }} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.headrAssets}></TouchableOpacity> */}
                </View>
                {/* end headr */}

                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageView}></TouchableOpacity>
                    <Text style={styles.name}> Mohamed Ali Mahmoud  </Text>
                </View>

                <View style={styles.informations}>
                    <View style={styles.left}>
                        <View style={styles.leftInformations}>
                            <Text style={styles.numbers}>4</Text>
                            <Text style={styles.leftTitle}>Donated</Text>
                        </View>
                        <View style={styles.leftInformations}>
                            <Text style={styles.numbers}>12</Text>
                            <Text style={styles.leftTitle}>Requests</Text>
                        </View>

                    </View>
                    <View style={styles.right}>
                        <Text style={styles.rightText}>Blood Type</Text>
                        <Text style={styles.rightText}>A+ (Positive)</Text>
                    </View>

                </View>
                <View style={{ height: 20, backgroundColor: Colors.Whitebackground, width: "100%" }}>

                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                    <View style={styles.personalinformations}>
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Name'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'user', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}

                        />

                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Email'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}

                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Birthdat Date'
                            placeholderTextColor={Colors.theme}
                            placeholderText
                            rightIcon={{ type: 'font-awesome', name: 'calendar', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Phone Number'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}
                        />
                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Adress'
                            placeholderTextColor={Colors.theme}
                            rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: 10 }}
                        />
                    </View>
                    <View style={styles.gender}>
                        <Text style={styles.genderText}>Gender</Text>
                        <View style={styles.genderButtons}>
                            <TouchableOpacity style={styles.generTouchable}>
                                <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.generTouchable}>
                                <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Male</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.TouchableEdit}>
                        <Text style={{ fontSize: 20, color: "#fff", fontFamily: 'Montserrat-Medium' }}>Done</Text>
                    </TouchableOpacity>

                </ScrollView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    headr: {
        width: '100%',
        height: calcHeight(45),
        marginTop: calcHeight(20),
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor: "blue",
        justifyContent: 'space-between',
        paddingHorizontal: calcWidth(25)
    },
    headrAssets: {
        width: calcWidth(27),
        height: calcHeight(27),
        backgroundColor: Colors.Whitebackground
    },
    imageContainer: {
        height: calcHeight(177),
        width: '100%',
        // backgroundColor: 'yellow',
        alignItems: "center",
        justifyContent: "center"
    },
    imageView: {
        backgroundColor: Colors.theme,
        height: 112,
        width: 112,
        borderRadius: 56,

    },
    name: {
        fontSize: 16,
        color: Colors.textCard,
        fontFamily: 'Montserrat-Medium',
        marginTop: 7,
        // backgroundColor: "red"
    },
    informations: {
        height: calcHeight(65),
        width: "100%",
        borderTopColor: Colors.Grayborder,
        borderBottomColor: Colors.Grayborder,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    left: {
        // backgroundColor: "red",
        height: "100%",
        width: "50%",
        borderRightColor: Colors.Grayborder,
        borderRightWidth: 1,
        flexDirection: "row"
    },
    leftInformations: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "100%",
        // backgroundColor: "pink",

    },
    leftTitle: {
        fontFamily: "Montserrat-Medium",
        fontSize: 10,
        color: Colors.DrakText
    },
    numbers: {
        fontFamily: "Montserrat-Bold",
        fontSize: 17,
        color: Colors.theme
    },
    right: {
        //backgroundColor: "green",
        height: "100%",
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    rightText: {
        fontFamily: "Montserrat-Medium",
        fontSize: 14,
        color: Colors.DrakText
    },
    ScrollView: {
        width: Dimensions.get("window").width,
        paddingBottom: 50,
        justifyContent: "center",
        // backgroundColor: "blue"
    },
    personalinformations: {
        paddingVertical: calcHeight(20),
        // backgroundColor: "black",

    },
    inputContainer: {
        width: "95%",
        alignSelf: "center",
        borderColor: Colors.theme,
        // marginTop: 30
        marginVertical: 7
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    gender: {
        marginTop: 10,
        height: calcHeight(60),
        width: "100%",
        //backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center"
        paddingHorizontal: calcWidth(20),
    },
    genderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 20,
        color: Colors.theme,
        // marginLeft: calcWidth(30),
        //backgroundColor: "yellow"
    },
    genderButtons: {
        //backgroundColor: "red",
        width: "80%",
        height: "100%",
        marginLeft: calcWidth(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    generTouchable: {
        backgroundColor: Colors.theme,
        borderRadius: 10,
        elevation: 5,
        height: "75%",
        width: "40%",
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    TouchableEdit: {
        width: calcWidth(325),
        height: calcHeight(49),
        marginTop: calcHeight(25),
        borderRadius: 10,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    }

})

