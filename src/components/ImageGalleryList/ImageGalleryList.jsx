import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export class ImageGalleryList extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  render() {
    return (
      <ul>
       {this.props.images.map(
          ({ webformatURL, largeImageURL, tags }, index) => (
            <ImageGalleryItem
              key={index}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          )
        )}
      </ul>
    );
  }
}