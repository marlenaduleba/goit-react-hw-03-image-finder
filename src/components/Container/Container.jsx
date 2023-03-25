import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return <div>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Container;