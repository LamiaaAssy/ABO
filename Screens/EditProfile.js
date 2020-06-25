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
        dateOfBirth: '',
        Inputname: "",
        Inputphone: '',
        Inputaddress: '',
        Inputpassword: '',
        Inputgender: '',
        Inputblood: '',
        InputdateOfBirth: '',
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
                    address: snapshot.val().address,
                    dateOfBirth: snapshot.val().dateOfBirth,
                    image: snapshot.val().image,
                    Inputname: snapshot.val().name,
                    Inputphone: snapshot.val().phone,
                    Inputaddress: snapshot.val().address,
                    Inputgender: snapshot.val().gender,
                    Inputblood: snapshot.val().bloodType,
                    InputdateOfBirth: snapshot.val().dateOfBirth,

                })
            });
    }

    EditProfile = async () => {
        database().ref('users/' + auth().currentUser.uid + '/informations').update({
            name: this.state.Inputname,
            phone: this.state.Inputphone,
            address: this.state.Inputaddress,
            bloodType: this.state.bloodType,
            gender: this.state.gender,
            image: this.state.image,
        }).then(this.props.navigation.navigate('Profile'))

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
            //  alert(JSON.stringify('open'));
            xhr.send(null)
        });
        //alert(JSON.stringify(id))

        var imageref = storage().ref().child('users/')
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
                {/* start headr */}
                <View style={styles.headr}>
                    <TouchableOpacity style={styles.headrAssets}>
                        <Image source={require('../assets/images/gear.png')} style={{ height: "100%", width: "100%" }} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.headrAssets}></TouchableOpacity> */}
                </View>
                {/* end headr */}

                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageView} onPress={() => this.selectphoto()}>
                        {this.state.image != null ? <Image source={{ uri: this.state.image }} style={styles.image} /> : <Icon name='camera' color='#48494B' size={30} />}
                    </TouchableOpacity>
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
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollView}>
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

                        <Input
                            inputStyle={styles.inputStyle}
                            inputContainerStyle={styles.inputContainer}
                            placeholder='Birthdat Date'
                            placeholderTextColor={Colors.theme}
                            placeholderText
                            rightIcon={{ type: 'font-awesome', name: 'calendar', color: Colors.theme }}
                            rightIconContainerStyle={{ marginRight: calcWidth(10) }}
                            onChangeText={val => this.onChangeText('InputdateOfBirth', val)}
                        >
                            {this.state.dateOfBirth}
                        </Input>

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
        height: calcHeight(104),
        width: calcWidth(114),
        borderRadius: 63,
        borderWidth: calcWidth(1),
        borderColor: Colors.InnerBorder,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
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
        width: Dimensions.get("window").width,
        paddingBottom: calcHeight(50),
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

