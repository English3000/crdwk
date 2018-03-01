import React from 'react';
import { styles, P } from './util';

const headerStyle = {
  position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
  width: '100%', boxSizing: 'border-box', backgroundColor: '#ffff99',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};

const custom = {
  authForm: {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
  textInput: { display: 'block', fontSize: 13, fontWeight: 500, width: 195, margin: '0 10px',
               padding: '3px 0 4.5px 7.5px', border: '2px solid #ffd24d',
               outline: 'none', boxSizing: 'border-box' },

  topRounded: {borderTopLeftRadius: 7.5, borderTopRightRadius: 7.5},
  bottomRounded: {borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5},
  // v-- no `cursor: 'pointer'` affordance
  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: {borderWidth: '0 32px 50px 32px', borderColor: 'transparent transparent #ffd24d transparent'},
  signIn: {borderWidth: '29px 0 29px 50px', borderColor: 'transparent transparent transparent #ffd24d'},

  buttonText: {position: 'absolute', fontSize: 14},
  signUpText: { marginTop: /*-15.5*/ -34, marginLeft: 19, textAlign: 'center', color: 'white',
                fontWeight: 300, textShadow: '0 0 1px whitesmoke' },
  signInText: {marginTop: -37.75, marginLeft: 0.5},

  logoStyle: { width: 126.5, fontSize: 25, textAlign: 'center', color: 'black',
               textDecoration: 'none', padding: '10px 0', borderRadius: '100%' }
};

export default () => [ //added extra <div>s so DOM tree matches
  <div key='Auth' style={headerStyle}>
    <P style={{width: 126, fontSize: '1.1em'}}>Make it happen.</P>

    <div>
      <div style={custom.authForm}>
        <div style={{height: 50, position: 'relative', top: -15}}>
          <button style={Object.assign({}, custom.button, custom.signUp)}
                  onClick={event => event.preventDefault()}></button>
          <P style={Object.assign({}, custom.buttonText, custom.signUpText)}>
            Sign<br/>Up
          </P>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
          <input placeholder='Email' readOnly
                 style={Object.assign({}, custom.textInput, {borderBottomWidth: 1}, custom.topRounded)}/>
          <input placeholder='Password' readOnly
                 style={Object.assign({}, custom.textInput, {borderTopWidth: 1}, custom.bottomRounded)}/>
        </div>

        <div>
          <button style={Object.assign({}, custom.button, custom.signIn)}
                  onClick={event => event.preventDefault()}></button>
          <P style={Object.assign({}, custom.buttonText, custom.signInText)}>
            Sign In
          </P>
        </div>
      </div>
    </div>

    <a href='https://github.com/English3000/crdwk' target='_blank'
       style={custom.logoStyle}>crdwk</a>
  </div>,
  <div key='placeholder' style={{height: 85.5}}></div>,
];
