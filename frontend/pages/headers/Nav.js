import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { View, TextInput } from '../../utils/elements';
import { signOut } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

const navStyle = { position: 'fixed', bottom: 7.5, width: '100%', margin: '0 -5px',
                   justifyContent: 'space-between', alignItems: 'end' };

const Nav = ({ currentUser, SignOut }) => (
  <View style={navStyle}>
    <View style={{width: 20}}></View>

    <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
      <TextInput style={{border: 'none', borderRadius: 2.5, paddingRight: 25}}/>
      <i className='fa fa-search' style={{position: 'fixed', marginRight: 5}}></i>
    </View>

    <View style={{width: 20}}>
      {currentUser ? <i className='fa fa-sign-out fa-lg' onClick={SignOut}
                        style={{cursor: 'pointer'}}></i> : null}
    </View>
  </View>
);

export default connect(null, mapDispatchToProps)(Nav);
