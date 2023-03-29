import React, { Component } from 'react';
import { api } from 'services/api';


import { ImageGalleryList } from 'components/ImageGallery/ImageGalleryList/ImageGalleryList';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import img from '../../../src/images/not-found.jpg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './ImageFinder.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageFinder extends Component {
  state = {
    search: '',
    page: 1,
    totalPage: null,
    images: [],
    error: null,
    status: Status.IDLE,
  };

  handleFormSubmit = search => {
    this.setState({ search, images: [], page: 1 });
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ status: Status.PENDING });

      api
        .fetchImages(search, page)
        .then(({ data }) => {
          if (prevState.search !== search) {
            if (data.hits <= 0) {
              toast.error(`Sorry, there are no images matching your search query. Please try again.`);
              this.setState({
                error: 'not found',
                status: Status.REJECTED,
              });
              return;
            } else {
              toast.info(`Hooray! We found "${data.total}" images`);
            }

            this.setState({
              images: data.hits,
              totalPage: data.total,
              status: Status.RESOLVED,
            });
          }

          if (prevState.page !== page) {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
              totalPage: data.total,
              status: Status.RESOLVED,
            }));
          }
        })
        .catch(error =>
          this.setState({ error: error.message, status: Status.REJECTED })
        );
    }
  }

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { page, totalPage, images, status } = this.state;

    const isShowButton = page *12 <= totalPage ? true : false;

    return (
      <div className={css.box}>
        <Searchbar onSubmit={this.handleFormSubmit} />
         {status === 'pending' && (
          <>
            {images.length > 0 && <ImageGalleryList images={images} />}
            <Loader />
          </>
        )}

        {status === 'resolved' && (
          <>
            {images.length > 0 && <ImageGalleryList images={images} />}
            {isShowButton && <Button onClick={this.handleLoadMoreClick} />}
          </>
        )}

        {status === 'rejected' && (
          <>
            <img
              src={img}
              alt="not found images"
            />
          </>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}