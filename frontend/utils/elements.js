//React Native-style custom components
import React from 'react'; // Color-styling resource ~ https://www.w3schools.com/colors/colors_picker.asp
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

export const Text = props => <p {...props} style={Object.assign({display: 'flex', margin: 0, padding: 0, fontFamily: 'Roboto'}, props.style)}>
                               {props.children}
                             </p>;

const textInputStyle = { display: 'block', outline: 'none', border: 'none', margin: 0,
                         fontSize: 13, padding: '3px 5px 4.5px 7.5px', fontFamily: 'Roboto' };

export const TextInput = props => props.multiline ? <textarea {...props} style={Object.assign(
  {resize: 'none', height: 43.5 * props.numberoflines}, textInputStyle, props.style
)}></textarea> : <input {...props} style={Object.assign({}, textInputStyle, props.style)}/>;
//make textarea dynamically resize

//React          onClick
//React Native   onPress
export const Button = props => <button {...props} style={Object.assign({cursor: 'pointer', outline: 'none', border: 'none'}, props.style)}>
                                 {props.title}
                               </button>;

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
