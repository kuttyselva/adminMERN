import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';
import Textfieldgrp from '../common/Textfieldgrp';



import classnames from 'classnames';
 class Register extends Component{
constructor(){
    super();
    this.state={
        name:'',
        email:'',
        password:'',
        password2:'',
        errors:{}
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
}
onChange(event){
   this.setState({[event.target.name]: event.target.value});

}
componentDidMount(){
  if(this.props.auth.isAuthenticated){
      this.props.history.push('./dashboard');
  }
}
componentWillReceiveProps(nextProps){
if(nextProps.errors){
  this.setState({errors:nextProps.errors});
}
}
onSubmit(e){
    e.preventDefault();
    const newUser={
        name:this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2:this.state.password2
    };
    this.props.registeruser(newUser,this.props.history);
   
}
 AvoidSpace(event) {
   
  this.setState({[event.target.name]: event.target.value});
  }

    render(){
     
        const {errors} =this.state;
        return(
     
<section id="contact" style={{height:'-webkit-fill-available'}}>

<div class="row section-intro" >
   <div class="col-twelve">

       <h1 style={{color:'#FF0077'}}>Register</h1><br/>
       <h2 style={{color:'#ffffff'}}>Register to your Circle account</h2>

      
   </div> 
</div> 

<div class="row contact-form">

   <div class="col-twelve">

  
    <form name="contactForm" id="contactForm" onSubmit={this.onSubmit}>
          <fieldset>

          <div class="form-field" >
                      <input style={{color:'#FF0077'}} type="text" className={classnames('form-control form-control-lg',{'is-invalid': errors.name})} value={this.state.name}  onChange={this.onChange.bind(this)} placeholder="Name (without spaces)" name="name" />
                      {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </div>
                    <Textfieldgrp
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                />
                <Textfieldgrp
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                />
                <Textfieldgrp
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                />
                    
                    <div class="form-field">
             <button class="submitform" type="submit">Submit</button>
             <div id="submit-loader">
                <div class="text-loader">Sending...</div>                             
                     <div class="s-loader">
                              <div class="bounce1"></div>
                              <div class="bounce2"></div>
                              <div class="bounce3"></div>
                        </div>
                    </div>
          </div>
                    </fieldset>
      </form> 

  
    <div id="message-warning">            	
    </div>            
  
      <div id="message-success">
       <i class="fa fa-check"></i>Your message was sent, thank you!<br/>
      </div>

 </div> 
   
</div> 
</section> 

        );
    }
}
Register.propTypes={
  registeruser: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps=(state)=>({
  auth:state.auth,
  errors:state.errors
});
export default connect(mapStateToProps,{registeruser})(withRouter(Register));