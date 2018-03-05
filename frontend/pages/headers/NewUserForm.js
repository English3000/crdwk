import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button } from '../../utils/elements';
import { updateUser } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  UpdateUser: user => dispatch(updateUser(user))
});

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', id: props.currentUser.id};
  }

  render() { //style Button; value doesn't persist on refresh
    const {UpdateUser} = this.props;

    return <View style={{backgroundColor: '#fff2e6'}}>
      <TextInput placeholder='Name' value={this.state.name}
                 onChange={event => this.setState({name: event.target.value})}
                 onKeyDown={event => {if (event.keyCode === 13) UpdateUser(this.state);}}/>
      <Button title='Save' onClick={() => UpdateUser(this.state)}/>
    </View>;
  }
}

export default connect(null, mapDispatchToProps)(NewUserForm);
