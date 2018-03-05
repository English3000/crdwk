import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from '../utils/elements';
import { visitProfile } from '../actions/visit';

const mapStateToProps = ({ data }, { match }) => {
  const pageId = match.params.id;
  return ({user: data.users ? data.users[pageId] : null, ideas: data.ideas, pageId});
};

const mapDispatchToProps = dispatch => ({
  VisitProfile: id => dispatch(visitProfile(id)),
});

class Profile extends React.Component {
  componentWillMount() { if (!this.props.user) this.props.VisitProfile(this.props.pageId); }

  render() {
    const {user, ideas} = this.props;

    return [
      <Text key='Details' style={{fontStyle: 'italic'}}>
        {user ? user.name ? user.name : user.email : null}
      </Text>,

      <View key='Ideas' style={{justifyContent: 'space-around'}}>
        {Object.keys(ideas).map(id => ideas[id].active ? <Text key={id}>{ideas[id].name}</Text> : null)}
      </View>,

      <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
