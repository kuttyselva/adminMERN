import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
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
        <Route exact path="/dashboard" component={Dashboard}/>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
