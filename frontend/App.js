import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CRDWK from './CRDWK'; //this is the app

export default ({ store }) => <Provider store={store}>
                                <BrowserRouter>
                                  <CRDWK />
                                </BrowserRouter>
                              </Provider>;
