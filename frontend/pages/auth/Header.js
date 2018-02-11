import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const Header = ({ currentUser }) => currentUser ? <Nav/> :
<View style={{justifyContent: 'space-between'}}>
  <Text>Make it happen</Text>
  <View style={{display: 'block'}}>
    <AuthForm />
  </View>
  <Text>crdwk</Text>
</View>;

export default connect(mapStateToProps, null)(Header);
