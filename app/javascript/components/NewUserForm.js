import React from 'react';
import { styles } from './util';

export default () => <div style={{backgroundColor: '#fff2e6'}}>
                       <input placeholder='Name' autoFocus
                              style={styles.textInput}/>
                       <button>Save</button>
                     </div>;
