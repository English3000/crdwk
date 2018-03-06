//React Native-style custom components
import React from 'react';
import { Link } from 'react-router-dom'; // Color-styling resource ~ https://www.w3schools.com/colors/colors_picker.asp
//React          flexDirection: 'row'
//React Native   flexDirection: 'column'
export const View = props => <div {...props} style={Object.assign({display: 'flex'}, props.style)}>
                               {props.children}
                             </div>;

const pageStyle = { flexDirection: 'column', backgroundColor: '#fff2e6',
                    height: window.innerHeight };

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

const textInputStyle = { display: 'block', outline: 'none', border: 'none',
                         fontSize: 13, padding: '3px 0 4.5px 7.5px' };

export const TextInput = props => <input {...props} style={Object.assign({}, textInputStyle, props.style)}/>;

//React          onClick
//React Native   onPress
export const Button = props => <button {...props} style={Object.assign({cursor: 'pointer'}, props.style)}>
                                 {props.title}
                               </button>;

//Source: http://cssdeck.com/labs/light-bulb
const bulbStyle = {
  container: { flexDirection: 'column', alignItems: 'center', borderRadius: '100%',
               justifyContent: 'flex-end', cursor: 'pointer' },
  top: { width: 85, height: 110, border: 0, borderRadius: '100%',
         backgroundColor: 'radial-gradient(yellow, whitesmoke)' },
  bottom: { marginTop: -25.5, width: 27.5, height: 0,
            borderLeft: '23px solid transparent',
        	  borderRight: '23px solid transparent',
        	  borderTop: '55px solid whitesmoke' }
};
export const LightBulb = ({idea, history}) => (
  <View onClick={() => history.push(`/ideas/${idea.id}`)}
        style={bulbStyle.container}>
    <View style={Object.assign({backgroundImage: idea.cover_photo}, bulbStyle.top)}></View>
    <View style={bulbStyle.bottom}></View>
    <View style={{position: 'absolute'}}>
      <Text style={{width: 27.5, marginTop: -45}}>{idea.name}</Text>
    </View>
  </View>
);

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
