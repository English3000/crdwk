import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text } from './elements';
import { update } from '../actions/visit';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item))
});

const custom = {
  formLeft: { padding: '5.25px 5px 5.25px 10px', borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10 },
  formRight: { width: 100, padding: '4.5px 5px 4px 5px', fontSize: 15,
               borderTopRightRadius: 10, borderBottomRightRadius: 10,
               textAlign: 'center' }
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
    const { item, field, Update, path, editable, text,
            style, color, multiline, numberoflines } = this.props;
    const {revising, active} = this.state;
    const value = this.state[field];
    const id = item.id;

    const cursor = revising ? 'pointer' : 'default';
    const colors = revising ? ['#ffff99', 'black', 'white']: [color, color, color];
    const icon = item[field] ? 'pencil' : 'check';
    const border = `1px solid ${revising ? 'whitesmoke' : 'transparent'}`;
    const borderRight = `1px solid ${revising ? '#ffff99' : 'transparent'}`;
    const borderLeft = `1px solid ${revising ? 'white' : 'transparent'}`;

    return <View style={Object.assign({backgroundColor: color, marginBottom: 5, marginLeft: editable ? -35 : 0, alignItems: 'center'}, style)}>
      {editable ? [
        <i key='Revise' className={`fa fa-${icon} fa-lg`}
           onClick={() => { if (revising) Update(path, {[field]: value, id});
                            this.setState({revising: false, active: false}); }}
           style={Object.assign({ backgroundColor: colors[0], color: colors[1], cursor, border, borderRight },
                                custom.formLeft, numberoflines ? {paddingTop: 21.75 * numberoflines - 3.5, paddingBottom: 21.75 * numberoflines - 4} : {})}></i>,
        <TextInput key={`${field}`} placeholder={`${field}`} value={value}
                   multiline={`${multiline}`} numberoflines={numberoflines}
                   onClick={() => this.setState({revising: true, active: true})}
                   onMouseEnter={() => this.setState({revising: true})}
                   onMouseLeave={() => {if (item[field] && !active) this.setState({revising: false});}}
                   onBlur={() => {if (item[field]) this.setState({active: false});}}
                   onChange={event => this.setState({ [field]: event.target.value })}
                   onKeyDown={event => {if (event.keyCode === 13 && value.length > 0 && revising && !multiline) {
                                          Update(path, {[field]: value, id});
                                          this.setState({revising: false, active: false});} }}
                   style={Object.assign({backgroundColor: colors[2], border, borderLeft}, text, custom.formRight)}/>
        ] : <Text style={Object.assign({backgroundColor: color, width: 125, textAlign: 'center', display: 'block'}, text)}>{item[field]}</Text> }
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);
