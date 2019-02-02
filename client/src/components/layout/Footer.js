import React,{Component} from 'react'

export default class Footer extends Component {
    render(){
  return (
    <footer className="fixed-bottom  bg-light text-dark mt-5 p-4 text-center">
    Copyright &copy; {new Date().getFullYear()}  Dev Connector 
  </footer>
  );
}
}
