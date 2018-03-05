import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './utils/elements';
import CRDWK from './CRDWK'; //this is the app

export default ({ store }) => <Provider store={store}>
                                <BrowserRouter>
                                  <ErrorBoundary>
                                    <CRDWK />
                                  </ErrorBoundary>
                                </BrowserRouter>
                              </Provider>;
