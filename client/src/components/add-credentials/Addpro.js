import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Textfieldgrp from '../common/Textfieldgrp';
import Textareagrp from '../common/Textareagrp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addProject } from '../../actions/profileActions';

class Addpro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      team: '',
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const proData = {
      name: this.state.name,
      team: this.state.team,     
      description: this.state.description
    };

    this.props.addProject(proData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
      <br/><br/><br/>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Project</h1>
              <p className="lead text-center">
                Add any Mini Projects, or Pro Projects that you have done
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <Textfieldgrp
                  placeholder="* name of Project"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <Textfieldgrp
                  placeholder="No of Team members"
                  name="team"
                  value={this.state.team}
                  onChange={this.onChange}
                  error={errors.team}
                />
                
                
                <Textareagrp
                  placeholder="Project Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the project .."
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        <br/><br/><br/><br/><br/>
      </div>
    );
  }
}

Addpro.propTypes = {
  addProject: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addProject })(
  withRouter(Addpro)
);
