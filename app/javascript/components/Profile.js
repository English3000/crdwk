import React from 'react';
import Header from './auth/Header';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Profile extends React.Component {
  static propTypes = {user: PropTypes.object};

  render() {
    const {user} = this.props;

    return [
      <Header key='Header'/>,

      user ? <p key='Details' style={Object.assign({backgroundColor: 'ghostwhite'}, styles.reset)}>
               {user.email}
             </p> : <p key='Loading' style={styles.reset}>loading</p>,

      <div key='Profile' style={styles.centered}>
        <p style={{fontSize: 50}}>Profile Page loading...</p>
      </div>
    ];
  }
}
