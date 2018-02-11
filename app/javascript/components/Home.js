import React from 'react';

const styles = {
  reset: {margin: 0, padding: 0},
  centered: {display: 'flex', justifyContent: 'center', alignItems: 'center', height: 800},
  hidden: {color: 'white', backgroundColor: 'white'},
  visible: {color: 'black', backgroundColor: 'lightgray'},
};

// COMPONENT w/o actions or custom elements
// Server-side rendering only renders HTML faster than the browser
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '',
                   visibility: styles.hidden };
  }

  render() {
    const {visibility, email, password} = this.state;

    return [
      <div key='AuthForm' style={Object.assign({}, {display: 'flex'}, {justifyContent: 'space-between', alignItems: 'center', width: 300})}>
        <button onClick={event => event.preventDefault()}>Sign Up</button>
        <div>
          <input placeholder='Email' defaultValue={email} autoFocus
                 onChange={event => this.setState({email: event.target.value})}
                 style={{display: 'block'}}/>
          <input placeholder='Password' defaultValue={password}
                 onChange={event => this.setState({password: event.target.value})}
                 style={{display: 'block'}}/>
        </div>
        <button onClick={event => event.preventDefault()}>Sign In</button>
      </div>,
      <div key='Home' style={Object.assign({}, styles.reset, styles.centered, visibility)}
           onMouseOver={() => this.setState({visibility: styles.visible})}
           onMouseOut={() => this.setState({visibility: styles.hidden})}>
        <p style={Object.assign({}, styles.reset, {fontSize: 50})}>Home Page</p>
      </div>
    ];
  }
}
