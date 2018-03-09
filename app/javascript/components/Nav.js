import React from 'react';
import PropTypes from 'prop-types';
import { styles, P } from './util';

const custom = {
  navStyle: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              position: 'fixed', bottom: 7.5, width: '97.5%', margin: '0 1.25%' },
  connectSym: {fontSize: 32, height: 23.5, fontWeight: 600, position: 'relative', top: -2.5},
};

const Nav = ({ page, signedIn }) => (
  <div style={custom.navStyle}>
    <div style={{width: 87.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
    {/* signedIn && page === 'Profile' /*&& !currentUser && !connected ? [
      <P key='Connect' style={custom.connectSym}>&infin;</P>,
      <i key='Chat' className='fa fa-comments fa-lg'></i>,
      <P key='placeholder' style={{width: 22}}></P> ] : null */}
    </div>

    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
      <input placeholder='Search for users...' readOnly
             style={Object.assign({}, styles.textInput, {borderRadius: 2.5, paddingRight: 25})}/>
      {(!signedIn && page !== 'Home') || (signedIn && page !== 'Profile') ?
      <i className='fa fa-home fa-lg' style={{position: 'fixed', marginRight: 5, color: 'black'}}>
      </i> : null}
    </div>

    <div style={{width: 87.5, display: 'flex', justifyContent: 'space-between'}}>
      {signedIn ? [
        <i key='MyOrgs' className='fa fa-briefcase fa-lg'></i>,
        <i key='Build' className='fa fa-plus fa-lg'></i>, //links to Build page
        <i key='SignOut' className='fa fa-sign-out fa-lg'></i>
      ] : null}
    </div>
  </div>
);

Nav.propTypes = { page: PropTypes.string,
                  signedIn: PropTypes.bool };

export default Nav;
