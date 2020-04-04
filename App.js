import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from "react-native";
import Stack from "./Navigation/Stack"



export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <Stack />
      </>
    )
  }
}

