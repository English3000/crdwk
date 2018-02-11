import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button, Text, ErrorBoundary } from '../../utils/elements';
import { signUp, signIn } from '../../actions/auth';

//accessing errors from the store
const mapStateToProps = ({ errors }) => ({ errors });

//setting up imported actions to dispatch to the store
const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

// COMPONENT
class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    return [
      <View key='AuthForm' style={{justifyContent: 'space-between', alignItems: 'center', width: 300}}>
        <Button id='sign-up' title='Sign Up' onClick={() => SignUp({email, password})}/>
        <View style={{display: 'block'}}>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}/>
          <TextInput placeholder='Password' defaultValue={password}
                     onChange={event => this.setState({password: event.target.value})}/>
        </View>
        <Button id='sign-in' title='Sign In' onClick={() => SignIn({email, password})}/>
      </View>,
      errors.map(err => <Text key={err} style={{textAlign: 'center', width: 300}}>
                          {`${err}.`}
                        </Text>)
    ];
  }
}

// CONTAINER
export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
