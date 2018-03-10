import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, LightBulb, NullBulb } from '../utils/elements';
import Field from '../utils/Field';

const mapStateToProps = ({ data, session }, { match }) => ({
  currentUser: session.currentUser,
  user: data.users[match.params.id],
  ideas: data.ideas
});

const Profile = ({ user, ideas, currentUser, UpdateUser }) => user ? [
  <Field key='nameForm' field='name' item={user} path='users' color='#fff2e6'
         editable={currentUser && user.id === currentUser.id}/>,
  //skeleton page layout //Doesn't dynamically render newly created idea
  <View key='Ideas' style={{justifyContent: 'space-around', width: 600}}>
    {user.ideas.map(id => ideas[id].active ?
    <LightBulb key={ideas[id].id} idea={ideas[id]}/> : null)}
    {currentUser && user.id === currentUser.id ? <NullBulb/> : null}
  </View>,

  <Text key='Copyright' style={{color: '#ffd9b3', marginTop: 5}}>English3000 &copy; 2018</Text>
] : null;

export default connect(mapStateToProps)(Profile);
