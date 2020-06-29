import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Colors from '../assets/Colors';
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Icon from 'react-native-vector-icons/Octicons';
import { set, Value } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            APstyle: styles.BloodButton,
            AMstyle: styles.BloodButton,
            BPstyle: styles.BloodButton,
            BMstyle: styles.BloodButton,
            OPstyle: styles.BloodButton,
            OMstyle: styles.BloodButton,
            ABPstyle: styles.BloodButton,
            ABMstyle: styles.BloodButton,
            APtext: styles.BloodText,
            AMtext: styles.BloodText,
            BPtext: styles.BloodText,
            BMtext: styles.BloodText,
            OPtext: styles.BloodText,
            OMtext: styles.BloodText,
            ABPtext: styles.BloodText,
            ABMtext: styles.BloodText,
            AP: false,
            AM: false,
            BP: false,
            BM: false,
            OP: false,
            OM: false,
            ABP: false,
            ABM: false,
            male_G: styles.genderTouchable,
            female_G: styles.genderTouchable,
            male_text: styles.genderlabels,
            female_text: styles.genderlabels,
            name: "",
            email: "",
            phone: '',
            address: '',
            password: '',
            cpassword: '',
            gender: '',
            blood: '',
            day: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 },
            { value: 16 }, { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }, { value: 25 }, { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 },],
            month: [{ value: 'January' }, { value: 'February' }, { value: 'March' }, { value: 'April' }, { value: 'May' }, { value: 'June' }, { value: 'July' }, { value: 'August' }, { value: 'September' }, { value: 'October' }, { value: 'November' }, { value: 'December' }],
            year: [{ value: 1920 }, { value: 1921 }, { value: 1922 }, { value: 1923 }, { value: 1924 }, { value: 1925 }, { value: 1926 }, { value: 1927 }, { value: 1928 }, { value: 1929 }, { value: 1930 }, { value: 1931 }, { value: 1932 }, { value: 1933 },
            { value: 1934 }, { value: 1935 }, { value: 1936 }, { value: 1937 }, { value: 1938 }, { value: 1939 }, { value: 1940 }, { value: 1941 }, { value: 1942 }, { value: 1943 }, { value: 1944 }, { value: 1945 }, { value: 1946 },
            { value: 1947 }, { value: 1948 }, { value: 1949 }, { value: 1950 }, { value: 1951 }, { value: 1952 }, { value: 1953 }, { value: 1954 }, { value: 1955 }, { value: 1956 }, { value: 1957 }, { value: 1958 },
            { value: 1959 }, { value: 1960 }, { value: 1961 }, { value: 1962 }, { value: 1963 }, { value: 1964 }, { value: 1965 }, { value: 1966 }, { value: 1967 }, { value: 1968 }, { value: 1969 }, { value: 1970 }, { value: 1971 }, { value: 1972 }, { value: 1973 },
            { value: 1974 }, { value: 1975 }, { value: 1976 }, { value: 1977 }, { value: 1978 }, { value: 1979 }, { value: 1980 }, { value: 1981 }, { value: 1982 }, { value: 1983 }, { value: 1984 },
            { value: 1985 }, { value: 1986 }, { value: 1987 }, { value: 1988 }, { value: 1989 }, { value: 1990 }, { value: 1991 }, { value: 1992 }, { value: 1993 }, { value: 1994 }, { value: 1995 }, { value: 1996 }, { value: 1997 }, { value: 1998 }, { value: 1999 }, { value: 2000 }, { value: 2001 }, { value: 2002 }],
            birthday: '',
            birthmonth: '',
            birthyear: ''
        };
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    selectType(type) {
        if (type == "A+") {
            this.setState({
                APstyle: styles.redBloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.whiteBloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
                blood: type
            })

        }
        else if (type == "A-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.redBloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.whiteBloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
                blood: type
            })

        }
        else if (type == "B+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.redBloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.whiteBloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
                blood: type

            })

        }
        else if (type == "B-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.redBloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.whiteBloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
                blood: type

            })

        }
        else if (type == "O+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.redBloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.whiteBloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
                blood: type

            })

        }
        else if (type == "O-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.redBloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.whiteBloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.BloodText,
            })

        }
        else if (type == "AB+") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.redBloodButton,
                ABMstyle: styles.BloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.whiteBloodText,
                ABMtext: styles.BloodText,
                blood: type

            })

        }
        else if (type == "AB-") {
            this.setState({
                APstyle: styles.BloodButton,
                AMstyle: styles.BloodButton,
                BPstyle: styles.BloodButton,
                BMstyle: styles.BloodButton,
                OPstyle: styles.BloodButton,
                OMstyle: styles.BloodButton,
                ABPstyle: styles.BloodButton,
                ABMstyle: styles.redBloodButton,
                APtext: styles.BloodText,
                AMtext: styles.BloodText,
                BPtext: styles.BloodText,
                BMtext: styles.BloodText,
                OPtext: styles.BloodText,
                OMtext: styles.BloodText,
                ABPtext: styles.BloodText,
                ABMtext: styles.whiteBloodText,
                blood: type

            })

        }
    }
    gender(gendertype) {
        if (gendertype == 'male') {
            this.setState({
                gender: gendertype, male_G: styles.redgenderTouchable,
                male_text: styles.whitegenderlabels,
                female_G: styles.genderTouchable,
                female_text: styles.genderlabels
            })

        }
        else if (gendertype == 'female') {
            this.setState({
                gender: gendertype, female_G: styles.redgenderTouchable,
                female_text: styles.whitegenderlabels,
                male_G: styles.genderTouchable,
                male_text: styles.genderlabels
            })

        }
    }

    Signup = async () => {
        if (this.state.password == this.state.cpassword) {
            const { name, email, phone, address, password, gender, blood, birthday, birthmonth, birthyear } = this.state
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in!');
                    database().ref('users/' + auth().currentUser.uid + '/informations').set({
                        name: name,
                        email: auth().currentUser.email,
                        phone: phone,
                        address: address,
                        bloodType: blood,
                        gender: gender,
                        image: null,
                        last_donation: {
                            day: 0,
                            month: 0,
                            year: 0
                        },
                        next_donation: {
                            day: 0,
                            month: 0,
                            year: 0
                        },
                        birthday: birthday,
                        birthmonth: birthmonth,
                        birthyear: birthyear
                    })

                    this.props.navigation.navigate('after-login')

                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }

                    console.error(error);
                });
        } else {
            alert('password did not match')
        }
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.theme }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                    <View style={{ paddingHorizontal: calcWidth(125), marginTop: calcHeight(30), alignItems: "center" }}>
                        <Image
                            source={require('../assets/images/BloodLogo.png')}
                            style={{ width: calcWidth(130), height: calcHeight(136) }}
                        />
                    </View>
                    <ImageBackground
                        source={require('../assets/images/Group1867.png')}
                        style={{ width: calcWidth(375), height: calcHeight(1045), flex: 1 }}
                    >

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.NewAccText}>new account</Text>
                        </View>
                        <View style={styles.registerform}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Full Name'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'user', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('name', val)}
                            />

                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Email'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'envelope-o', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('email', val)}

                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('phone', val)}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Adress'
                                placeholderTextColor={Colors.theme}
                                value={this.state.address ? this.state.address.text : ""}
                                rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: 10 }}
                                // onChangeText={val => this.onChangeText('adress', val)}
                                onFocus={() => {
                                    this.props.navigation.navigate("Maps", {
                                        callBack: (region) => {
                                            this.setState({ address: region }, () => { console.log('address:', this.state.address) })
                                        }
                                    })
                                }}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Password'
                                secureTextEntry={true}
                                placeholderTextColor={Colors.theme}
                                placeholderText
                                rightIcon={{ type: 'font-awesome', name: 'lock', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('password', val)}
                            />
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Confirm password'
                                secureTextEntry={true}
                                placeholderTextColor={Colors.theme}
                                placeholderText
                                rightIcon={{ type: 'font-awesome', name: 'lock', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('cpassword', val)}
                            />
                            <View style={{ paddingBottom: calcHeight(25), paddingHorizontal: calcWidth(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Dropdown
                                    label='Day'
                                    data={this.state.day}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    onChangeText={Value => this.onChangeText('birthday', Value)}

                                />
                                <Dropdown
                                    label='Month'
                                    data={this.state.month}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    onChangeText={Value => this.onChangeText('birthmonth', Value)}

                                />
                                <Dropdown
                                    label='Year'
                                    data={this.state.year}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    onChangeText={Value => this.onChangeText('birthyear', Value)}

                                />
                            </View>
                            <Text style={styles.genderText}>Gender</Text>

                            <View style={styles.gender}>
                                <View style={styles.genderButtons}>
                                    <TouchableOpacity style={this.state.male_G} onPress={() => this.gender('male')}>
                                        <Text style={this.state.male_text} >Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={this.state.female_G} onPress={() => this.gender('female')}>
                                        <Text style={this.state.female_text}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.Text}>Blood group type</Text>
                            <View style={styles.row}>
                                <TouchableOpacity style={this.state.APstyle}
                                    onPress={() => this.selectType('A+')}
                                >
                                    <Text style={this.state.APtext}>A+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.AMstyle}
                                    onPress={() => this.selectType('A-')}
                                >
                                    <Text style={this.state.AMtext}>A-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.BPstyle}
                                    onPress={() => this.selectType('B+')}
                                >
                                    <Text style={this.state.BPtext}>B+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.BMstyle}
                                    onPress={() => this.selectType('B-')}
                                >
                                    <Text style={this.state.BMtext}>B-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.OPstyle}
                                    onPress={() => this.selectType('O+')}
                                >
                                    <Text style={this.state.OPtext}>O+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity style={this.state.OMstyle}
                                    onPress={() => this.selectType('O-')}
                                >
                                    <Text style={this.state.OMtext}>O-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.ABPstyle}
                                    onPress={() => this.selectType('AB+')}
                                >
                                    <Text style={this.state.ABPtext}>AB+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.ABMstyle}
                                    onPress={() => this.selectType('AB-')}
                                >
                                    <Text style={this.state.ABMtext}>AB-</Text>
                                </TouchableOpacity>

                            </View>


                            <TouchableOpacity style={styles.TouchableEdit} onPress={() => this.Signup()} >
                                <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Sign up</Text>
                            </TouchableOpacity>
                            <View style={styles.textRow}>
                                <Text style={{ color: "#1F2D50", fontSize: calcWidth(16), marginTop: 20 }}>
                                    Already have an account?
            </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                                    <Text style={{ color: '#DD1107', fontSize: calcWidth(16), marginTop: calcHeight(20) }}>{" "} Login</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </ImageBackground>
                </ScrollView>

            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        height: calcHeight(220),
        width: '100%',
        backgroundColor: '#FD554F',
        alignItems: "center",
        justifyContent: "center"
    },
    imageView: {
        backgroundColor: Colors.theme,
        height: calcHeight(112),
        width: calcWidth(112),
        borderRadius: 56,

    },
    name: {
        fontSize: calcWidth(16),
        color: '#7C7C7C',
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(7),
        // backgroundColor: "red"
    },
    ScrollView: {
        width: Dimensions.get("window").width,
        height: calcHeight(1175),
        justifyContent: "center",
        // backgroundColor: "blue"
    },
    registerform: {
        marginTop: calcHeight(39),
        height: Dimensions.get("screen").height * 0.8,
        padding: 15,
        flex: 1,
    },
    NewAccText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: calcWidth(35),
        color: Colors.theme,
        marginTop: calcHeight(113.48),
        // backgroundColor: "yellow"
    },
    inputContainer: {
        width: calcWidth(325.2),
        height: calcHeight(26.5),
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.theme,
        marginBottom: calcHeight(30.5),
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        fontSize: calcWidth(14)
    },
    gender: {
        marginTop: calcHeight(10),
        flexDirection: "row",
        alignItems: "flex-start",
    },
    genderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: calcWidth(14),
        color: Colors.theme,
        marginLeft: calcWidth(10),
        // marginLeft: calcWidth(30),
        //backgroundColor: "yellow"
    },

    genderButtons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    genderTouchable: {
        backgroundColor: Colors.Whitebackground,
        borderRadius: 10,
        elevation: 2,
        height: calcHeight(43),
        width: calcWidth(121),
        marginHorizontal: calcWidth(10),
        justifyContent: "center",
        alignItems: "center",
    },
    redgenderTouchable: {
        backgroundColor: Colors.theme,
        borderRadius: 10,
        elevation: 2,
        height: calcHeight(43),
        width: calcWidth(121),
        marginHorizontal: calcWidth(10),
        justifyContent: "center",
        alignItems: "center",
    },
    genderlabels: {
        fontSize: calcWidth(18), color: Colors.theme, fontFamily: 'Montserrat-Medium'
    },
    whitegenderlabels: {
        fontSize: calcWidth(18), color: Colors.Whitebackground, fontFamily: 'Montserrat-Medium'
    },
    TouchableEdit: {
        width: calcWidth(195),
        height: calcHeight(49),
        marginTop: calcHeight(40),
        borderRadius: 30,
        backgroundColor: Colors.theme,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        alignSelf: "center"
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: calcHeight(15)
    },
    birthdate: {
        width: calcWidth(100),
        //height: calcHeight(20),
    },
    Text: {
        fontSize: calcWidth(14),
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(30),
        marginLeft: calcWidth(10)
        //marginBottom:15
    },
    row: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: calcHeight(10),
        marginLeft: calcWidth(10)
    },
    BloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.Whitebackground,
        borderWidth: 1,
        elevation: 1.5,
        width: calcWidth(41),
        height: calcHeight(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    redBloodButton: {
        borderRadius: 50,
        borderColor: Colors.Graybackground,
        backgroundColor: Colors.theme,
        borderWidth: 1,
        elevation: 1.5,
        width: calcWidth(41),
        height: calcHeight(41),
        justifyContent: "center",
        alignItems: 'center',
        marginRight: calcWidth(15),
    },
    BloodText: {
        fontSize: calcWidth(16),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.theme,
    },
    whiteBloodText: {
        fontSize: calcWidth(16),
        fontFamily: 'Montserrat-SemiBold',
        color: Colors.Whitebackground,
    },
    BloodbagsNum: {
        marginLeft: calcWidth(37),
        marginRight: calcWidth(28),
        color: Colors.theme,
        fontSize: calcWidth(18)
    },
    ButtonGroupline: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: calcHeight(2.5)
    },
    ButtonGroup: {
        height: calcHeight(32),
        width: calcWidth(82),
        backgroundColor: Colors.theme,
        borderRadius: 10
    },

});