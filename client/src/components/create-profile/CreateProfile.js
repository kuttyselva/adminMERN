import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Textfieldgrp from '../common/Textfieldgrp';
import Inputgrp from '../common/Inputgrp';
import Selectlistgrp from '../common/Selectlistgrp';
import Textareagrp from '../common/Textareagrp';
import {createProfile} from '../../actions/profileActions';

class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            displaySocial:false,
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            gitUser:'',
            bio:'',
            twitter:'',
            facebook:'',
            youtube:'',
            instagram:'',
            errors:{}
        };
        this.onChange =this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();
        const profileData={
            handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      gituser: this.state.gituser,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
        }
        this.props.createProfile(profileData,this.props.history);
    }
    onChange(e){
       
        this.setState({[e.target.name]: e.target.value});
    }
    render(){
        const {errors,displaySocial}=this.state;
        let socialinputs;
        if(displaySocial){
            socialinputs=(
                <div>
                    <Inputgrp
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}/>
                    <Inputgrp
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}/>
                    <Inputgrp
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}/>
                    <Inputgrp
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}/>
                    <Inputgrp
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}/>
                </div>
            )
        }
        const options=[
            {label:'Select Professional Status',value:'0'},
            {label:'Developer',value:'Developer'},
            {label:'Junior Developer',value:'Junior Developer'},
            {label:'Senior Developer',value:'Senior Developerr'},
            {label:'Manager',value:'Manager'},
            {label:'Student',value:'Student'},
            {label:'Instructor',value:'Instructor'},
            {label:'Other',value:'Other'},
        ];
  return (
    <div className="create-profile">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <a href="dashboard.html" className="btn btn-light">
            Go Back
          </a>
          <h1 className="display-4 text-center">Create Your Profile</h1>
          <p className="lead text-center">Let's get some information to make your profile stand out</p>
          <small className="d-block pb-3">* = required field</small>
          <form onSubmit={this.onSubmit}>
            <Textfieldgrp 
                placeholder="* Profile handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle} 
                info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"/>

            <Selectlistgrp 
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status} 
                options={options}
                info="Give us an idea of where you are at in your career"/>

            <Textfieldgrp 
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company} 
                info="Could be your own company or one you work for"/>
            <Textfieldgrp 
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website} 
                info="Could be your own or a company website"/>  
            <Textfieldgrp 
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location} 
                info="City & state suggested (eg. Boston, MA)"/>    
            <Textfieldgrp 
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills} 
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"/> 
            <Textfieldgrp 
                placeholder="Github Username"
                name="gituser"
                value={this.state.gituser}
                onChange={this.onChange}
                error={errors.gituser} 
                info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"/>              
            <Textareagrp 
                placeholder="A short bio of yourself"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio} 
                info="Tell us a little about yourself"/> 
            
           

            <div className="mb-3">
              <button type="button" onClick={()=>{
                  this.setState(pervState =>({
                      displaySocial:!pervState.displaySocial
                  }))
              }} className="btn btn-light">Add Social Network Links</button>
              <span className="text-muted">Optional</span>
            </div>
                {socialinputs}
            
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
    <br/><br/><br/><br/><br/>
  </div>

  )
}
}
CreateProfile.propTypes={
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));