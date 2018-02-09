import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, ErrorBoundary } from '../../utils/elements';
import { signUp, signIn } from '../../actions/auth';

const mapStateToProps = ({ errors }) => ({
  errors
});

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    return [
      <View key='AuthForm' style={{display: 'flex'}}>
        <Button onClick={() => SignUp({email, password})}>
          Sign Up
        </Button>
        <View>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={{display: 'block'}}/>
          <TextInput placeholder='Password' defaultValue={password}
                     onChange={event => this.setState({password: event.target.value})}/>
        </View>
        <Button onClick={() => SignIn({email, password})}>
          Sign In
        </Button>
      </View>,
      errors.map(err => <Text key={err}>{`${err}.`}</Text>)
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
