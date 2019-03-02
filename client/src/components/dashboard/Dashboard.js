import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile,deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import Project from './Project';

import Achievement from './Achievement';
class Dashboard extends Component{
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    onDeleteClick(e){
        this.props.deleteAccount();

    }
    render(){
        const {user} =this.props.auth;
        const{profile,loading} =this.props.profile;

        let dashboardContent;
        if(profile===null || loading)
            dashboardContent= <Spinner/>
        else
            //check if logged user have profile
            if(Object.keys(profile).length>0){
                dashboardContent=(
                    <div className="container"> <p className="lead test-muted text-center">welcome <Link to={`/profile/${profile.handle}`} >{user.name}</Link> </p>
                    <div class="alert alert-primary text-center" role="alert">
 
  <Link to="/profile-image">Do you want to change Your Profile Image?? </Link>
</div>
<div class="alert alert-info text-center" role="alert">
 
 <Link to="/feed">Any issues? write a post.  </Link>
</div>
                    <ProfileActions className="text-center"/>
                    <Experience experience={profile.experience}/>
                    <Achievement achievement={profile.achieve}/>
                    <Education education={profile.education} />
                    <Project project={profile.project} />
                    <div style={{marginBottom: '60px'}}>
                     <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                     Delete My Account
                    </button>
          </div>
                    </div>
                );

            }else{
                //user logged in but no profile
                dashboardContent=(
                    <div>
                        <p className="lead test-muted">welcome  {user.name}</p>
                        <p>you have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        return(
<div className="dashboard">
<br/><br/><br/>
<div className="container">
<div className="row">
<div className="col-md-12">
<h1 className="display-4 text-center">Dashboard</h1>
{dashboardContent}

</div>
</div>
</div>
<br/><br/>
</div>
        );
    }
}
Dashboard.propTyper={
    getCurrentProfile:PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
};
const mapStateToProps= state =>({
    profile:state.profile,
    auth:state.auth
});
export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard);