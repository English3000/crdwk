import React from 'react';
import Header from './auth/Header';
import styles from './styles';

export default () => [
  <Header key='Header'/>,

  <div key='Home' style={Object.assign({}, styles.centered)}>
    <p style={{fontSize: 50}}>Home Page loading...</p>
  </div>
];
