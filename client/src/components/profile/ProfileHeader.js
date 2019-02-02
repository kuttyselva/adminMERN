import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';



class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    const { experience, education } = this.props.profile;
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
      
        <li className="skill-percentage">{skill}</li>
      </div>
    ));


    const expItems = experience.map(exp => (
      <div>
      
    <div className="company-wrapper clearfix" key={exp._id}>
      		<div className="experience-title">{exp.company}</div>
          <div className="time"><p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p></div> 
        </div>
      	
        
         <div className="job-wrapper clearfix">
        	<div className="experience-title">{exp.title}</div> 
          <div className="company-description">
          <p>
          {exp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>  
          </div>
        </div>

        </div>

    ));


    const eduItems = education.map(edu => (


<div style={{color:'#000000'}}> 
<div class="card w-100">
  <div class="card-body">
    <h5 class="card-title text-center">Institution</h5>
    <p class="card-text">{edu.school} <br/>  <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
            {edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )} <br/>
            <strong>Degree:</strong> {edu.degree} <br/>   <strong>Field Of Study:</strong> {edu.fieldofstudy}
            
            {edu.description === '' ? null : (
              <span>
                <strong>Description: </strong> {edu.description}
              </span>
            )}
            
            
            
             </p>
   
  </div>
</div>
 <br/>
</div>





      
    ));
    
    return (


<div >

<div className= "resume-wrapper">
      <div className="row">
      <div className="col-md-4">
      
       
      <section className="profile section-padding">
		<div >
			<div className="picture-resume-wrapper">
        <div className="picture-resume">
        <span><img src= {profile.user.avatar} alt="" /></span>
        <svg version="1.1" viewBox="0 0 350 350">
  
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9" result="cm" />
    </filter>
  </defs>
  
  
<g filter="url(#goo)" >  
  
  <circle id="main_circle" className="st0" cx="171.5" cy="175.6" r="130"/>
  
  <circle id="circle" className="bubble0 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble1 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble2 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble3 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble4 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble5 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble6 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble7 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble8 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble9 st1" cx="171.5" cy="175.6" r="122.7"/>
  <circle id="circle" className="bubble10 st1" cx="171.5" cy="175.6" r="122.7"/>
</g>  
</svg>
      </div>
         <div className="clearfix"></div>
 </div>
      <div className="name-wrapper">
        <h1>{profile.user.name}</h1>
      </div>
      <div className="clearfix"></div>
      <div className="contact-info clearfix" style={{marginLeft:'30%',fontSize:'24px',width:'100%'}}>
      
      	<ul className="list-titles">
      		<li>Status</li>
      		<li>Works at</li>
      		<li>Location</li>
      	</ul>
        <ul className="list-content ">
        	<li>{profile.status}</li> 
        	<li>{isEmpty(profile.company) ? null : <p> {profile.company}</p>}</li>
        	<li>{isEmpty(profile.location) ? null : <p>{profile.location}</p>}</li>
        </ul>
      </div>
      <div className="contact-presentation" style={{marginLeft:'30%'}}>
      <h4 className="text-center">Bio</h4>
      	<h5>{profile.bio} </h5>
    
      </div>
      <div className="contact-social clearfix" style={{marginLeft:'30%'}}>
      	<ul>
        <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-dark p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-dark p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-dark p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-dark "
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-dark p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-dark p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
      	</ul>
        
      </div>
		</div>
	</section>
  

     
      </div>

      <div className="col-md-8">
       


       <section className="experience section-padding">
  	<div >
  		<h3 className="experience-title">Experience</h3>
      
      <div className="experience-wrapper">
      


      <div className="row">
        
        
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>



       
      
        
      </div>
      
      <div className="section-wrapper clearfix">
      	<h3 className="section-title">Skills</h3>  
        	<ul>
          <div>
                {skills}
              </div>  
        	</ul>
        
      </div>
      
      <div className="section-wrapper clearfix">
        <h3 className="section-title">Education</h3> 
        <div>
        
        
        {expItems.length > 0 ? (
            <ul >{eduItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div> 
      </div>
      
  	</div>
  </section>
  
      
      </div>
    </div>





<div>

      


	
  <div className="clearfix"></div>
</div>
</div>



</div>



  
     
     
    );
  }
}

export default ProfileHeader;
