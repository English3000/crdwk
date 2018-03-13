import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../utils/elements';
import Field from '../utils/Field';
import { update } from '../actions/rest';

const mapStateToProps = ({ data, session }, { match }) => ({
  idea: data.ideas[match.params.id],
  currentUser: session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item))
});

const custom = {
  ideaBox: { flexDirection: 'column', width: 400, minHeight: 200,
             borderRadius: 15, alignItems: 'center', justifyContent: 'center',
             backgroundSize: 'cover', backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat' }
};

class Idea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: !(props.idea && props.idea.cover_photo)};
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  uploadPhoto(event) { //will need workaround for React Native
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => this.props.Update('ideas',
      Object.assign({}, this.props.idea, {cover_photo: reader.result})
    ).then( () => this.setState({visible: false}) );
    if (file) reader.readAsDataURL(file);
  }

  render() {
    const {idea, currentUser, UpdateIdea} = this.props;
    const editable = idea && currentUser && idea.user_id === currentUser.id;

    return idea ? [
      //comments here
      editable && this.state.visible ?
      <i className='fa fa-picture-o fa-lg' key='Upload'
         onClick={() => document.getElementById('upload').click() }
         onMouseEnter={() => this.setState({visible: true})}
         style={{position: 'absolute', marginLeft: -355, marginTop: 10, cursor: 'pointer', backgroundColor: 'white', borderRadius: 2}}>
        <input type='file' id='upload' style={{display: 'none'}}
               onChange={this.uploadPhoto}/>
      </i> : null,
      <View key='Idea' style={Object.assign({ backgroundImage: `url(${idea.cover_photo})`,
                                              backgroundColor: idea.cover_photo ? 'transparent' : 'whitesmoke'}, custom.ideaBox)}
            onMouseOver={() => this.setState({visible: true})}
            onMouseOut={() => this.setState({visible: false})}>
        <Field field='name' item={idea} path='ideas' editable={editable}
               color={idea.cover_photo ? 'transparent' : 'whitesmoke'}
               text={{fontWeight: 700, textShadow: '0 0 5px white'}}
               style={{marginBottom: 7.5}}/>
        <Field field='body' item={idea} path='ideas' editable={editable}
               multiline='true' numberoflines={1.5}
               color={idea.cover_photo ? 'transparent' : 'whitesmoke'}
               text={{textShadow: '0 0 5px white'}}/>
      </View>
    ] : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
