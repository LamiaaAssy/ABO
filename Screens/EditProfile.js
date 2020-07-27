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
import { calcRatio, calcWidth, calcHeight } from '../Dimension'
import Colors from '../assets/Colors';
import { Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import { Avatar } from 'react-native-elements';
import ImageBackground from '../components/Background';
var uuid = require('react-native-uuid');


const options = {
    title: 'Select Photo',

    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class EditProfile extends React.Component {

    componentDidMount() {
        this.getProfiledata()
    }

    state = {
        username: '',
        email: '',
        phone: '',
        gender: '',
        bloodType: '',
        address: '',
        birthday: '',
        birthmonth: '',
        birthyear: '',
        Inputname: "",
        Inputphone: '',
        Inputaddress: '',
        Inputpassword: '',
        Inputgender: '',
        Inputblood: '',
        Inputbirthday: '',
        Inputbirthmonth: '',
        Inputbirthyear: '',
        day: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 },
        { value: 16 }, { value: 17 }, { value: 18 }, { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23 }, { value: 24 }, { value: 25 }, { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 },],
        month: [{ value: 'January' }, { value: 'February' }, { value: 'March' }, { value: 'April' }, { value: 'May' }, { value: 'June' }, { value: 'July' }, { value: 'August' }, { value: 'September' }, { value: 'October' }, { value: 'November' }, { value: 'December' }],
        year: [{ value: 1950 }, { value: 1951 }, { value: 1952 }, { value: 1953 }, { value: 1954 }, { value: 1955 }, { value: 1956 }, { value: 1957 }, { value: 1958 },
        { value: 1959 }, { value: 1960 }, { value: 1961 }, { value: 1962 }, { value: 1963 }, { value: 1964 }, { value: 1965 }, { value: 1966 }, { value: 1967 }, { value: 1968 }, { value: 1969 }, { value: 1970 }, { value: 1971 }, { value: 1972 }, { value: 1973 },
        { value: 1974 }, { value: 1975 }, { value: 1976 }, { value: 1977 }, { value: 1978 }, { value: 1979 }, { value: 1980 }, { value: 1981 }, { value: 1982 }, { value: 1983 }, { value: 1984 },
        { value: 1985 }, { value: 1986 }, { value: 1987 }, { value: 1988 }, { value: 1989 }, { value: 1990 }, { value: 1991 }, { value: 1992 }, { value: 1993 }, { value: 1994 }, { value: 1995 }, { value: 1996 }, { value: 1997 }, { value: 1998 }, { value: 1999 }, { value: 2000 }, { value: 2001 }, { value: 2002 }],

        image: null
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    getProfiledata = async () => {

        database()
            .ref('users/' + auth().currentUser.uid + '/informations')
            .on('value', snapshot => {
                console.log('User data in edit profile : ', snapshot.val());

                this.setState({
                    username: snapshot.val().name,
                    phone: snapshot.val().phone,
                    gender: snapshot.val().gender,
                    bloodType: snapshot.val().bloodType,
                    address: snapshot.val().address.text,
                    birthday: snapshot.val().birthday,
                    birthmonth: snapshot.val().birthmonth,
                    birthyear: snapshot.val().birthyear,
                    image: snapshot.val().image,
                    Inputname: snapshot.val().name,
                    Inputphone: snapshot.val().phone,
                    Inputaddress: snapshot.val().address.text,
                    Inputgender: snapshot.val().gender,
                    Inputblood: snapshot.val().bloodType,
                    Inputbirthday: snapshot.val().birthday,
                    Inputbirthmonth: snapshot.val().birthmonth,
                    Inputbirthyear: snapshot.val().birthyear

                })
            });
    }

    EditProfile = async () => {
        database().ref('users/' + auth().currentUser.uid + '/informations').update({
            name: this.state.Inputname,
            phone: this.state.Inputphone,
            bloodType: this.state.bloodType,
            gender: this.state.gender,
            image: this.state.image,
            birthday: this.state.Inputbirthday,
            birthmonth: this.state.Inputbirthmonth,
            birthyear: this.state.Inputbirthyear
        }).then(database().ref('users/' + auth().currentUser.uid + '/informations/address').update({
            text: this.state.Inputaddress,
        })).then(this.props.navigation.navigate('Profile'))

        this.getProfiledata()

    }

    selectphoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
            } else {
                //global.source = { uri: response.uri };

                //alert(JSON.stringify(response.uri));
                this.setState({ image: response.uri })
                this.upload(response.uri)
            }
        });
    }
    upload = async (uri) => {
        console.log("upload function")
        const blob = await new Promise((resolve, rejrct) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response)
            };
            xhr.onerror = function () {
                rejrct(new TypeError('Request failed'))
            };
            xhr.responseType = 'blob';
            xhr.open('Get', uri, true);

            xhr.send(null)
        });

        const id = uuid.v4()
        console.log("id===>", id)
        var imageref = storage().ref().child('users/' + id)
        return imageref.put(blob).then(() => {
            blob.close()
            return imageref.getDownloadURL()
        }).then((callback) => {
            database().ref('users/' + auth().currentUser.uid + '/informations/image').set(callback).then(
                this.setState({ image: response.uri })
            )

        })

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Whitebackground }}>
                <ImageBackground>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
                        {/* start headr */}
                        <View style={styles.headr}>
                            <TouchableOpacity style={styles.headrAssets}>
                                <Image source={require('../assets/images/gear.png')} style={{ height: "100%", width: "100%" }} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.headrAssets}></TouchableOpacity> */}
                        </View>
                        {/* end headr */}

                        <View style={styles.imageContainer}>
                            {this.state.image != null ? <Avatar source={{ uri: this.state.image }} size={140} rounded onPress={() => this.selectphoto()} /> : <Icon name='camera' color='#48494B' size={50} style={{ color: Colors.LightGray }} onPress={() => this.selectphoto()} />}
                            <Text style={styles.name}> {this.state.username} </Text>
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
                                <Text style={styles.rightText}>{this.state.bloodType}</Text>
                            </View>

                        </View>
                        <View style={{ height: calcHeight(20), backgroundColor: Colors.Whitebackground, width: "100%" }}>

                        </View>

                        <View style={styles.personalinformations}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Name'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'user', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('Inputname', val)}
                            >
                                {this.state.username}
                            </Input>
                            <View style={{ paddingBottom: calcHeight(25), paddingHorizontal: calcWidth(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Dropdown
                                    label='Day'
                                    data={this.state.day}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    value={this.state.Inputbirthday}
                                    onChangeText={Value => this.onChangeText('Inputbirthday', Value)}

                                />
                                <Dropdown
                                    label='Month'
                                    data={this.state.month}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    value={this.state.Inputbirthmonth}
                                    onChangeText={Value => this.onChangeText('Inputbirthmonth', Value)}

                                />
                                <Dropdown
                                    label='Year'
                                    data={this.state.year}
                                    containerStyle={styles.birthdate}
                                    textColor={Colors.textCard}
                                    fontSize={calcWidth(16)}
                                    labelFontSize={calcWidth(16)}
                                    baseColor={Colors.theme}
                                    value={this.state.Inputbirthyear}
                                    onChangeText={Value => this.onChangeText('Inputbirthyear', Value)}

                                />
                            </View>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Phone Number'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'phone', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('Inputphone', val)}
                            >
                                {this.state.phone}
                            </Input>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainer}
                                placeholder='Adress'
                                placeholderTextColor={Colors.theme}
                                rightIcon={{ type: 'font-awesome', name: 'map-marker', color: Colors.theme }}
                                rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                                onChangeText={val => this.onChangeText('Inputaddress', val)}
                            >
                                {this.state.address}
                            </Input>
                        </View>
                        <View style={styles.gender}>
                            <Text style={styles.genderText}>Gender</Text>
                            <View style={styles.genderButtons}>
                                <TouchableOpacity style={styles.generTouchable}>
                                    <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Female</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.generTouchable}>
                                    <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Male</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.TouchableEdit} onPress={() => this.EditProfile()}>
                            <Text style={{ fontSize: calcWidth(20), color: "#fff", fontFamily: 'Montserrat-Medium' }}>Done</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </ImageBackground>
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
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 63,
    },
    name: {
        fontSize: calcWidth(16),
        color: Colors.textCard,
        fontFamily: 'Montserrat-Medium',
        marginTop: calcHeight(7),
        // backgroundColor: "red"
    },
    informations: {
        height: calcHeight(65),
        width: "100%",
        borderTopColor: Colors.Grayborder,
        borderBottomColor: Colors.Grayborder,
        borderTopWidth: calcHeight(1),
        borderBottomWidth: calcHeight(1),
        flexDirection: "row"
    },
    left: {
        // backgroundColor: "red",
        height: "100%",
        width: "50%",
        borderRightColor: Colors.Grayborder,
        borderRightWidth: calcWidth(1),
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
        fontSize: calcWidth(10),
        color: Colors.DrakText
    },
    numbers: {
        fontFamily: "Montserrat-Bold",
        fontSize: calcWidth(17),
        color: Colors.theme
    },
    birthdate: {
        width: calcWidth(100),
        //height: calcHeight(20),
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
        fontSize: calcWidth(16),
        color: Colors.DrakText
    },
    ScrollView: {
        paddingBottom: 50,
        paddingHorizontal: 10,

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
        marginVertical: calcHeight(7),
    },
    inputStyle: {
        color: Colors.theme,
        fontFamily: 'Montserrat-Medium',
    },
    gender: {
        marginTop: calcHeight(10),
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
        fontSize: calcWidth(20),
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
        marginHorizontal: calcWidth(10),
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

