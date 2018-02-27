import React from 'react';

export const styles = {
  page: { height: 800, backgroundColor: '#fff2e6',
          display: 'flex', flexDirection: 'column' },
  textInput: { display: 'block', outline: 'none', border: 'none',
               fontSize: 13, padding: '3px 0 4.5px 7.5px' }
};

export const P = props => <p {...props} style={Object.assign({margin: 0, padding: 0}, props.style)}>
                            {props.children}
                          </p>;
