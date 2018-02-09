import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

export default () => <div id='App' style={{fontFamily: ''}}>
                       <Switch>
                         <Route exact path='/' component={Home}/>
                       </Switch>
                     </div>;
