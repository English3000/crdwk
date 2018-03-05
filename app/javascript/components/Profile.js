import React from 'react';
import PropTypes from 'prop-types';
import { styles, P } from './util';

const Profile = ({ data }) => <div key='Profile' style={styles.page}>
  <P><em>{data.user.name ? data.user.name : data.user.email}</em></P>
  <div key='Ideas' style={{display: 'flex', justifyContent: 'space-around'}}>
    {Object.keys(data.ideas).map(id => data.ideas[id].active ? 
      <P key={id}>{data.ideas[id].name}</P> : null)}
  </div>
  <P><b>loading...</b></P>
</div>;

Profile.propTypes = {data: PropTypes.object};

export default Profile;
