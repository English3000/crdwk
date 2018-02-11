import React from 'react';
import { View, Text } from '../utils/elements';
import Header from './auth/Header';
import styles from '../utils/styles';

export default () => [
  <Header key='Header'/>,
  <View key='Profile' style={styles.centered}>
    <Text style={{fontSize: 50}}>Profile Page</Text>
  </View> //placeholder
];
