//React Native-style custom components
import React from 'react';
import styles from './styles';

//React          flexDirection: 'row'
//React Native   flexDirection: 'column'
export const View = props => <div {...props} style={Object.assign({}, styles.reset, {display: 'flex'}, props.style)}>
                               {props.children}
                             </div>;

export const Text = props => <p {...props} style={Object.assign({}, styles.reset, props.style)}>
                               {props.children}
                             </p>;

export const TextInput = props => <input {...props} style={Object.assign({}, {display: 'block'}, props.style)}/>;

//React          onClick
//React Native   onPress
export class Button extends React.Component {
  constructor() {
    super();
    this.state = {cursor: styles.default};
  }

  render() {
    const {style, title} = this.props;

    return <button {...this.props} style={Object.assign({}, this.state.cursor, style)}
      onMouseOver={() => this.setState({cursor: styles.pointer})}
      onMouseOut={() => this.setState({cursor: styles.default})}>
      {title}
    </button>;
  }
}

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
