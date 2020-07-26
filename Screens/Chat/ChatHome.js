import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';
import Card from '../../components/Cards/ChatCard';
import Header from '../../components/Header';
import { Avatar } from 'react-native-elements';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import ImageBackground from '../../components/Background';

export default class ChatHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      myId: auth().currentUser.uid,
      data: [],
    }
  }

  onChangeText = name => this.setState({ name });

  componentWillMount() {

    let { myId } = this.state

    database()
      .ref('/Chat')
      .on('value', snapshot => {
        let myChats = [];

        for (var key in snapshot.val()) {

          if (snapshot.val()[key].user1 == myId || snapshot.val()[key].user2 == myId) {
            let anotherUserId = snapshot.val()[key].user1 != myId ?
              snapshot.val()[key].user1 : snapshot.val()[key].user2

            let anotherUserName = ''
            let anotherUserImage = null
            let newKey = key

            database()
              .ref('/users/' + anotherUserId + '/informations')
              .on('value', snapshot1 => {
                anotherUserName = snapshot1.val().name
                anotherUserImage = snapshot1.val().image
                console.log('keysss:::: ', newKey)

                let mynewchat =
                {
                  image: anotherUserImage,

                  name: anotherUserName,

                  message:
                    snapshot.val()[newKey].messages != null ?
                      snapshot.val()[newKey].messages[snapshot.val()[newKey].messages.length - 1].text : 'Hey there! I am using ABO',

                  time:
                    snapshot.val()[newKey].messages != null ?
                      moment(snapshot.val()[newKey].messages[snapshot.val()[newKey].messages.length - 1].createdAt).fromNow() : '',

                  id: newKey,

                  anotherUser: anotherUserId,

                }

                console.log('User data: ', mynewchat)
                myChats.push(mynewchat)
                this.setState({ data: myChats })
              })

          }

        }

      });

  }

  render() {

    let filterChats = this.state.data.filter((singleChat) => {
      return singleChat.name.includes(this.state.name.trim())
    })

    return (

      <SafeAreaView style={styles.container} >

        <Header title={"Chats"} navigation={this.props.navigation} />
        <ImageBackground>
          <View style={{ marginTop: calcHeight(10), alignItems: 'center' }} >
            {/* search by name */}
            <TextInput
              style={styles.nameInput}
              placeholder='Search by name ...'
              placeholderTextColor={Colors.theme}
              onChangeText={this.onChangeText}
              value={this.state.name}
            />

          </View>
          {/* <Card /> */}

          <FlatList
            data={filterChats}
            renderItem={({ item }) => <Card
              navigation={this.props.navigation}
              id={item.id}
              anotherUser={item.anotherUser}
              name={item.name}
              time={item.time}
              message={item.message}
              image={item.image} />}
          />
        </ImageBackground>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: Colors.Graybackground,
  },

  header:
  {
    flexDirection: 'row',
    backgroundColor: Colors.Graybackground,
    alignItems: 'center',
    width: calcWidth(375),
    height: calcHeight(35),
    marginTop: calcHeight(47),

  },
  backbutton:
  {
    backgroundColor: Colors.Graybackground,
    width: calcWidth(18),
    height: calcHeight(30),
    marginLeft: calcWidth(25),
    alignItems: 'center',

  },
  backicon:
  {

    width: calcWidth(17.61),
    height: calcHeight(30),

  },
  title:
  {
    fontFamily: 'Roboto-Medium',
    fontSize: calcWidth(18),
    color: Colors.theme,
    marginLeft: calcWidth(20),

  },
  nameInput: {
    fontSize: calcWidth(14),
    fontFamily: 'Montserrat-Medium',
    color: Colors.theme,
    width: calcWidth(325),
    marginTop: calcHeight(20),
    marginBottom: calcHeight(25),
    borderColor: Colors.theme,
    borderBottomWidth: calcWidth(1),

  },

});



