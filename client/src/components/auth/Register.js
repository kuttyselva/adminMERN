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
onChange(e){
    this.setState({[e.target.name]: e.target.value});
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
    render(){
     
        const {errors} =this.state;
        return(
            <div className="register">
           
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your DevConnector account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="text" className={classnames('form-control form-control-lg',{'is-invalid': errors.name})} value={this.state.name} onChange={this.onChange.bind(this)} placeholder="Name" name="name" />
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
                    
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
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