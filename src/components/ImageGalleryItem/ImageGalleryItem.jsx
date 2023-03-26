import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  render() {
    return (
      <li>
        <img
          src={this.props.webformatURL}
          alt={this.props.tags}
        />
      </li>
    );
  }
}