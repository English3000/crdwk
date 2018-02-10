//React Native-style custom components
import React from 'react';

const styles = {
  reset: {margin: 0, padding: 0},
  mouse: {
    pointer: {cursor: 'pointer'},
    default: {cursor: 'default'}
  }

};

export const View = props => <div {...props} style={Object.assign({}, styles.reset, {display: 'flex'}, props.style)}>
                               {props.children}
                             </div>;

export const Text = props => <p {...props} style={Object.assign({}, styles.reset, props.style)}>
                               {props.children}
                             </p>;

export const TextInput = props => <input {...props} style={Object.assign({}, {display: 'block'}, props.style)}/>;

export const Button = props => <button {...props} onClick={props.onPress}>
                                 {props.title}
                               </button>;

export class ErrorBoundary extends React.Component {
 constructor() {
   super();
   this.state = {error: null};
 }

 componentDidCatch(error) { this.setState({error}); }

 render() {
   return this.state.error ?
     <Text>{this.state.error.toString()}</Text> : this.props.children;
 }
}
