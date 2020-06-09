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




export default class ChatHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          image: require('../../assets/images/PP.jpeg'),
          name: 'Lamiaa Hamdy',
          message: 'Hello, I need your help can you call me',
          time: '5 min ago',
        },
        {
          image: require('../../assets/images/PP.jpeg'),
          name: 'Lamiaa Hamdy',
          message: 'Hello, I need your help can you call me',
          time: '5 min ago',
        },
        {
          image: require('../../assets/images/PP.jpeg'),
          name: 'Lamiaa Hamdy',
          message: 'Hello, I need your help can you call me',
          time: '5 min ago',
        },
        {
          image: require('../../assets/images/PP.jpeg'),
          name: 'Lamiaa Hamdy',
          message: 'Hello, I need your help can you call me',
          time: '5 min ago',
        },
        {
          image: require('../../assets/images/PP.jpeg'),
          name: 'Lamiaa Hamdy',
          message: 'Hello, I need your help can you call me',
          time: '5 min ago',
        },

      ]
    }
  }

  state = {
    name: '',
  };
  onChangeText = name => this.setState({ name });

  render() {
    return (

      <SafeAreaView style={styles.container} >

        <Header title={"Chats"} navigation={this.props.navigation} />

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
        <ScrollView>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Card name={item.name} time={item.time} message={item.message} image={item.image} />}
        />

        </ScrollView>


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


