import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../utils/elements';

const mapStateToProps = ({ data, session }, { match }) => ({
  idea: data.ideas[match.params.id],
  currentUser: session.currentUser,
});

const custom = {
  ideaBox: { flexDirection: 'column', width: 400, height: 200, borderRadius: 15,
             alignItems: 'center', justifyContent: 'center', backgroundColor: 'whitesmoke' }
};

class Idea extends React.Component {
  render() {
    const {idea} = this.props;

    return idea ? [
      //comments here
      //display in page center
      <View key='Idea' style={Object.assign({backgroundImage: idea.cover_photo}, custom.ideaBox)}>
        <Text style={{fontWeight: 700}}>{idea.name}</Text>
        <Text>{idea.body}</Text>
      </View>
    ] : null;
  }
}

export default connect(mapStateToProps)(Idea);
