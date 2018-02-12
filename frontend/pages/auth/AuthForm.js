import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Text } from '../../utils/elements';
import { signUp, signIn } from '../../actions/auth';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const custom = {
  authForm: {justifyContent: 'space-between', alignItems: 'center'},
  textInput: { fontSize: 13, fontWeight: 500, width: 195, margin: '0 10px', outline: 'none',
               padding: '3px 0 4.5px 7.5px', border: '0.5px solid lightgray', boxSizing: 'border-box'},

  signUp: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderWidth: '0 32px 50px 32px', borderRadius: 0, backgroundColor: 'transparent',
            borderColor: 'transparent transparent lightgray transparent' },
  signIn: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderWidth: '29px 0 29px 50px', borderRadius: 0, backgroundColor: 'transparent',
            borderColor: 'transparent transparent transparent lightgray' },

  errors: {flexDirection: 'column', position: 'absolute', marginTop: 12.5},
  err: {textAlign: 'center', width: 290}
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
        <Button title='Sign Up' style={custom.signUp}
                onClick={() => SignUp({email, password})}/>
        <View style={{flexDirection: 'column'}}>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={Object.assign({}, custom.textInput, {borderRadius: '7.5px 7.5px 0 0'})}/>
          <TextInput placeholder='Password' defaultValue={password} type='password'
                     onChange={event => this.setState({password: event.target.value})}
                     style={Object.assign({}, custom.textInput, {borderRadius: '0 0 7.5px 7.5px'})}/>
        </View>
        <Button title='Sign In' style={custom.signIn}
                onClick={() => SignIn({email, password})}/>
      </View>,
      <View key='Errors' style={custom.errors}>{errors.map(
        err => <Text key={err} style={custom.err}>{`${err}.`}</Text>
      )}</View>
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
