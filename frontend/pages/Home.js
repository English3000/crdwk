import React from 'react';
import { View, Text } from '../utils/elements';
import Header from './auth/Header';
import styles from '../utils/styles';

export default () => [
  <Header key='Header'/>,

  <View key='Home' style={Object.assign({}, styles.centered, {height: window.innerHeight})}>
    <Text style={{fontSize: 50}}>Home Page</Text>
  </View> //height doesn't dynamically resize (unimportant for placeholder)
];
