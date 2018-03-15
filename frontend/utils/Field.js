import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text } from './elements';
import { create, update } from '../actions/rest';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item)),
  Create: (path, item) => dispatch(create(path, item))
});

const custom = {
  formStyle: { width: 100, padding: '4.5px 5px 4px', fontSize: 15,
               textAlign: 'center' },
  roundLeft: {borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
  roundRight: {borderTopRightRadius: 10, borderBottomRightRadius: 10}
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
    //editable shouldn't be passed in
    const { item, field, Update, Create, path, editable, text,
            style, color, multiline, numberoflines, isForm } = this.props;
    const {revising, active} = this.state;
    const value = this.state[field];
    const id = item.id;

    const cursor = revising ? 'pointer' : 'default';
    const colors = revising ? ['#ffff99', 'black', 'white']: [color, color, color];
    const icon = item[field] ? 'pencil' : 'check';
    const border = `1px solid ${revising ? 'whitesmoke' : 'transparent'}`;
    const borderRight = `1px solid ${revising ? '#ffff99' : 'transparent'}`;
    const borderLeft = `1px solid ${revising ? 'white' : 'transparent'}`;

    const iconStyle = Object.assign( { backgroundColor: colors[0], cursor,
                                       color: colors[1], border, borderRight },
                        numberoflines ? { paddingTop: 21.75 * numberoflines - 3.5,
                                          paddingBottom: 21.75 * numberoflines - 4 } : {}
    );

    return <View style={Object.assign({backgroundColor: color, marginBottom: 5, marginLeft: editable ? -35 : 0, alignItems: 'center'}, style)}>
      {editable ? [
        isForm ? null :
        <i key='Revise' className={`fa fa-${icon} fa-lg`}
           onMouseEnter={() => this.setState({revising: true})}
           onMouseLeave={() => {if (item[field]) this.setState({revising: false});}}
           onClick={() => { if (active) Update(path, {[field]: value, id});
                            this.setState({revising: false, active: false}); }}
           style={Object.assign({padding: '5.25px 5px 5.25px 10px'}, iconStyle, custom.roundLeft)}></i>,
        <TextInput key={`${field}`} placeholder={`${field}`} value={value}
                   multiline={`${multiline}`} numberoflines={numberoflines}
                   onClick={() => this.setState({revising: true, active: true})}
                   onMouseEnter={() => this.setState({revising: true})}
                   onMouseLeave={() => {if (item[field] && !active) this.setState({revising: false});}}
                   onBlur={() => {if (item[field]) this.setState({revising: false});}}
                   onChange={event => this.setState({ [field]: event.target.value })}
                   onKeyDown={event => {if (event.keyCode === 13 && value.length > 0 && active && !multiline) {
                                          Update(path, {[field]: value, id});
                                          this.setState({revising: false, active: false});} }}
                   style={Object.assign({backgroundColor: colors[2], border, borderLeft},
                          text, custom.formStyle, isForm ? custom.roundLeft : custom.roundRight)}/>,
        isForm ? <i key='Create' className={`fa fa-${icon} fa-lg`}
                    onMouseEnter={() => this.setState({revising: true})}
                    onMouseLeave={() => {if (item[field]) this.setState({revising: false});}}
                    onClick={() => { if (active) Create(path, {[field]: value, id});
                                     this.setState({revising: false, active: false}); }}
                    style={Object.assign({padding: '5.25px 10px 5.25px 5px'}, iconStyle, custom.roundRight)}></i> : null
      ] : isForm ? null : <Text style={Object.assign({backgroundColor: color, width: 125, textAlign: 'center', display: 'block'}, text)}>{item[field]}</Text> }
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);
