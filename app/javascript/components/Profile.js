import React from 'react';
import Header from './auth/Header';
import styles from './styles';
import PropTypes from 'prop-types';

const Profile = ({ user }) => [
  <Header key='Header'/>,

  user ? <p key='Details' style={styles.reset}>{user.email}</p> :
           <p key='Loading' style={styles.reset}>loading</p>,

  <div key='Profile' style={styles.centered}>
    <p style={{fontSize: 50}}>Profile Page loading...</p>
  </div>
];

Profile.propTypes = {user: PropTypes.object};

export default Profile;
