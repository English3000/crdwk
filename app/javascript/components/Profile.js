import React from 'react';
import PropTypes from 'prop-types';
import { styles, P } from './util';
//update when Profile is fully skeletoned
const Profile = ({ data }) => <div style={styles.page}>
  <P>{data.user.name ? <em>{data.user.name}</em> : [
    <input key='Name' placeholder='Name' style={styles.textInput} readOnly/>,
    <button key='Save' style={{cursor: 'default'}}>Save</button> ]}</P>
  <div key='Ideas' style={{display: 'flex', justifyContent: 'space-around'}}>
    {Object.keys(data.ideas).map(id => data.ideas[id].active ?
    <P key={data.ideas[id].id}>{data.ideas[id].name}</P> : null)}
  </div>
  <P><b>loading...</b></P>
</div>;

Profile.propTypes = {data: PropTypes.object};

export default Profile;
