import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import Home from './pages/Home';
import Profile from './pages/Profile';

export default props => <Switch>
                       <AuthRoute exact path='/' component={Home}/>
                       <Route exact path='/users/:id' component={Profile}/>
                     </Switch>;
