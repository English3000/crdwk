import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '' };
  }

  render() {
    const {email, password} = this.state;

    return <div style={Object.assign({}, {display: 'flex', justifyContent: 'space-between'}, this.props.style)}>
      <p>Make it happen</p>
      <div style={{display: 'flex', justifyContent: 'space-between',
                   alignItems: 'center', width: 300}}>
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
      </div>
      <p>crdwk</p>
    </div>;
  }
}
