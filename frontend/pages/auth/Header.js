import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';
import styles, { height } from '../../utils/styles';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

//current Auth height: 44px
const Header = ({ currentUser, style }) => [
  currentUser ? <Nav key='Nav'/> :
  <View key='Auth' style={Object.assign({}, {justifyContent: 'space-between'}, styles.header)}>
    <Text>Make it happen</Text>
    <View style={{display: 'block'}}>
      <AuthForm />
    </View>
    <Text>crdwk</Text>
  </View>,
  <View key='placeholder' style={Object.assign({height: height * 0.1}, style)}></View>,
];

export default connect(mapStateToProps, null)(Header);
