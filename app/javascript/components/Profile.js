import React from 'react';
import Header from './auth/Header';
import styles from './styles';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  render () {
    return [
      <Header key='Header'/>,
      this.props.user ? <p key='Details' style={styles.reset}>{this.props.user.email}</p> :
                          <p key='Loading' style={styles.reset}>loading</p>,
      <div key='Profile' style={styles.centered}>
        <p style={{fontSize: 50}}>Profile Page</p>
      </div>
    ];
  }
}

Profile.propTypes = {
  user: PropTypes.object
};

export default Profile;
