import React from 'react';

const styles = {
  reset: {margin: 0, padding: 0},
  centered: { display: 'flex', flex: 1, height: 800,
              justifyContent: 'center', alignItems: 'center' },
  visibility: {
    false: {color: 'white', backgroundColor: 'white'},
    true: {color: 'black', backgroundColor: 'lightgray'},
  }
};

// COMPONENT w/o actions or custom elements
// Server-side rendering only renders HTML faster than the browser
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '',
                   visibility: styles.visibility.false };
  }

  render() {
    const {visibility, email, password} = this.state;

    return <div id='App' style={{fontFamily: ''}}>
      <div key='AuthForm' style={{display: 'flex'}}>
        <button onClick={event => event.preventDefault()}>Sign Up</button>
        <div>
          <input placeholder='Email' defaultValue={email} autoFocus
                 onChange={event => this.setState({email: event.target.value})}
                 style={{display: 'block'}}/>
          <input placeholder='Password' defaultValue={password}
                 onChange={event => this.setState({password: event.target.value})}/>
        </div>
        <button onClick={event => event.preventDefault()}>Sign In</button>
      </div>,
      <div key='Home' style={Object.assign({}, styles.reset, styles.centered, visibility)}
           onMouseOver={() => this.setState({visibility: styles.visibility.true})}
           onMouseOut={() => this.setState({visibility: styles.visibility.false})}>
        <p style={Object.assign({}, styles.reset, {fontSize: 50})}>Page</p>
      </div>
    </div>;
  }
}
