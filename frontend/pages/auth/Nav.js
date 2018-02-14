import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth';
import { View } from '../../utils/elements';

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

class Nav extends React.Component {
  render() {
    return <View style={{justifyContent: 'flex-end', borderBottom: '1px solid black'}}>
             <i className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
                onClick={this.props.SignOut}></i>
           </View>;
  }
}

export default connect(null, mapDispatchToProps)(Nav);
