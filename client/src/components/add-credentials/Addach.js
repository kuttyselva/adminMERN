import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Textfieldgrp from '../common/Textfieldgrp';
import Textareagrp from '../common/Textareagrp';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAchieve } from '../../actions/profileActions';

class Addach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: '',
      award: '',
      event: '',
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

    const achData = {
      venue: this.state.venue,
      award: this.state.award,
      event: this.state.fieldofstudy,
     
      description: this.state.description
    };

    this.props.addAchieve(achData, this.props.history);
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
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any venue, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <Textfieldgrp
                  placeholder="* Venue or Location"
                  name="venue"
                  value={this.state.venue}
                  onChange={this.onChange}
                  error={errors.venue}
                />
                <Textfieldgrp
                  placeholder="Award placed"
                  name="award"
                  value={this.state.award}
                  onChange={this.onChange}
                  error={errors.award}
                />
                <Textfieldgrp
                  placeholder="Event name"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                
                <Textareagrp
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about the program that you were in"
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

Addach.propTypes = {
  addAchieve: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addAchieve })(
  withRouter(Addach)
);
