import React from 'react';
import { connect } from 'react-redux';
import { Text } from '../utils/elements';
import { visitProfile } from '../actions/visit';

const mapStateToProps = ({ users }, { match }) => {
  const pageId = match.params.id;
  return ({user: users[pageId], pageId});
};

const mapDispatchToProps = dispatch => ({
  VisitProfile: id => dispatch(visitProfile(id)),
});

class Profile extends React.Component {
  componentWillMount() { if (!this.props.user) this.props.VisitProfile(this.props.pageId); }

  render() {
    const {user} = this.props;

    return [
      <Text key='Details' style={{fontStyle: 'italic'}}>
        {user ? user.name ? user.name : user.email : null}
      </Text>,

      <Text key='placeholder'>profile page</Text>,

      <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
