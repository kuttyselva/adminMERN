import React, { Component } from 'react';

import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import Textfieldgrp from '../common/Textfieldgrp';
// import {withRouter} from 'react-router-dom';
// import isEmpty from '../../validation/is-empty';
class Login extends Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            errors:{}
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('./dashboard');
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors){
          this.setState({errors:nextProps.errors});
        }
    }
    onSubmit(e){
        e.preventDefault();
        const userData={
            email:this.state.email,
            password:this.state.password        
        }
       this.props.loginUser(userData);
    }
    render(){
        const {errors} =this.state;
        return(



<section id="contact" style={{height:'-webkit-fill-available'}}>

<div class="row section-intro" >
   <div class="col-twelve">

       <h1 style={{color:'#FF0077'}}>Login</h1><br/>
       <h2 style={{color:'#ffffff'}}>Sign in to your DevConnector account</h2>

      
   </div> 
</div> 

<div class="row contact-form">

   <div class="col-twelve">

  
    <form name="contactForm" id="contactForm" onSubmit={this.onSubmit}>
          <fieldset>

          <div class="form-field">
          <Textfieldgrp
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                />
               

                    
          </div>
          <div class="form-field">
          <Textfieldgrp
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                />           </div>
                           
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
Login.propTypes={
    loginUser:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired
};
const mapStateToProps=(state)=>({
    auth:state.auth,
    errors:state.errors
  });
export default connect(mapStateToProps,{loginUser})(Login);