import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { calcRatio, calcWidth, calcHeight } from '../../Dimension';
import Colors from '../../assets/Colors';
import Card from '../../components/Cards/ChatCard';




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
        
        {/* start headr */}
        <View style={styles.header}>

          {/* back button */}
          <TouchableOpacity style={styles.backbutton}>
            <Image source={require('../../assets/images/right.png')} style={styles.backicon} />
          </TouchableOpacity>

          {/* label */}
          <Text style={styles.title}>Chats</Text>
          {/* end headr */}
        </View>


        <View style={{ marginTop: calcHeight(10), alignItems: 'center' }} >
          {/* search by name */}
          <TextInput
            style={styles.nameInput}
            placeholder='Search by name ...'
            placeholderTextColor= {Colors.theme}
            onChangeText={this.onChangeText}
            value={this.state.name}
          />

        </View>
              
        {/* <Card /> */}

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Card name={item.name} time={item.time} message={item.message} image={item.image} />}
        />


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
    borderBottomWidth: 1,

  },

});


