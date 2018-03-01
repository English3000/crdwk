import React from 'react';
import { styles, P } from './util';

export default () => <div key='Home' style={styles.page}>
                       <P>home page loading...</P>
                       <P key='Copyright' style={{color: '#ffd9b3'}}>English3000 &copy; 2018</P>
                     </div>;
