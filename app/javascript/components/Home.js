import React from 'react';
import styles from './styles';
import Header from './auth/Header';

// COMPONENT w/o actions or custom elements
// Server-side rendering only renders HTML faster than the browser
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = { visibility: styles.hidden };
  }

  render() {
    return [
      <Header key='Header'/>,
      <div key='Home' style={Object.assign({}, styles.centered, this.state.visibility)}
           onMouseOver={() => this.setState({visibility: styles.visible})}
           onMouseOut={() => this.setState({visibility: styles.hidden})}>
        <p style={{fontSize: 50}}>Home Page</p>
      </div>
    ];
  }
}
