import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from '../utils/elements';
import Field from '../utils/Field';
import { LightBulb, NullBulb } from '../utils/Bulbs';

const mapStateToProps = ({ data, session }, { match }) => ({
  currentUser: session.currentUser,
  user: data.users[match.params.id],
  ideas: data.ideas
});

const Profile = ({ user, ideas, currentUser, UpdateUser }) => user ? [
  <Field key='nameForm' field='name' item={user} path='users' color='#fff2e6'
         editable={currentUser && user.id === currentUser.id} style={{marginBottom: 10}}/>,
  //skeleton page layout
  <View key='Ideas' style={{justifyContent: 'center', width: 750, flexWrap: 'wrap',
                            backgroundImage: user.ideas.map(id => ideas[id].cover_photo)}}>
    {currentUser && user.id === currentUser.id ?
      <NullBulb style={{margin: '0 25px 10px'}}/> : null}
    {user.ideas.map(id => ideas[id].active ?
      <LightBulb key={ideas[id].id} idea={ideas[id]}
                 style={{margin: '0 25px 10px'}}/> : null)}
  </View>,

  <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
] : null;

export default connect(mapStateToProps)(Profile);
