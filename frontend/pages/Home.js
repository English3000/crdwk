import React from 'react';
import { View, Text } from '../utils/elements';
import Header from './auth/Header';
import styles from '../utils/styles';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {visibility: styles.hidden};
  }

  render() {
    const {visibility} = this.state;

    return [
      <Header key='Header'/>,
      <View key='Home' style={Object.assign({}, styles.centered, visibility)}
            onMouseOver={() => this.setState({visibility: styles.visible})}
            onMouseOut={() => this.setState({visibility: styles.hidden})}>
        <Text style={{fontSize: 50}}>Home Page</Text>
      </View> //placeholder
    ];
  }
}
