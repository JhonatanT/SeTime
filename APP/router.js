import React from 'react'

import { Switch, Router, Redirect, BrowserRouter, Route } from 'react-router-dom'

import Login from './pages'

import { history } from './components/History/history'

const Routes = () => (
    <Router history={history}>

        <Switch>

            <Route exact path="/" component={() => Login} />

        </Switch>

    </Router>

);

export default Routes;
