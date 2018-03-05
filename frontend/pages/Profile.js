import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../utils/elements';
import NewUserForm from './headers/NewUserForm';

const mapStateToProps = ({ data, session }, { match }) => ({
  user: data.users[match.params.id],
  currentUser: session.currentUser
});

const Profile = props => [
  props.user.name ?
  <Text key='Details' style={{fontStyle: 'italic'}}>{props.user.name}</Text> :
  props.user.id === props.currentUser.id ?
  <NewUserForm key='Form' currentUser={props.currentUser}/> : null,

  <View key='Ideas' style={{justifyContent: 'space-around'}}>
    {props.user.ideas.map(idea => idea.active ?
    <Text key={idea.id}>{idea.name}</Text> : null)}
  </View>,

  <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
];

export default connect(mapStateToProps)(Profile);
