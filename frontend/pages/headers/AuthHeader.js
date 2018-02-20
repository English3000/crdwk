import React from 'react';
import { View, Text, ErrorBoundary } from '../../utils/elements';
import AuthForm from './AuthForm';

const headerStyle = {
  position: 'fixed', margin: '0 auto', padding: '15px 10% 12.5px',
  width: '100%', boxSizing: 'border-box', backgroundColor: '#ffffb3',
  justifyContent: 'space-between', alignItems: 'center'
};

export default () => [
  <View key='Auth' style={headerStyle}>
    <Text style={{width: 115}}>Make it happen.</Text>

    <ErrorBoundary>
      <View style={{display: 'block'}}>
        <AuthForm />
      </View>
    </ErrorBoundary>

    <Text style={{width: 115, fontWeight: 600, justifyContent: 'center'}}>crdwk</Text>
  </View>,

  <View key='placeholder' style={{height: 85.5}}></View>,
];
