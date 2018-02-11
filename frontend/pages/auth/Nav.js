import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth';
import styles from '../../utils/styles';

const mapDispatchToProps = dispatch => ({
  SignOut: user => dispatch(signOut(user))
});

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {cursor: styles.default};
  }

  render() {
    return <i className='fa fa-sign-out fa-lg' style={this.state.cursor}
              onMouseOver={() => this.setState({cursor: styles.pointer})}
              onMouseOut={() => this.setState({cursor: styles.default})}
              onClick={this.props.SignOut}></i>;
  }
}


export default connect(null, mapDispatchToProps)(Nav);
