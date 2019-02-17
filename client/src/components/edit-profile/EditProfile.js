import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import Textfieldgrp from '../common/Textfieldgrp';
import Inputgrp from '../common/Inputgrp';
import Selectlistgrp from '../common/Selectlistgrp';
import Textareagrp from '../common/Textareagrp';
import {createProfile,getCurrentProfile} from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state={
            displaySocial:false,
            handle:'',
            company:'',
            dob:'',
            location:'',
            status:'',
            skills:'',
            githubuser:'',
            bio:'',
            twitter:'',
            facebook:'',
            web:'',
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
        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;
            //bring skills back to csv
            const skillscsv=profile.skills.join(',');
            //if profile field not exist , make it empty string
            profile.company=!isEmpty(profile.company)?profile.company:'';
            profile.dob=!isEmpty(profile.dob)?profile.dob:'';
            profile.location=!isEmpty(profile.location)?profile.location:'';
            profile.githubuser=!isEmpty(profile.githubuser)?profile.githubuser:'';
            profile.bio=!isEmpty(profile.bio)?profile.bio:'';
            profile.social=!isEmpty(profile.social)?profile.social:{}; 
            profile.twitter = !isEmpty(profile.social.twitter)
            ? profile.social.twitter
            : '';
          profile.facebook = !isEmpty(profile.social.facebook)
            ? profile.social.facebook
            : '';
          profile.linkedin = !isEmpty(profile.social.linkedin)
            ? profile.social.linkedin
            : '';
          profile.web = !isEmpty(profile.social.web)
            ? profile.social.web
            : '';
          profile.instagram = !isEmpty(profile.social.instagram)
            ? profile.social.instagram
            : '';
        //set components to field state
        this.setState({ handle: profile.handle,
            company: profile.company,
           
            dob: profile.dob,
        lang: profile.lang,
        location:profile.location,
            status: profile.status,
            skills: skillscsv,
            githubuser: profile.githubuser,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            web: profile.web,
            instagram:profile.instagram
        })
        }
    }
    componentDidMount(){
        this.props.getCurrentProfile();    }
    onSubmit(e){
        e.preventDefault();
        const profileData={
            handle: this.state.handle,
      company: this.state.company,
      dob: this.state.dob,
      lang: this.state.lang,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubuser: this.state.githubuser,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      web: this.state.web,
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
                    placeholder="Website Profile URL"
                    name="web"
                    icon="fab fa-youtube"
                    value={this.state.web}
                    onChange={this.onChange}
                    error={errors.web}/>
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
         
          <h1 className="display-4 text-center">Edit Your Profile</h1>
          <p className="lead text-center">Let's get some information to make your profile stand out</p>
          <small className="d-block pb-3">* = required field</small>
          <form onSubmit={this.onSubmit}>
            <Textfieldgrp 
                placeholder="* Profile handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle} 
                info="A unique handle for your profile URL. max 5 letters"/>

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
                placeholder="Date od Birth"
                name="dob"
                value={this.state.dob}
                onChange={this.onChange}
                error={errors.dob} 
                info="Enter DoB (eg. 05-july-1999)"/>  
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
                placeholder="Known Languages"
                name="lang"
                value={this.state.lang}
                onChange={this.onChange}
                error={errors.lang} 
                info="Please use comma separated values (eg. Tamil,English)"/> 
            <Textfieldgrp 
                placeholder="Github Username"
                name="githubuser"
                value={this.state.githubuser}
                onChange={this.onChange}
                error={errors.githubuser} 
                info="Enter your github username"/>              
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
            
            <input type="submit" className="btn btn-dark btn-block mt-4" />
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
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
    profile:state.profile,
    errors:state.errors
})
export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfile));