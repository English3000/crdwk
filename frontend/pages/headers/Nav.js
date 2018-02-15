import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { View, TextInput } from '../../utils/elements';
import { signOut } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

const navStyle = { position: 'fixed', bottom: 5, width: '100%',
                   justifyContent: 'space-between', alignItems: 'end' };

const Nav = ({ currentUser, SignOut }) => (
  <View style={navStyle}>
    <i></i>
    <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
      <i className='fa fa-search' style={{position: 'fixed', marginRight: 5}}></i>
      <TextInput style={{border: 'none', borderRadius: 2.5, paddingRight: 25}}/>
    </View>
    {currentUser ? <i className='fa fa-sign-out fa-lg' onClick={SignOut}
                      style={{cursor: 'pointer'}}></i> : <i></i>}
  </View>
);

export default connect(null, mapDispatchToProps)(Nav);
