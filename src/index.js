import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


import {AUTH_USER} from './actions/types';
import reducers from './reducers/index';

import RequireAuth from './auth/HOCRequireAuth';
import App from './components/App';
import SignIn from './auth/SignIn';
import Home from './components/Home';
import SignUp from './auth/SignUp';
import Landing from './components/Landing';
import SignOut from './auth/SignOut';
import Profile from './components/Profile';
import MyEvents from './components/MyEvents';
import NewEvent from './components/NewEvent';
import EditEvent from './components/EditEvent';
import GoogleMapsLoader from 'google-maps';



const store = createStore(reducers, applyMiddleware(reduxThunk))
window.GoogleMapsLoader = GoogleMapsLoader;
GoogleMapsLoader.KEY = process.env.REACT_APP_MAP
const token = localStorage.getItem('token');
let currentUser = localStorage.getItem('currentUser')
currentUser = JSON.parse(currentUser);

if (token && currentUser) {
  store.dispatch({ type: AUTH_USER, payload: currentUser });
  browserHistory.push('/home')
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} >
        <IndexRoute component={Landing} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={SignOut} />
        <Route path="home" component={RequireAuth(Home)} />
        <Route path="profile" component={RequireAuth(Profile)} />
        <Route path="myevents" component={RequireAuth(MyEvents)} />
        <Route path="newevent" component={RequireAuth(NewEvent)} />
        <Route path="events/:id" component={RequireAuth(EditEvent)} />
      </Route>
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
