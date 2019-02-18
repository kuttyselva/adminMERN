import React, { Component } from 'react';

import PropTypes from 'prop-types';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'aee4c7c8b0a4ceb688cd',
      clientSecret: '8579080409bb175acd21dfb38beb33fc36480ba9',
      count: 8,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    
    const repoItems = repos.map(repo => (

     

<div>
<br/>
      <div key={repo.id} className="card card-body  w-100" style={{boxShadow:" 0px 0px 29px 0px rgba(122,120,122,0.95)"}}>
        <div className="row">
          <div className="col-md-8">
          <div className="col-2"> 
                  
             <img src={"https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png"} alt="" className="rounded-circle" style={{boxShadow:" 0px 0px 29px 0px rgba(122,120,122,0.95)"}}/>
          </div>
            <h3 >
              <a href={repo.html_url} className="text-dark" >
                {repo.name}
              </a>
            </h3>
            <p style={{float:'left',marginLeft:'25%'}}>{repo.description}</p>
          </div>
          <div className="col-md-4">
            <span className="badge badge-dark mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
       
      </div>
      </div>
    ));
    return (
      <div ref="myRef" >
       <br/>
        <h1 style={{marginLeft:'35%'}}>Latest Github Repos</h1>
        <br/>
        {repoItems}
        <br/><br/><br/><br/><br/>
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
