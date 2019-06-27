import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const HelmetHelper = ({ title, description, image }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta description = {description} />
  </Helmet>
);

export default HelmetHelper;

HelmetHelper.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

HelmetHelper.defaultProps = {
  title: 'Finance app',
  description: '',
};
