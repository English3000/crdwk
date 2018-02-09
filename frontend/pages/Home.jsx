import React from 'react';
//custom elements mimicking React Native's
import { View, Text, ErrorBoundary } from '../utils/elements';
import AuthForm from './home/AuthForm';

const styles = {
  centered: { display: 'flex', flex: 1, height: 800,
              justifyContent: 'center', alignItems: 'center' },
  visibility: {
    false: {color: 'white', backgroundColor: 'white'},
    true: {color: 'black', backgroundColor: 'lightgray'},
  }
};

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {visibility: styles.visibility.false};
  }

  render() {
    const {visibility} = this.state;

    return [
      <AuthForm key='AuthForm'/>,
      <View key='Home' style={Object.assign({}, styles.centered, visibility)}
            onMouseOver={() => this.setState({visibility: styles.visibility.true})}
            onMouseOut={() => this.setState({visibility: styles.visibility.false})}>
        <Text style={{fontSize: 50}}>Page</Text>
      </View> //placeholder
    ];
  }
}
