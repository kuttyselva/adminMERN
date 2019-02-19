import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import Moment from 'react-moment';



class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
   
    
    const { experience, education } = this.props.profile;
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
      <li>
        <div className="progress percent90"><span>90%</span></div>
        <strong>{skill}</strong>
      </li>
      
        
      </div>
    ));
    const lang = profile.lang.map((langs, index) => (
      <div key={index} >
     
        
        <p>{langs}</p>
      
      
        
      </div>
    ));
   


    const expItems = experience.map(exp => (



<div class="timeline-block">

<div class="timeline-ico">
  <i class="fa fa-briefcase"></i>
</div>

<div class="timeline-header">
  <h3>{exp.company}</h3><br/>
  <p> <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}</p><br/>
</div>

<div class="timeline-content">
  <h4>{exp.title}</h4><br/>
  <p>{exp.description === '' ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}</p>
          
</div>
<br/><br/>
</div>



     

    ));


    const eduItems = education.map(edu => (




<div class="timeline-block">

<div class="timeline-ico">
  <i class="fa fa-graduation-cap"></i>
</div>
        
<div class="timeline-header">
<h3>{edu.school}</h3><br/>
  <h3>{edu.degree}</h3><br/>
  <p>{edu.to === null ? (
              ' Now'
            ) : (
              <Moment format="YYYY/MM/DD">{edu.to}</Moment>
            )}</p>
</div>

<div class="timeline-content">
  <h4>96%</h4><br/>
  <p>{edu.description === '' ? null : (
              <span>
                <strong>Description: </strong> {edu.description}
              </span>
            )}</p>
</div>
<br/><br/>
</div> 




      
    ));
    return(
    <div>
      <section id="intro">   

<div class="intro-overlay"></div>	

<div class="intro-content">
  <div class="container-fluid">

    <div class="col-twelve">

      <h5>Hello, World.</h5>
      <h1>I'm {profile.handle}.</h1><br/>

      <p class="intro-position">
        <span>{profile.status}</span><br/>
      
      </p><br/>

    <a class="button stroke smoothscroll" href="" title="">{isEmpty(profile.company) ? null : <p> Works in {profile.company}</p>}</a>

    </div>  
    
  </div>   		 		
</div>

<ul class="intro-social">        
<p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-light p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-light p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter " />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-light p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook " />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-light "
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin " />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-light p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube " />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-lignt p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram " />
                  </a>
                )}
              </p>
 </ul>    	

</section> 



<section id="about">  

<div class="row section-intro">
  <div class="col-twelve">

    <h5>About</h5>
    <h1>Let me introduce myself.</h1>

    <div class="intro-info">

      <img src= {profile.user.avatar} alt="" style={{boxShadow:" 0px 0px 29px 0px rgba(122,120,122,0.95)"}}/>

      <p class="lead text-center">{profile.bio}</p>
    </div>   			

  </div>   		
</div> 

<div class="row about-content">

  <div class="col-six tab-full">

    <h3>Profile</h3><br/>
    <p>Here you can see my profile info.</p><br/>

    <ul class="info-list"><br/>
      <li>
        <strong>Fullname:</strong><br/>
        <span>{profile.user.name}</span>
      </li>
      <li>
        <strong>Birth Date:</strong><br/>
        <span>{profile.dob}</span>
      </li>
      <li>
        <strong>Known Languages:</strong><br/>
       {lang}
      </li><br/>
     
      <li>
        <strong>Email:</strong>
        <span>{profile.user.email}</span>
      </li><br/>
    </ul>
  </div>
  <div class="col-six tab-full">
    <h3>Skills</h3>
    <p>some of my skill hierarchy , in which i spend more time on it, to take a coffee with code </p>

   <ul class="skill-bars">
   <div>
                {skills}
              </div>
   </ul>		

  </div>

</div>


</section>

<section id="resume" class="grey-section">

		<div class="row section-intro">
   		<div class="col-twelve">

   			<h5>Resume</h5>
   			<h1>More of my credentials.</h1>

   			<p class="lead">Here comes my biography.</p>

   		</div>   		
   	</div> 

   	<div class="row resume-timeline">

   		<div class="col-twelve resume-header">

   			<h2>Education</h2>

   		</div> 

   		<div class="col-twelve">

   			<div class="timeline-wrap">

         
        
        {eduItems.length > 0 ? (
          <div>{eduItems}</div>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
      </div>

   			</div>   			

   		</div> 
   		
   
   	
   	<div class="row resume-timeline">

   		<div class="col-twelve resume-header">

   			<h2>Career</h2>

   		</div> 

   		<div class="col-twelve">

   			<div class="timeline-wrap">
         {expItems.length > 0 ? (
          <div>{expItems}</div>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
				
   			</div>   			

   		</div> 
   		
   	</div> 
		
	</section> 



    </div>);
  }

}

export default ProfileHeader;
