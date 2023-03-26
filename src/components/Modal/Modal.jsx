import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleCloseModal}>
        <div>
          <img src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
