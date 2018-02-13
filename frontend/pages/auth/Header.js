import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const headerStyle = {
  position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
  width: '100%', boxSizing: 'border-box', backgroundColor: 'white',
  justifyContent: 'space-between', alignItems: 'center',
  borderBottom: '1px solid black'
};

const Header = ({ currentUser }) => [
  currentUser ? <Nav key='Nav'/> :
  <View key='Auth' style={headerStyle}>
    <Text>Make it happen.</Text>
    <View style={{display: 'block'}}>
      <AuthForm />
    </View>
    <Text style={{fontWeight: 700}}>crdwk</Text>
  </View>,

  <View key='placeholder' style={{height: 86.5}}></View>,
];

export default connect(mapStateToProps, null)(Header);
