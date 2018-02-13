import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Text } from '../../utils/elements';
import { signUp, signIn } from '../../actions/auth';
import styles from '../../utils/styles';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const custom = {
  authForm: {justifyContent: 'space-between', alignItems: 'center'},
  textInput: { fontSize: 13, fontWeight: 500, width: 195, margin: '0 10px', outline: 'none',
               padding: '3px 0 4.5px 7.5px', border: '0.5px solid lightgray', boxSizing: 'border-box'},

  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: {borderWidth: '0 32px 50px 32px', borderColor: 'transparent transparent gainsboro transparent'},
  signIn: {borderWidth: '29px 0 29px 50px', borderColor: 'transparent transparent transparent gainsboro'},

  buttonText: {position: 'absolute', fontSize: 15, cursor: 'pointer'},
  signUpText: {marginTop: 17.25, marginLeft: 19, textAlign: 'center'},
  signInText: {marginTop: 20.5, marginLeft: 0},

  errors: { flexDirection: 'column', position: 'absolute',
            border: '1px solid black', borderTop: '1px solid white',
            marginTop: 12.5, marginLeft: 72.75, padding: '0 5px 5px' },
  err: {textAlign: 'center', width: 188, color: 'red', fontWeight: 700}
};

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    return [
      <View key='AuthForm' style={custom.authForm}>
        <View>
          <Button style={Object.assign({}, custom.button, custom.signUp)}
                  onClick={() => SignUp({email, password})}/>
          <Text style={Object.assign({}, custom.buttonText, custom.signUpText)}
                onClick={() => SignUp({email, password})}>Sign<br/>Up</Text>
        </View>

        <View style={{flexDirection: 'column'}}>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={Object.assign({}, custom.textInput, styles.topRounded)}/>
          <TextInput placeholder='Password' defaultValue={password} type='password'
                     onChange={event => this.setState({password: event.target.value})}
                     style={Object.assign({}, custom.textInput, styles.bottomRounded)}/>
        </View>

        <View>
          <Button style={Object.assign({}, custom.button, custom.signIn)}
                  onClick={() => SignIn({email, password})}/>
          <Text style={Object.assign({}, custom.buttonText, custom.signInText)}
                onClick={() => SignIn({email, password})}>Sign In</Text>
        </View>
      </View>,

      errors.length > 0 ? <View key='Errors' style={Object.assign({}, custom.errors, styles.bottomRounded)}>
        {errors.map(err => <Text key={err} style={custom.err}>{`${err}.`}</Text>)}
      </View> : null
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
