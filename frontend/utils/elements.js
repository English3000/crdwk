//React Native-style custom components
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // Color-styling resource ~ https://www.w3schools.com/colors/colors_picker.asp
import { visit, create } from '../actions/visit';
//React          flexDirection: 'row'
//React Native   flexDirection: 'column'
export const View = props => <div {...props} style={Object.assign({display: 'flex'}, props.style)}>
                               {props.children}
                             </div>;

const pageStyle = { flexDirection: 'column', alignItems: 'center',
                    backgroundColor: '#fff2e6', height: window.innerHeight };

export const Page = props => <View {...props} style={Object.assign({}, pageStyle, props.style)}></View>;

const listStyle = {overflowY: 'scroll', display: 'flex', flexDirection: 'column'};
export const ScrollView = props => <View {...props} style={Object.assign({}, listStyle, props.style)}></View>;

//React          <FlatList itemdata={...} itemrender={item => item.key}
//React Native   <FlatList data={...} renderItem={({item})} => item.key}
export const FlatList = props => <View {...props} style={Object.assign({}, listStyle, props.style)}>
                                   {props.itemrender(props.itemdata)}
                                 </View>;
// use diff. names b/c React's `data` converts attribute to string
//  & `renderitem` won't accept a function

export const Text = props => <p {...props} style={Object.assign({display: 'flex', margin: 0, padding: 0}, props.style)}>
                               {props.children}
                             </p>;

const textInputStyle = { display: 'block', outline: 'none', border: 'none', margin: 0,
                         fontSize: 13, padding: '3px 5px 4.5px 7.5px', fontFamily: 'Roboto' };

export const TextInput = props => props.multiline === 'true' ?
//make textarea dynamically resize
<textarea {...props} style={Object.assign({resize: 'none', height: 43.5 * props.numberoflines}, textInputStyle, props.style)}></textarea> :
<input {...props} style={Object.assign({}, textInputStyle, props.style)}/>;

//React          onClick
//React Native   onPress
export const Button = props => <button {...props} style={Object.assign({cursor: 'pointer', outline: 'none', border: 'none'}, props.style)}>
                                 {props.title}
                               </button>;

//Source: http://cssdeck.com/labs/light-bulb
const bulbStyle = {
  container: { flexDirection: 'column', alignItems: 'center', borderRadius: '100%',
               justifyContent: 'flex-end', display: 'flex', cursor: 'pointer' },
  top: { width: 85, height: 110, border: 0, borderRadius: '100%',
         backgroundColor: '#ffff99', boxShadow: '0 0 2px #e6e6e6' },
  bottom: { marginTop: -25.5, marginLeft: 0.5, width: 25.5, height: 0,
            borderLeft: '23px solid transparent',
        	  borderRight: '23px solid transparent',
        	  borderTop: '55px solid #f2f2f2' },
  form: { width: 85, height: 139.5, backgroundColor: '#f2f2f2',
          flexDirection: 'column' },
  errors: { backgroundColor: 'red', width: 85, fontSize: 13, cursor: 'pointer',
            boxSizing: 'border-box', flexDirection: 'column', paddingBottom: 5 },
  err: { margin: 5, marginBottom: 0, textAlign: 'center',
         color: 'white', fontWeight: 300 }
};

const lightbulbDispatchProps = dispatch => ({
  Visit: (path, id) => dispatch(visit(path, id))
});
const Lightbulb = ({ Visit, idea, style }) => ( //does `to` b4 `onClick`
  <Link to={`/ideas/${idea.id}`} onClick={() => Visit('ideas', idea.id)}
        style={Object.assign({}, bulbStyle.container, style)}>
    <View style={Object.assign({backgroundImage: idea.cover_photo}, bulbStyle.top)}></View>
    <View style={bulbStyle.bottom}></View>
    <View style={{position: 'absolute'}}>
      <Text style={{width: 27.5, marginTop: -45, textAlign: 'center'}}>
        {idea.name}
      </Text>
    </View>
  </Link>
);
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
  }

  render() {
    const {form, showErrors, name, body, cover_photo, user_id} = this.state;
    const {Create, errors, style} = this.props;

    return form ? <View style={Object.assign({flexDirection: 'column'}, style)}>
      <View style={bulbStyle.form}>
        <TextInput placeholder='idea' defaultValue={name} style={{marginBottom: 1}}
                   onChange={event => this.setState({name: event.target.value})}/>
        <TextInput placeholder='description' defaultValue={body}
                   multiline='true' numberoflines={2}
                   onChange={event => this.setState({body: event.target.value})}/>
        <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <i className='fa fa-picture-o fa-lg' style={{marginLeft: 9.85}}></i>
          <i className='fa fa-check fa-lg'
             onClick={() => Create('ideas', {name, body, cover_photo, user_id}).then(
               res => {if (res instanceof Array) { this.setState({showErrors: true}); }
                       else { this.setState({form: false}); }}
          )} style={{backgroundColor: '#ffff99', padding: '5px 11.25px', width: 20, cursor: 'pointer'}}></i>
        </View>
      </View>
      {showErrors ? <View onClick={() => this.setState({showErrors: false})}
                          style={Object.assign({}, bulbStyle.errors, style)}>
        {errors.map(err => <Text key={err} style={bulbStyle.err}>{`${err}.`}</Text> )}
      </View> : null}
    </View> :
    <View onClick={() => this.setState({form: true})} style={Object.assign({}, bulbStyle.container, style)}>
      <View style={Object.assign({}, bulbStyle.top, {backgroundColor: 'white'})}></View>
      <View style={bulbStyle.bottom}></View>
      <View style={{position: 'absolute'}}>
        <i className='fa fa-plus fa-lg' style={{marginTop: -35}}></i>
      </View>
    </View>;
  }
}
export const NullBulb = connect(nullbulbState, nullbulbDispatchProps)(Nullbulb);

export class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {error: null};
  }

  componentDidCatch(error) { this.setState({error}); }

  render() { return this.state.error ?
    <Text>{this.state.error.toString()}</Text> : this.props.children;
  }
}
