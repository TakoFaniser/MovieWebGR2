import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';
import Login from '../pages/Login/Login';
import Genre from '../pages/genre/Genre';
import Actor from '../pages/actor/Actor';

const Routes = () => {
    return (
        
        <Switch>
            <Route
                path='/actor/:id'
                component={Actor}
            />
            <Route 
                path='/login'
                component={Login}
            />
            <Route
                path='/genre/:genreId'
                component={Genre}
            />
            <Route
                path='/:category/search/:keyword'
                component={Catalog}
            />
            <Route
                path='/:category/:id'
                component={Detail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
       
    );  
}

export default Routes;
