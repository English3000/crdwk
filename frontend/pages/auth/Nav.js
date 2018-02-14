import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

class Nav extends React.Component {
  render() {
    return <i className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
              onClick={this.props.SignOut}></i>;
  }
}


export default connect(null, mapDispatchToProps)(Nav);
