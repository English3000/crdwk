import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text } from './elements';
import { update } from '../actions/visit';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item))
});

const custom = {
  formLeft: { padding: '5.5px 5px 5px 10px', marginLeft: 50, //make margin dynamic
              borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  formRight: { width: 125, padding: '4px 4px 3.5px 7.5px', fontSize: 15,
               borderTopRightRadius: 10, borderBottomRightRadius: 10 }
};

class Field extends React.Component {
  constructor(props) {
    super(props); const {item, field} = props;
    this.state = {[field]: item[field], revising: false, active: false};
  }

  componentWillMount() {
    const {item, field} = this.props;
    if (!item[field]) this.setState({revising: true});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.length === 1 && this.state[newProps.field] === '') {
      this.setState({ [newProps.field]: newProps.errors[0] });
    } else if (newProps.item !== this.props.item) {
      this.setState({[newProps.field]: newProps.item[newProps.field]});
    }
  }

  render() { //value doesn't persist on refresh
    const {item, field, Update, path, editable, style, color} = this.props;
    const {revising, active} = this.state;
    const value = this.state[field];
    const id = item.id;

    const cursor = revising ? 'pointer' : 'default';
    const colors = revising ? ['#ffff99', 'black', 'white']: [color, color, color];
    const icon = item[field] ? 'pencil' : 'check';

    return <View style={{backgroundColor: color, marginBottom: 5, alignItems: 'center'}}>
      {editable ? [
        <i key='Revise' className={`fa fa-${icon} fa-lg`}
           onClick={() => { if (revising) Update(path, {[field]: value, id});
                            this.setState({revising: false, active: false}); }}
           style={Object.assign({backgroundColor: colors[0], color: colors[1], cursor}, custom.formLeft)}></i>,
        <TextInput key={`${field}`} placeholder={`${field}`} value={value}
                   onClick={() => this.setState({revising: true, active: true})}
                   onMouseEnter={() => this.setState({revising: true})}
                   onMouseLeave={() => {if (item[field] && !active) this.setState({revising: false});}}
                   onBlur={() => {if (item[field]) this.setState({active: false});}}
                   onChange={event => this.setState({ [field]: event.target.value })}
                   onKeyDown={event => {if (event.keyCode === 13 && value.length > 0 && revising) {
                                          Update(path, {[field]: value, id});
                                          this.setState({revising: false, active: false});} }}
                   style={Object.assign({backgroundColor: colors[2]}, custom.formRight, style)}/>
        ] : <Text style={Object.assign({backgroundColor: color}, style)}>{item[field]}</Text> }
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);
