import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Text } from '../../utils/elements';
import { signUp, signIn, RECEIVE_ERRORS } from '../../actions/auth';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const custom = {
  authForm: {justifyContent: 'space-between', alignItems: 'center'},
  textInput: { fontWeight: 500, width: 195, margin: '0 10px',
               border: '2px solid #ffd24d', boxSizing: 'border-box' },

  topRounded: {borderTopLeftRadius: 7.5, borderTopRightRadius: 7.5},
  bottomRounded: {borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5},

  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: {borderWidth: '0 32px 50px 32px', borderColor: 'transparent transparent #ffd24d transparent'},
  signIn: {borderWidth: '29px 0 29px 50px', borderColor: 'transparent transparent transparent #ffd24d'},

  buttonText: {position: 'absolute', fontSize: 13, cursor: 'pointer'},
  signUpText: { marginTop: 16, marginLeft: 20, textAlign: 'center', color: 'white',
                fontWeight: 300, textShadow: '0 0 1px whitesmoke' },
  signInText: {marginTop: 20.25, marginLeft: 0.5, fontWeight: 600},

  errors: { flexDirection: 'column', position: 'absolute', backgroundColor: '#ffffb3',
            marginTop: 12.5, marginLeft: 72.75, padding: 5, cursor: 'pointer' },
  err: {width: 188, display: 'block', textAlign: 'center', color: 'red', margin: '5px 0'}
};                     //or `alignItems: 'center'`??

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: '', visible: false};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    return [
      <View key='AuthForm' style={custom.authForm}>
        <View onClick={() => SignUp({email, password}).then(action => {
          if (action.type === RECEIVE_ERRORS) this.setState({visible: true});
        })}>
          <Button style={Object.assign({}, custom.button, custom.signUp)}/>
          <Text style={Object.assign({}, custom.buttonText, custom.signUpText)}>
            Sign<br/>Up
          </Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={Object.assign({}, custom.textInput, {borderBottomWidth: 1}, custom.topRounded)}/>
          <TextInput placeholder='Password' defaultValue={password} type='password'
                     onChange={event => this.setState({password: event.target.value})}
                     style={Object.assign({}, custom.textInput, {borderTopWidth: 1}, custom.bottomRounded)}/>
        </View>

        <View onClick={() => SignIn({email, password}).then(action => {
          if (action.type === RECEIVE_ERRORS) this.setState({visible: true});
        })}>
          <Button style={Object.assign({}, custom.button, custom.signIn)}/>
          <Text style={Object.assign({}, custom.buttonText, custom.signInText)}>
            Sign In
          </Text>
        </View>
      </View>,

      errors.length > 0 && this.state.visible ?
      <View key='Errors' style={Object.assign({}, custom.errors, custom.bottomRounded)}
                         onClick={() => this.setState({visible: false})}>
        {errors.map(err => <Text key={err} style={custom.err}>{`${err}.`}</Text>)}
      </View> : null
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
