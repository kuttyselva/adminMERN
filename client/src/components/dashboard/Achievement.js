import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteAchieve } from '../../actions/profileActions';

class Achievement extends Component {
  onDeleteClick(id) {
    this.props.deleteAchieve(id);
  }

  render() {
    const achievement = this.props.achievement.map(ach => (
      <tr key={ach._id}>
        <td>{ach.venue}</td>
        <td>{ach.event}</td>
        <td>{ach.award}</td>
        
       
        <td>{ach.description}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, ach._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        
        <table className="table table-borderless table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Venue</th>
              <th>Event</th>
              <th>Award</th>
              <th>Description</th>

              <th />
            </tr>
            {achievement}
          </thead>
        </table>
      </div>
    );
  }
}

Achievement.propTypes = {
  deleteAchieve: PropTypes.func.isRequired
};

export default connect(null, { deleteAchieve })(Achievement);
