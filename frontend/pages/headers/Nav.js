import React from 'react';
import { connect } from 'react-redux';
import { View } from '../../utils/elements';
import { signOut } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});
// no Home icon on Home page.
const Nav = ({ currentUser, SignOut }) => (
  <View style={{justifyContent: 'flex-end', borderBottom: '1px solid black'}}>
    {currentUser ? <i className='fa fa-sign-out fa-lg' onClick={SignOut}
                      style={{cursor: 'pointer'}}></i> : null}
  </View>
);

export default connect(null, mapDispatchToProps)(Nav);
