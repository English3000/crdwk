import React from 'react';
import { Text } from '../utils/elements';

export default () => [
  <Text key='placeholder' style={{fontWeight: 700}}>Home Page</Text>,
  <Text key='fyi' style={{fontStyle: 'italic'}}>(app in progress)</Text>,

  <Text key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</Text>
];
