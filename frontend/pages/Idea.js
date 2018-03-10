import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../utils/elements';
import Field from '../utils/Field';
import { update } from '../actions/visit';

const mapStateToProps = ({ data, session }, { match }) => ({
  idea: data.ideas[match.params.id],
  currentUser: session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  UpdateIdea: (idea, path = 'ideas') => dispatch(update(path, idea))
});

const custom = {
  ideaBox: { flexDirection: 'column', width: 400, height: 200, borderRadius: 15,
             alignItems: 'center', justifyContent: 'center', backgroundColor: 'whitesmoke' }
};

class Idea extends React.Component {
  render() {
    const {idea, currentUser, UpdateIdea} = this.props;
    const editable = idea && currentUser && idea.user_id === currentUser.id;

    return idea ? [
      //comments here
      //display in page center
      <View key='Idea' style={Object.assign({backgroundImage: idea.cover_photo}, custom.ideaBox)}>
        <Field field='name' item={idea} Update={UpdateIdea} editable={editable}
               style={{fontWeight: 700}} color='whitesmoke'/>
        <Field field='body' item={idea} Update={UpdateIdea} editable={editable}
               color='whitesmoke'/>
      </View>
    ] : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
