import React from 'react';
import PropTypes from 'prop-types';
import { styles, P } from './util';

const Profile = ({ data }) => <div key='Profile' style={styles.page}>
  <P>{data.user.name ? <em>{data.user.name}</em> : [
    <input key='Name' placeholder='Name' style={styles.textInput} readOnly/>,
    <button key='Save' style={{cursor: 'default'}}>Save</button> ]}</P>
  <div key='Ideas' style={{display: 'flex', justifyContent: 'space-around'}}>
    {data.user.ideas.map(idea => idea.active ?
    <P key={idea.id}>{idea.name}</P> : null)}
  </div>
  <P><b>loading...</b></P>
</div>;

Profile.propTypes = {data: PropTypes.object};

export default Profile;
