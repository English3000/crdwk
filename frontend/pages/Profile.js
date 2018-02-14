import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { View, Text } from '../utils/elements';
import { visitProfile } from '../actions/visit';

const mapStateToProps = ({ users }, { match }) => {
  const pageId = match.params.id;
  return ({user: users[pageId], pageId});
};

const mapDispatchToProps = dispatch => ({
  VisitProfile: id => dispatch(visitProfile(id)),
});

class Profile extends React.Component {
  componentWillMount() { this.props.VisitProfile(this.props.pageId); }

  render() {
    return <View style={{flexDirection: 'column', alignItems: 'center'}}>
             <Text style={{fontStyle: 'italic'}}>
               {this.props.user ? this.props.user.email : ''}
             </Text>

             <Text>profile page</Text>
           </View>; //can this be an array instead?
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
