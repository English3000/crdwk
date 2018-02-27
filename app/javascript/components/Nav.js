import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './util';

const navStyle = { justifyContent: 'space-between', alignItems: 'flex-end',
                   position: 'fixed', bottom: 7.5, width: '100%',
                   margin: '0 -5px', display: 'flex' };

const Nav = ({ page, signedIn }) => (
  <div style={navStyle}>
    <div style={{width: 20}}></div>

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      <input placeholder='Search for users...' readOnly
             style={Object.assign({}, styles.textInput, {borderRadius: 2.5, paddingRight: 25})}/>
      {!signedIn && page === 'Profile' ? <i className='fa fa-home fa-lg'
         style={{position: 'fixed', marginRight: 5, color: 'black'}}></i> : null}
    </div>

    <div style={{width: 20}}>
      {signedIn ? <i className='fa fa-sign-out fa-lg'></i> : null}
    </div>
  </div>
);

Nav.propTypes = { page: PropTypes.string,
                  signedIn: PropTypes.boolean };

export default Nav;
