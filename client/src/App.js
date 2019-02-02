import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authActions';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './App.css';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Addexp from './components/add-credentials/Addexp';
import Addedu from './components/add-credentials/Addedu';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

//check for token
if(localStorage.jwtToken){
  //seetauth token header
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded= jwt_decode(localStorage.jwtToken);
  //set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired 
  const currentTime =Date.now()/1000;
  if(decoded.exp<currentTime){
    //logiut user
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //clear profile
    //redirect login
    window.location.href='/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
      <div className="App">
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-experience" component={Addexp}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/add-education" component={Addedu}/>
        </Switch>
        <Switch>
        <PrivateRoute exact path="/feed" component={Posts}/>
        </Switch>
        <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
        <Route exact path="/not-found" component={NotFound}/>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
