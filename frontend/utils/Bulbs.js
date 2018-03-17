import React from 'react';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { View, Text, TextInput, ErrorBoundary } from './elements';
import { visit, create } from '../actions/rest';
//Source: http://cssdeck.com/labs/light-bulb
const bulbStyle = {
  container: { flexDirection: 'column', alignItems: 'center', borderRadius: '100%',
               justifyContent: 'flex-end', display: 'flex', cursor: 'pointer' },
  top: { width: 85, height: 110, border: 0, borderRadius: '100%',
         backgroundColor: '#ffff99', backgroundSize: 'cover',
         backgroundPosition: 'center', backgroundRepeat: 'no-repeat' },
  bottom: { marginTop: -24, marginLeft: 0.5, width: 25.5, height: 0,
            borderLeft: '23px solid transparent',
        	  borderRight: '23px solid transparent',
        	  borderTop: '55px solid #f2f2f2' },
  text: { display: 'inline-block', width: 45, marginTop: -45, fontSize: 14,
          textAlign: 'center', overflowWrap: 'break-word', overflowY: 'scroll' },
  form: { width: 85, height: 139.5, backgroundColor: '#f2f2f2',
          flexDirection: 'column' },
  errors: { backgroundColor: 'red', width: 85, fontSize: 13, cursor: 'pointer',
            boxSizing: 'border-box', flexDirection: 'column', paddingBottom: 5,
            position: 'absolute', marginTop: 139.5 },
  err: { margin: 5, marginBottom: 0, textAlign: 'center',
         color: 'white', fontWeight: 300 }
};

const lightbulbDispatchProps = dispatch => ({
  Visit: (path, id) => dispatch(visit(path, id))
});
const Lightbulb = ({ Visit, idea, style }) => {//does `to` b4 `onClick`
  const boxShadow = idea.cover_photo ? '0 0 2px yellow' : '0 0 2px #e6e6e6';

  return <ErrorBoundary>
    <HashLink to={`/ideas/${idea.id}#0`} onClick={() => Visit('ideas', idea.id)}
              scroll={element => element.scrollIntoView({ behavior: 'instant', block: 'center' })}
              style={Object.assign({}, bulbStyle.container, style)}>
      <View style={Object.assign({backgroundImage: `url(${idea.cover_photo})`, boxShadow}, bulbStyle.top)}></View>
      <View style={bulbStyle.bottom}></View>
      <View style={{position: 'absolute'}}>
        <Text style={bulbStyle.text}>{idea.name}</Text>
      </View>
    </HashLink>
  </ErrorBoundary>;
};

export const LightBulb = connect(null, lightbulbDispatchProps)(Lightbulb);

const nullbulbState = ({ session, errors }) => ({errors, cuId: session.currentUser.id});
const nullbulbDispatchProps = dispatch => ({
  Create: (path, idea) => dispatch(create(path, idea))
});
class Nullbulb extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', body: '', cover_photo: '', user_id: props.cuId,
                   form: false, showErrors: false };
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  uploadPhoto(event) { //will need workaround for React Native
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => this.setState({cover_photo: reader.result});
    if (file) reader.readAsDataURL(file);
  }

  render() {
    const {form, showErrors, name, body, cover_photo, user_id} = this.state;
    const {Create, errors, style} = this.props;

    return <ErrorBoundary>
      {form ? <View style={Object.assign({flexDirection: 'column'}, style)}>
        <View style={bulbStyle.form}>
          <TextInput placeholder='idea' defaultValue={name} autoFocus style={{marginBottom: 1}}
                     onChange={event => this.setState({name: event.target.value})}/>
          <TextInput placeholder='description' defaultValue={body}
                     multiline='true' numberoflines={2}
                     onChange={event => this.setState({body: event.target.value})}/>
          <View style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: cover_photo ? 'lightgreen' : 'transparent'}}>
            <i className='fa fa-picture-o fa-lg'
               onClick={() => document.getElementById('upload').click()}
               style={{marginLeft: 9.85, cursor: 'pointer'}}>
              <input type='file' id='upload' style={{display: 'none'}}
                     onChange={this.uploadPhoto}/>
            </i>
            <i className='fa fa-check fa-lg'
               onClick={() => Create('ideas', {name, body, cover_photo, user_id}).then(
                 res => {if (res instanceof Array) { this.setState({showErrors: true}); }
                         else { this.setState({form: false, name: '', body: '', cover_photo: ''}); }}
            )} style={{backgroundColor: '#ffff99', padding: '5px 11.25px', width: 20, cursor: 'pointer'}}></i>
          </View>
        </View>
        {showErrors ? <View onClick={() => this.setState({showErrors: false})}
                            style={bulbStyle.errors}>
          {errors.map(err => <Text key={err} style={bulbStyle.err}>{`${err}.`}</Text> )}
        </View> : null}
      </View> :
      <View onClick={() => this.setState({form: true})} style={Object.assign({}, bulbStyle.container, style)}>
        <View style={Object.assign({}, bulbStyle.top, {backgroundColor: 'white'})}></View>
        <View style={bulbStyle.bottom}></View>
        <View style={{position: 'absolute'}}>
          <i className='fa fa-plus fa-lg' style={{marginTop: -35}}></i>
        </View>
      </View>}
    </ErrorBoundary>;
  }
}
export const NullBulb = connect(nullbulbState, nullbulbDispatchProps)(Nullbulb);
