import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

class Navbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
    render(){
      const {isAuthenticated,user} =this.props.auth;
      const authLinks =(
      <ul className="navbar-nav ml-auto">
       <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
      <li className="nav-item">
        <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
        <img className="rounded-circle" src={user.avatar} alt={user.name} title="you must have a gravatar connected to your gmail" style={{width:'30px' ,marginRight:'5px' }}/>{ ' '}
         logout</a>
        
      </li>
    </ul>
    );
     const guestLinks =(<ul className="navbar-nav ml-auto">
     <li className="nav-item">
       <Link className="nav-link" to="/register">Sign Up</Link>
     </li>
     <li className="nav-item">
       <Link className="nav-link" to="/login">Login</Link>
     </li>
   </ul>);
  return (
    <div>
      <nav className="navbar  navbar-expand-sm fixed-top navbar-light bg-light  mb-4">
 
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav" aria-controls="mobile-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles"> Developers
            </Link>
          </li>
        </ul>
          {isAuthenticated ? authLinks:guestLinks}
        
      </div>
    
  </nav>

    </div>
  );
}
}
Navbar.propTypes={
  logoutUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
}
const mapStatesToProps=(state)=>({
  auth:state.auth
});
export default connect(mapStatesToProps ,{logoutUser,clearCurrentProfile})(Navbar);
