import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteProject } from '../../actions/profileActions';

class Project extends Component {
  onDeleteClick(id) {
    this.props.deleteProject(id);
  }

  render() {
    const project = this.props.project.map(pro => (
      <tr key={pro._id}>
        <td>{pro.name}</td>
        <td>{pro.team}</td>
        <td>{pro.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, pro._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Projects</h4>
        
        <table className="table table-borderless table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>No of Members</th>
              
              <th>Description</th>

              <th />
            </tr>
            {project}
          </thead>
        </table>
      </div>
    );
  }
}

Project.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(Project);
