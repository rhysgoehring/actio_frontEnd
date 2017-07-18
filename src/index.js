import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import reducers from './reducers/index';

import RequireAuth from './auth/HOCRequireAuth';
import App from './components/App';
import SignIn from './auth/SignIn';
import Home from './components/Home';
import SignUp from './auth/SignUp';
import Landing from './components/Landing';

const middleware = [reduxThunk, logger]
const store = createStore(reducers, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Landing} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="home" component={RequireAuth(Home)} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();



