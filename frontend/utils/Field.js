import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Text } from './elements';
import { create, update } from '../actions/rest';

const mapStateToProps = ({ errors, session }) => ({
  errors, currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  Update: (path, item) => dispatch(update(path, item)),
  Create: (path, item) => dispatch(create(path, item))
});

const custom = {
  formStyle: { minWidth: 100, padding: '4.5px 5px 4px', fontSize: 15,
               textAlign: 'center' },
  roundLeft: {borderTopLeftRadius: 10, borderBottomLeftRadius: 10},
  roundRight: {borderTopRightRadius: 10, borderBottomRightRadius: 10}
};

class Field extends React.Component {
  constructor(props) {
    super(props); const {item, field } = props;
    this.state = { [field]: item[field], revising: false, active: false, height: '' };
  }

  componentDidMount() {
    const {item, field, path, multiline} = this.props;
    const height = multiline ? document.getElementById(`${path}-${field}-${item.id}`).scrollHeight : '';
    const revising = !item[field] ? true : false;

    this.setState({height, revising});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.length === 1 && this.state[newProps.field] === '') {
      this.setState({ [newProps.field]: newProps.errors[0] });
    } else if (newProps.item !== this.props.item) {
      this.setState({ [newProps.field]: newProps.item[newProps.field] });
    }
  }

  render() { //value doesn't persist on refresh
    const { item, field, path, currentUser, isForm, Update, Create,      //`color` allows for easier access to the parent component's `backgroundColor`
            style, color, text, multiline, numberoflines } = this.props; //`text` allows to style text's appearance & not View's
    const {revising, active} = this.state; //`revising` controls TextInput style/visibility
                                           //`active` tracks whether TextInput is being edited, adapting UI accordingly
    const value = this.state[field];
    const id = item.id;

    let editable; //determines whether to render an editable TextInput
    if (currentUser && !id) {
      editable = true;
    } else {
      editable = Object.keys(item).includes('profile_pic') ?
        currentUser.id - id === 0 : currentUser.id - item.user_id === 0;
    }
    //conditionals here so that styling isn't stored in state
    const cursor = revising || isForm ? 'pointer' : 'default';
    const colors = revising || isForm ? ['#ffff99', 'black', 'white']: [color, color, color];
    const icon = item[field] ? 'pencil' : 'check';
    const border = `1px solid ${revising || isForm ? 'whitesmoke' : 'transparent'}`;
    // const borderRight = `1px solid ${revising || isForm ? '#ffff99' : 'transparent'}`;
    // const borderLeft = `1px solid ${revising || isForm ? 'white' : 'transparent'}`;

    const iconStyle = Object.assign( { backgroundColor: colors[0], cursor,
                                       color: colors[1], border },
                        numberoflines ? { paddingTop: 21.75 * numberoflines - 3.5,
                                          paddingBottom: 21.75 * numberoflines - 4 } : {}
    );

    return <View style={Object.assign({ backgroundColor: color, marginBottom: 5,
                                        marginLeft: editable && !isForm ? -35 : 0,
                                        alignItems: 'center' }, style)}>
      {editable ? [
        isForm ? null :
        <i key='Revise' className={`fa fa-${icon} fa-lg`}
           onMouseEnter={() => this.setState({revising: true})}
           onMouseLeave={() => {if (item[field]) this.setState({revising: false});}}
           onClick={() => {if (active) { Update(path, {[field]: value, id});
                                         this.setState({revising: false, active: false}); }}}
           style={Object.assign({padding: '5.25px 5px 5.25px 10px'}, iconStyle, custom.roundLeft)}></i>,

        <TextInput key={`${field}`} id={`${path}-${field}-${id}`} placeholder={isForm ? 'Comment:' : `${field}`}
                   value={value} height={multiline ? this.state.height : ''}
                   onClick={() => this.setState({revising: true, active: true})}
                   onMouseEnter={() => this.setState({revising: true})}
                   onMouseLeave={() => {if (item[field] && !active) this.setState({revising: false});}}
                   onBlur={() => {if (item[field]) this.setState({revising: false});}}
                   onChange={event => this.setState({ [field]: event.target.value })}
                   onKeyDown={event => { //resizes clunkily; to undo, make `multiline` a #
                     this.setState({height: document.getElementById(`${path}-${field}-${id}`).scrollHeight});
                     if (event.keyCode === 13 && !multiline && value.length > 0 && active) {
                       Update(path, {[field]: value, id});
                       this.setState({revising: false, active: false});}
                   }} style={Object.assign({backgroundColor: colors[2], border},
                                           custom.formStyle, text,
                                           isForm ? custom.roundLeft : custom.roundRight)}/>,

        isForm ? <i key='Create' className={`fa fa-${icon} fa-lg`}
                    onMouseEnter={() => this.setState({revising: true})}
                    onMouseLeave={() => {if (item[field]) this.setState({revising: false});}}
                    onClick={() => { if (active) Create(path, {[field]: value});
                                     this.setState({revising: false, active: false}); }}
                    style={Object.assign({padding: '5.25px 10px 5.25px 5px'},
                                         iconStyle, custom.roundRight)}></i> : null

      ] : isForm ? null : <Text style={Object.assign({ backgroundColor: color, width: 125,
                                                       textAlign: 'center', display: 'block' }, text)}>
        {item[field]}
      </Text> }
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Field);
