import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import Home from './pages/Home';

export default () => <Switch>
                       <AuthRoute exact path='/' component={Home}/>
                     </Switch>;
