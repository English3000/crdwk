import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export default ({ store }) => <Provider store={store}>
                                <BrowserRouter>
                                  <App />
                                </BrowserRouter>
                              </Provider>;
