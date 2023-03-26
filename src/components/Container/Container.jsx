import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ children }) => {
  return <div>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

