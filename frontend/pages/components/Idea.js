import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ErrorBoundary } from '../../utils/elements';
import Field from '../../utils/Field';
import { update } from '../../actions/rest';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
});

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item))
});

const custom = {
  ideaBox: { flexDirection: 'column', width: 400, minHeight: 200,
             borderRadius: 15, alignItems: 'center', justifyContent: 'center',
             backgroundSize: 'cover', backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat' },
  uploadStyle: { position: 'absolute', marginLeft: -355, cursor: 'pointer',
                 backgroundColor: 'white', borderRadius: 2 }
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
    const {idea, comments, currentUser, id} = this.props;
    const editable = idea && currentUser && idea.user_id === currentUser.id;

    return <ErrorBoundary>
      {idea ? <View id={id} style={Object.assign({ backgroundImage: `url(${idea.cover_photo})`,
                                                 backgroundColor: idea.cover_photo ?
                                                   'transparent' : 'whitesmoke' }, custom.ideaBox)}
                          onMouseOver={() => this.setState({visible: true})}
                          onMouseOut={() => this.setState({visible: false})}>
          {editable && this.state.visible ?
          <i className='fa fa-picture-o fa-lg' style={custom.uploadStyle}
             onClick={() => document.getElementById('upload').click() }
             onMouseEnter={() => this.setState({visible: true})}>
            <input type='file' id='upload' style={{display: 'none'}}
                   onChange={this.uploadPhoto}/>
          </i> : null}
          <Field field='name' item={idea} path='ideas' style={{marginBottom: 7.5}}
                 text={{fontWeight: 700, textShadow: '0 0 5px white'}}
                 color={idea.cover_photo ? 'transparent' : 'whitesmoke'}/>
          <Field field='body' item={idea} path='ideas' multiline='true'
                 text={{textShadow: '0 0 5px white'}}
                 color={idea.cover_photo ? 'transparent' : 'whitesmoke'}/>
        </View> : null}
    </ErrorBoundary>;
    //requesting an idea prompts a message modal--can express how one wants to contribute
    //visiting Idea page displays most recent revision at page center (prob. via an anchor tag)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Idea);
