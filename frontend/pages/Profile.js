import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, LightBulb } from '../utils/elements';
import Field from '../utils/Field';
import { updateUser } from '../actions/auth';

const mapStateToProps = ({ data, session }, { match }) => ({
  user: data.users[match.params.id], currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  UpdateUser: user => dispatch(updateUser(user))
});

const Profile = ({ user, currentUser, UpdateUser }) => [
  <Field key='nameForm' field='name' item={user} Update={UpdateUser}
         editable={currentUser && user.id === currentUser.id}/>,
  //skeleton page layout
  <View key='Ideas' style={{justifyContent: 'space-around', width: 600}}>
    {user.ideas.map(idea => idea.active ?
    <LightBulb key={idea.id} idea={idea}/> : null)}
  </View>,

  <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
];

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
