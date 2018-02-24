import React from 'react';
import { View, Text, ErrorBoundary } from '../../utils/elements';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

const custom = {
  headerStyle: { position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
                 width: '100%', boxSizing: 'border-box', backgroundColor: '#ffffb3',
                 justifyContent: 'space-between', alignItems: 'center' },
  logoStyle: { width: 126.5, fontSize: 25, textAlign: 'center', color: 'black',
               textDecoration: 'none', padding: '10px 0', borderRadius: '100%' }
};

export default () => [
  <View key='Auth' style={custom.headerStyle}>
    <Text style={{width: 126.5, fontSize: '1.1em'}}>Make it happen.</Text>

    <ErrorBoundary>
      <View style={{display: 'block'}}>
        <AuthForm />
      </View>
    </ErrorBoundary>

    <a href='https://github.com/English3000/crdwk' target='_blank'
       style={custom.logoStyle}>crdwk</a>
  </View>,

  <View key='placeholder' style={{height: 85.5}}></View>,
];
