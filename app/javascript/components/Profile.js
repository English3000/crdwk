import React from 'react';
import PropTypes from 'prop-types';
import { styles, P } from './util';

const Profile = ({ user }) => <div key='Profile' style={styles.page}>
                                <div style={{textAlign: 'center'}}>
                                  <P><em>{user.email}</em></P>
                                  <P>profile page loading...</P>
                                </div>
                              </div>;

Profile.propTypes = {user: PropTypes.object};

export default Profile;
