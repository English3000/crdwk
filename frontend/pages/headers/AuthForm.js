import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { View, Button, TextInput, Text } from '../../utils/elements';
import { signUp, signIn, RECEIVE_ERRORS } from '../../actions/auth';

const mapStateToProps = ({ session, errors }) => ({
  authToken: session.authToken, errors
});

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const custom = {
  authForm: {justifyContent: 'space-between', alignItems: 'center'},
  textInput: { fontWeight: 500, width: 195, margin: '0 10px',
               border: '2px solid #ffd24d', boxSizing: 'border-box' },

  topRounded: {borderTopLeftRadius: 7.5, borderTopRightRadius: 7.5, borderBottomWidth: 1},
  bottomRounded: {borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5, borderTopWidth: 1},

  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: {borderWidth: '0 32px 50px 32px', borderColor: 'transparent transparent #ffd24d transparent'},
  signIn: {borderWidth: '29px 0 29px 50px', borderColor: 'transparent transparent transparent #ffd24d'},

  buttonText: {position: 'absolute', fontSize: 13, cursor: 'pointer'},
  signUpText: { marginTop: 16, marginLeft: 20, textAlign: 'center', color: 'white',
                fontWeight: 300, textShadow: '0 0 1px whitesmoke' },
  signInText: {marginTop: 20.25, marginLeft: 0.5, fontWeight: 600},

  errors: { flexDirection: 'column', position: 'absolute', backgroundColor: '#ffff99',
            marginTop: 12.5, marginLeft: 72.75, padding: 5, cursor: 'pointer' },
  err: {width: 188, display: 'block', textAlign: 'center', color: 'red', margin: '5px 0'}
};                     //or `alignItems: 'center'`??

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '', showErrors: false,
                   signUpShadow: 'none', signInShadow: 'none' };
    this.addShadow = this.addShadow.bind(this);
    this.removeShadow = this.removeShadow.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  render() {
    const {email, password, showErrors, signUpShadow, signInShadow} = this.state;
    const {SignUp, SignIn, authToken, errors} = this.props;

    return [
      <View key='AuthForm' style={custom.authForm}>
        <View onClick={() => this.handleAuth(SignUp)}>
          <Button onMouseOver={this.addShadow} onMouseOut={this.removeShadow}
                  style={Object.assign({}, custom.button, custom.signUp, {boxShadow: signUpShadow})}/>
          <Text onMouseOver={this.addShadow} onMouseOut={this.removeShadow}
                style={Object.assign({}, custom.buttonText, custom.signUpText)}>
            Sign<br/>Up
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <TextInput placeholder='Email' defaultValue={email}
                     onChange={this.handleEmailInput} autoFocus
                     style={Object.assign({}, custom.textInput, custom.topRounded)}/>
          <TextInput placeholder='Password' defaultValue={password}
                     onChange={this.handlePasswordInput} type='password'
                     onKeyDown={event => {if (event.keyCode === 13) this.handleAuth(SignIn);} }
                     style={Object.assign({}, custom.textInput, custom.bottomRounded)}/>
          <TextInput type='hidden' name='authenticity_token' value={authToken}/>
        </View>

        <View onClick={() => this.handleAuth(SignIn)}>
          <Button style={Object.assign({}, custom.button, custom.signIn, {boxShadow: signInShadow})}/>
          <Text style={Object.assign({}, custom.buttonText, custom.signInText)}>
            Sign In
          </Text>
        </View>
      </View>,

      errors.length > 0 && showErrors ?
      <View key='Errors' style={Object.assign({}, custom.errors, custom.bottomRounded)}
                         onClick={() => this.setState({showErrors: false})}>
        {errors.map(err => <Text key={err} style={custom.err}>{`${err}.`}</Text>)}
      </View> : null
    ];
  }

  handleAuth(fn) {
    const {email, password} = this.state;

    fn({email, password}).then(action => {
      if (action && action.type === RECEIVE_ERRORS) { this.setState({showErrors: true});
    } else { this.props.history.push(`/users/${action.data.user.id}`); }
    });
  }

  addShadow() {
    if (this.state.signInShadow !== 'none') this.setState({
      signInShadow: 'none',
      signUpShadow: '0 0 5px orange'
    });
  }

  removeShadow() {
    if (this.state.signUpShadow !== 'none') this.setState({
      signUpShadow: 'none',
      signInShadow: '0 0 5px orange'
    });
  }

  handleEmailInput(event) { //could check for regex
    const email = event.target.value;

    if (!email.includes('@') || !email.includes('.')) {
      this.setState({signInShadow: 'none', email});
    } else if (this.state.password.length > 7) {
      this.setState({signInShadow: '0 0 5px orange', email});
    } else { this.setState({email}); }
  }

  handlePasswordInput(event) {
    const {email} = this.state;
    const password = event.target.value;

    if (password.length > 7 && email.includes('@') && email.includes('.')) {
      this.setState({signInShadow: '0 0 5px orange', password});
    } else { this.setState({signInShadow: 'none', password}); }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthForm));
