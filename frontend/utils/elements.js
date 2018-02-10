//React Native-style custom components
import React from 'react';

const styles = {
  reset: {margin: 0, padding: 0},
  default: {cursor: 'default'},
  pointer: {cursor: 'pointer'},
};

//this View defaults to `flexDirection: 'row'`
//in React Native, View defaults to `flexDirection: 'column'`
export const View = props => <div {...props} style={Object.assign({}, styles.reset, {display: 'flex'}, props.style)}>
                               {props.children}
                             </div>;

export const Text = props => <p {...props} style={Object.assign({}, styles.reset, props.style)}>
                               {props.children}
                             </p>;

export const TextInput = props => <input {...props} style={Object.assign({}, {display: 'block'}, props.style)}/>;

export class Button extends React.Component {
  constructor() {
    super();
    this.state = {cursor: styles.default};
  }

  render() {
    return <button {...this.props} style={this.state.cursor}
      onClick={this.props.onPress}
      onMouseOver={() => this.setState({cursor: styles.pointer})}
      onMouseOut={() => this.setState({cursor: styles.default})}>
      {this.props.title}
    </button>;
  }
}

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
