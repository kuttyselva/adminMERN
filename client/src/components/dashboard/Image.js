import React,{Component} from 'react'
import {Link} from 'react-router-dom';


export default class Image extends Component {
    render(){
  return (
    <div>
      <section id="about">  

<div class="row section-intro">
  <div class="col-twelve">
  <h5>Profile Image</h5>
    <h1>Steps to Change Profile Image</h1><br/><br/>
    <h5> If you already registered to Gravatar.com then simply click on user icon on the Menubar </h5>
    <br/><br/>
    <div className="row">
        <div className="col-8">
             <img src={require('../common/1.png')} alt=""></img>
        </div>
         <div className="col-4">
         <h1 style={{marginTop:'20%'}}>Step 1</h1>
        <h5 style={{color:'#FF0077'}}> Navigate to  <a className="p-2" href="https://en.gravatar.com" target="_blank">gravatar.com</a> and click on create your own avatar</h5>
        </div>
       
    </div>

    <div className="row "style={{marginTop:'10%'}}>
        
         <div className="col-4">
         <h1 style={{marginTop:'80%'}}>Step 2</h1>
        <h5 style={{color:'#FF0077'}}>  Fill the Fields and Create Your Account </h5>
        </div>
        <div className="col-8">
             <img src={require('../common/2.png')} alt=""></img>
        </div>
    </div>

    
    <div className="row "style={{marginTop:'10%'}}>
        
       
       <div className="col-8">
            <img src={require('../common/3.png')} alt=""></img>
       </div>
       <div className="col-4">
        <h1 style={{marginTop:'50%'}}>Step 3</h1>
        <h5 style={{color:'#FF0077'}}> Click on Add Image to Upload New Image </h5>
       </div>
   </div>


   <div className="row "style={{marginTop:'10%'}}>
        
        <div className="col-4">
        <h1 style={{marginTop:'20%'}}>Step 4</h1>
        <h5 style={{color:'#FF0077'}}>  Choose an Image to change Profile Image</h5>
       </div>
       <div className="col-8">
            <img src={require('../common/4.png')} alt=""></img>
       </div>
   </div>
  </div>
    </div>
    </section>
    </div>
  )
}
}
